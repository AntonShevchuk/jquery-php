<?php
    require_once 'libraries/jQuery.php';
    
    $act = isset($_POST['act'])?$_POST['act']:null;
    
    // switch statement for $act
    switch ($act) {
    	case 'test0':
    		jQuery::jQuery('#test0') -> html(date('H:i:s') . ': new content');
    		break;
    	case 'test1':
    		jQuery::jQuery('#test1') -> html(date('H:i:s') . ': new content')
    		                         -> css('backgroundColor' , '#ffff00');
    		;
    		break;
    	case 'test2':
    		jQuery::jQuery('#test2 div')     -> html(date('H:i:s') . ': new content');
    		jQuery::jQuery('#test2 div.red') -> html(date('H:i:s') . ': new content')
    		                                 -> css('backgroundColor' , '#ff0000');
    		;
    		break;
    	case 'test3':
    		jQuery::jQuery('#test3 div')     -> bind('click', array('test'=>'answer: ' . date('H:i:s')), 'eventAlert')
    		                                 -> css ('cursor', 'pointer')
    		                                 -> css ('color',  '#0000ff')
    		                                 -> css ('textDecoration', 'underline');
    		break;
    	case 'test4':
    		jQuery::jQuery('#test4 div.hide')-> css ('color',  '#ff0000')
    		                                 -> animate (array('opacity'=>'show'), 1000);
    		break;
    	case 'test4-restore':
    		jQuery::jQuery('#test4 div.hide')-> css ('color',  '#000000')
    		                                 -> animate (array('opacity'=>'hide'), 1000);
    		break;
    	case 'test5':
            jQuery::jQuery('#test5 div.hide')-> slideUp(500, 'eventHide');
    		break;
    	case 'test5-restore':
            jQuery::jQuery('#test5 div.hide')-> slideDown(500);
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