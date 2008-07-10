/*
 * jQuery PHP Plugin
 * version: 0.5 (07/07/2008)
 * author:  Anton Shevchuk (http://anton.shevchuk.name)
 * @requires jQuery v1.2.1 or later
 *
 * Examples and documentation at: http://jquery.hohli.com/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id$
 */
php = {
    /**
     * beforeSend
     */
    beforeSend:function() {
        return true;
    },
    /**
     * success
     * parse AJAX response
     * @param object response
     * @param string textStatus
     */
     success:function (response, textStatus) {
        // call jquery methods
		for (var i=0;i<response['q'].length; i++) {
		   
			var selector  = jQuery(response['q'][i]['s']);
			var methods   = response['q'][i]['m'];
			var arguments = response['q'][i]['a'];
			
			for (var j=0;j<methods.length; j++) { 
				try {
					var method   = methods[j];
					var argument = arguments[j];
					
					if (method && method!= '' && method!= 'undefined') {
					    switch (true) {
					        // exception for 'ready', 'map', 'queue'
					        case (method == 'ready' || method == 'map' || method == 'queue'):
					           selector = selector[method](window[argument[0]]);
					           break;
					        // exception for 'bind' and 'one'
					        case ((method == 'bind' || method == 'one') && argument.length == 3):
					           selector = selector[method](argument[0],argument[1],window[argument[2]]);
					           break;
					        // exception for 'toggle' and 'hover'
					        case ((method == 'toggle' || method == 'hover') && argument.length == 2):
					           selector = selector[method](window[argument[0]],window[argument[1]]);
					           break;
					        // exception for 'filter'
					        case (method == 'filter' && argument.length == 1):
					           // try run method
					           if (window[argument[0]] && window[argument[0]] != '' && window[argument[0]] != 'undefined') {
					               selector = selector[method](window[argument[0]]);
					           } else {
					               // try filter by specified expression
					               selector = selector[method](argument[0]);
					           }
					           break;
					        // exception for effects with callback
					        case ((   method == 'show'      || method == 'hide'
					               || method == 'slideDown' || method == 'slideUp' || method == 'slideToggle'
					               || method == 'fadeIn'    || method == 'fadeOut'
					               
					             ) && argument.length == 2):
					           selector = selector[method](argument[0],window[argument[1]]);
					           break;
					        // exception for events with callback
					        case ((   method == 'blur'      || method == 'change'
					               || method == 'click'     || method == 'dblclick'
					               || method == 'error'     || method == 'focus'
					               || method == 'keydown'   || method == 'keypress'  || method == 'keyup'
					               || method == 'load'      || method == 'unload'
					               || method == 'mousedown' || method == 'mousemove' || method == 'mouseout'
					               || method == 'mouseover' || method == 'mouseup'
					               || method == 'resize'    || method == 'scroll'
					               || method == 'select'    || method == 'submit'
					             ) && argument.length == 1):
					           selector = selector[method](window[argument[0]]);
					           break;
					        // exception for 'fadeTo' with callback
					        case (method == 'fadeTo' && argument.length == 3):
					           selector = selector[method](argument[0],argument[1],window[argument[2]]);
					           break;
					        // exception for 'animate' with callback
					        case (method == 'animate' && argument.length == 4):
					           selector = selector[method](argument[0],argument[1],argument[2],window[argument[3]]);
					           break;
					           
					        // universal
					        case (argument.length == 0):
					           selector = selector[method]();
					           break;
					        case (argument.length == 1):
					           selector = selector[method](argument[0]);
					           break;
					        case (argument.length == 2):
					           selector = selector[method](argument[0],argument[1]);
					           break;
					        case (argument.length == 3):
					           selector = selector[method](argument[0],argument[1],argument[2]);
					           break;
					        case (argument.length == 4):
					           selector = selector[method](argument[0],argument[1],argument[2],argument[3]);
					           break;
					        default:
					           selector = selector[method](argument);
					           break;
					    }
					}
				} catch (error) {
					// if is error
					alert('onAction: jQuery("'+ response['q'][i]['s'] +'").'+ method +'("'+ argument +'")\n'
									+' in file: ' + error.fileName + '\n'
									+' on line: ' + error.lineNumber +'\n'
									+' error:   ' + error.message);
				}
		    }
	    }

        // predefined actions named as 
        // Methods of ObjResponse in PHP side 
        jQuery.each(response['a'], function (func, params) {
            for (var i=0;i<params.length; i++) {
                try {
                    php[func](params[i]);
                } catch (error) {
                    // if is error
                    alert('onAction: ' + func + '('+ params[i] +')\n'
                                       +' in file: ' + error.fileName + '\n'
                                       +' on line: ' + error.lineNumber +'\n'
                                       +' error:   ' + error.message);
                }
            }
        });
             
    },
    /**
     * error
     * 
     * @param object xmlEr
     * @param object typeEr
     * @param object except
     */
     error:function (xmlEr, typeEr, except) {
        var exObj = except ? except : false;
        // error report for popup window coocking
        var printStr = "<html><head><title>Error</title></head><body>";
            printStr += 'XMLHttpRequest exchange : ';
        
        // XMLHttpRequest.readyState status
        switch (xmlEr.readyState) {
            case 0:
                readyStDesc = "not initialize";
                break;
            case 1: 
                readyStDesc = "open";
                break;
            case 2: 
                readyStDesc = "data transfer";
                break;
            case 3: 
                readyStDesc = "loading";
                break;
            case 4: 
                readyStDesc = "finish";
                break;
            default:
                return "uncknown state";  
        }
        
        printStr += readyStDesc+" ("+xmlEr.readyState+")<br />";
        
        if (exObj!=false) {
            printStr += "exception was catch: "+except.toString()+"<br />";
        }
        
        // add http status description
        printStr += "<br />HTTP status: <br />"+xmlEr.status +" - "+xmlEr.statusText+"<br /><br />";
        // add response text
        printStr += "Response text : <br /> "+ xmlEr.responseText ;
        printStr += "</body></html>" ;
        
        var mywin = window.open( "",
                                 "","status=0,width=800,height=600, resizable = yes ,scrollbars = yes ",true);
                                 mywin.document.clear();
                                 mywin.document.write(printStr);
                                 mywin.document.close();
    },
    
    /**
     * complete
     * 
     * @param object XMLHttpRequest
     * @param String textStatus
     */
    complete:function(XMLHttpRequest, textStatus) {
        return true;
    },
    
    /* Static actions */
    
    /**
     * addMessage
     * system messages callback handler
     * @param object data
     */
    addMessage:function(data) {
        // call registered or default func
        var message        = data.msg      || "";
        var callBackFunc   = data.callback || "defaultCallBack";
        var callBackParams = data.params   || {};
        php.messages[callBackFunc](message, callBackParams);
    }, 
       
    /**
     * addError
     * system errors callback handler
     * @param object data
     */
    addError:function(data) {
        // call registered or default func
        var message        = data.msg      || "";
        var callBackFunc   = data.callback || "defaultCallBack";
        var callBackParams = data.params   || {};
        php.errors[callBackFunc](message, callBackParams);
    },
    /**
     * evalScript
     * @param object data
     */
    evalScript:function(data) {
        // why foo?
        var func = data.foo || '';
        eval (func);
    },
    
    /* Default realization of callback functions */
    messages : {
        defaultCallBack : function (msg, params){
            alert ("Server response message: " + msg);
        }
    },
    errors : {
        defaultCallBack : function (msg, params){
            alert ("Server response error: " + msg);
        }
    }
}
// end of php actions

// example php extension to jQuery (example)
jQuery.extend({
    php: function (url, params) {
        // do an ajax post request
        jQuery.ajax({
           // AJAX-specified URL
           url: url,
           // JSON
           type: "POST",
           data: params,
           dataType : "json",
           
           /* Handlers */
           
           // Handle the beforeSend event
           beforeSend: function(){
               return php.beforeSend();
           },
           // Handle the success event
           success: function(data, textStatus){
               return php.success(data, textStatus);
           },
           // Handle the error event
           error: function (xmlEr, typeEr, except) {
               return php.error(xmlEr, typeEr, except);                  
           },
           // Handle the complete event
           complete: function (XMLHttpRequest, textStatus) {              
               return php.complete(XMLHttpRequest, textStatus);
           }
        })
    }
});