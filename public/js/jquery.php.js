/*
 * query PHP Plugin
 * version: 0.8.3 (16/03/2009)
 * author:  Anton Shevchuk (https://anton.shevchuk.name)
 * @requires query v1.2.1 or later
 *
 * Examples and documentation at: https://jquery.hohli.com/
 *
 * Revision: $Id$
 */
(function ($) {
  php = {
    /**
     * beforeSend
     */
    beforeSend: function () {
      return true
    },
    /**
     * success
     * parse AJAX response
     * @param response
     * @param textStatus
     */
    success: function (response, textStatus) {
      // call query methods
      for (var i = 0; i < response['elements'].length; i++) {

        var $element = $(response['elements'][i]['selector'])
        var methods = response['elements'][i]['methods']
        var arguments = response['elements'][i]['arguments']

        for (var j = 0; j < methods.length; j++) {
          try {
            var method = methods[j]
            var argument = arguments[j]

            if (method && method !== '' && typeof method !== 'undefined') {
              switch (true) {
                // exception for 'ready', 'map', 'queue'
                case (method === 'ready' || method === 'map' || method === 'queue'):
                  $element = $element[method](window[argument[0]])
                  break
                // exception for 'bind' and 'one'
                case ((method === 'bind' || method === 'one') && argument.length === 3):
                  $element = $element[method](argument[0], argument[1], window[argument[2]])
                  break
                // exception for 'toggle' and 'hover'
                case ((method === 'toggle' || method === 'hover') && argument.length === 2):
                  $element = $element[method](window[argument[0]], window[argument[1]])
                  break
                // exception for 'filter'
                case (method === 'filter' && argument.length === 1):
                  // try run method
                  if (window[argument[0]] && window[argument[0]] !== '' && typeof window[argument[0]] !== 'undefined') {
                    $element = $element[method](window[argument[0]])
                  } else {
                    // try filter by specified expression
                    $element = $element[method](argument[0])
                  }
                  break
                // exception for effects with callback
                case ((method === 'show' || method === 'hide'
                  || method === 'slideDown' || method === 'slideUp' || method === 'slideToggle'
                  || method === 'fadeIn' || method === 'fadeOut'

                ) && argument.length === 2):
                  $element = $element[method](argument[0], window[argument[1]])
                  break
                // exception for events with callback
                case ((method === 'blur' || method === 'change'
                  || method === 'click' || method === 'dblclick'
                  || method === 'error' || method === 'focus'
                  || method === 'keydown' || method === 'keypress' || method === 'keyup'
                  || method === 'load' || method === 'unload'
                  || method === 'mousedown' || method === 'mousemove' || method === 'mouseout'
                  || method === 'mouseover' || method === 'mouseup'
                  || method === 'resize' || method === 'scroll'
                  || method === 'select' || method === 'submit'
                ) && argument.length === 1):
                  $element = $element[method](window[argument[0]])
                  break
                // exception for 'fadeTo' with callback
                case (method === 'fadeTo' && argument.length === 3):
                  $element = $element[method](argument[0], argument[1], window[argument[2]])
                  break
                // exception for 'animate' with callback
                case (method === 'animate' && argument.length === 4):
                  $element = $element[method](argument[0], argument[1], argument[2], window[argument[3]])
                  break
                // universal
                default:
                  $element = $element[method](...argument)
                  break
              }
            }
          } catch (error) {
            // if is error
            console.error(`onAction: $("${response['elements'][i]['selector']}").${method}("${argument}")
 in file: ${error.fileName}
 on line: ${error.lineNumber}
 error:   ${error.message}`)
          }
        }
      }

      // predefined actions named as
      // Methods of ObjResponse in PHP side
      $.each(response['actions'], function (func, params) {
        for (let i = 0; i < params.length; i++) {
          try {
            $[func](params[i])
          } catch (error) {
            // if is error
            console.error(`onAction: $.${func}(${params[i]})
 in file: ${error.fileName}
 on line: ${error.lineNumber}
 error:   ${error.message}`)
          }
        }
      })

    },

    /**
     * error
     *
     * @param xmlEr
     * @param typeEr
     * @param except
     */
    error: function (xmlEr, typeEr, except) {
      console.error(
        `HTTP status: ${xmlEr.status} - ${xmlEr.statusText}\\n${xmlEr.responseText}`
      )
    },

    /**
     * complete
     *
     * @param XMLHttpRequest
     * @param textStatus
     */
    complete: function (XMLHttpRequest, textStatus) {
      return true
    },
  }
// end of php actions

  $.extend({
    php: function (url, params) {
      // do an ajax post request
      $.ajax({
        // AJAX-specified URL
        url: url,
        // JSON
        type: 'POST',
        data: params,
        dataType: 'json',
        // Handle the beforeSend event
        beforeSend: () => php.beforeSend(),
        // Handle the success event
        success: (data, textStatus) => php.success(data, textStatus),
        // Handle the error event
        error: (xmlEr, typeEr, except) => php.error(xmlEr, typeEr, except),
        // Handle the complete event
        complete: (XMLHttpRequest, textStatus) => php.complete(XMLHttpRequest, textStatus)
      })
    }
  })
})(jQuery)
