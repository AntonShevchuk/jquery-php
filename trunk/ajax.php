<?php
    // check all errors include E_STRICT
    // error_reporting(E_ALL&E_STRICT);
    
    require_once 'library/jQuery.php';
    
    $act = isset($_POST['act'])?$_POST['act']:null;
    
    // switch statement for $act
    switch ($act) {
    	case 'test0':
    		jQuery('#test0') -> html(date('H:i:s') . ': new content');
    		break;
    	case 'test1':
    		jQuery('#test1') -> html(date('H:i:s') . ': new content')
    		                         -> css('backgroundColor' , '#ffff00');
    		;
    		break;
    	case 'test2':
    		jQuery('#test2 div')     -> html(date('H:i:s') . ': new content');
    		jQuery('#test2 div.red') -> html(date('H:i:s') . ': new content')
    		                                 -> css('backgroundColor' , '#ff0000');
    		break;
    	case 'test3':
    		jQuery('#test3 div')     -> bind('click', array('test'=>'answer: ' . date('H:i:s')), 'eventAlert')
    		                                 -> css ('cursor', 'pointer')
    		                                 -> css ('color',  '#0000ff')
    		                                 -> css ('textDecoration', 'underline');
    		break;
    	case 'test4':
    		jQuery('#test4 div.hide')-> css ('color',  '#ff0000')
    		                                 -> animate (array('opacity'=>'show'), 1000);
    		break;
    	case 'test4-restore':
    		jQuery('#test4 div.hide')-> css ('color',  '#000000')
    		                                 -> animate (array('opacity'=>'hide'), 1000);
    		break;
    	case 'test5':
            jQuery('#test5 div.hide')-> slideUp(500, 'eventHide');
    		break;
    	case 'test5-restore':
            jQuery('#test5 div.hide')-> slideDown(500);
    		break;
    	case 'form':
    	    $field1 = isset($_REQUEST['field1'])?$_REQUEST['field1']:'';
    	    $field2 = isset($_REQUEST['field2'])?$_REQUEST['field2']:'';
    	    $field3 = isset($_REQUEST['field3'])?$_REQUEST['field3']:'';
    	    $response = 'Field 1 = "'.htmlentities(stripslashes($field1)).'"<br/>'.
    	                'Field 2 = "'.htmlentities(stripslashes($field2)).'"<br/>'.
    	                'Field 3 = "'.htmlentities(stripslashes($field3)).'"<br/>';
    	    
            jQuery('#testform')->html($response);
    	    break;
    	case 'timeout':
    	    sleep(3);
    	    jQuery('#preview_content')-> animate (array('opacity'=>'0.5'), 1000)-> animate (array('opacity'=>'1'), 1000);
    	    break;
    	case 'msg':
    	    jQuery::addMessage('Message 1...');
    	    jQuery::addMessage('Message 2...');
    	    break;
    	case 'err':
    	    jQuery::addError('Error 1...');
    	    jQuery::addError('Error 2...');
    	    break;
    	case 'eval':
    	    jQuery::evalScript('alert("Eval script...");');
    	    break;
    
    	default:
    		break;
    }
    
    jQuery::getResponse();