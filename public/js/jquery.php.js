/**
 * jQuery PHP Plugin
 *
 * Examples and documentation at: https://jquery.hohli.com/
 *
 * @version 1.0.1 (19/03/2024)
 * @author Anton Shevchuk (https://anton.shevchuk.name)
 * @link https://jquery.hohli.com/
 */
(function ($) {
  const php = {
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
      // call jQuery chain-methods
      for (let i = 0; i < response['elements'].length; i++) {

        let $element = $(response['elements'][i]['selector'])
        let methods = response['elements'][i]['methods']
        let arguments = response['elements'][i]['arguments']

        for (let j = 0; j < methods.length; j++) {
          try {
            let method = methods[j]
            let argument = arguments[j]

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
                  // try to run method
                  if (window[argument[0]] && window[argument[0]] !== '' && typeof window[argument[0]] !== 'undefined') {
                    $element = $element[method](window[argument[0]])
                  } else {
                    // try to filter by a specified expression
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
            console.error(`Action: $("${response['elements'][i]['selector']}")\nStatus: ${textStatus}`)
          }
        }
      }
      // call jQuery/window methods
      for (let i = 0; i < response['actions'].length; i++) {
        let func = response['actions'][i]['function']
        let args = response['actions'][i]['arguments']

        try {
          if (typeof $[func] !== 'undefined') {
            $[func](...args)
          } else if (typeof window[func] !== 'undefined') {
            window[func](...args)
          } else {
            throw new Error('Function not found')
          }
        } catch (error) {
          // if is error
          console.error(`Action: $.${func}()\nStatus: ${textStatus}`)
        }
      }
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
      return $.ajax({
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
