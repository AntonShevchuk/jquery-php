<?php

/**
 * Core Framework
 * 
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://framework.zend.com/license/new-bsd
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@zend.com so we can send you a copy immediately.
 * 
 * @category   Core
 * @package    Core_Controller
 * @subpackage Core_Controller_Action
 * @license    http://framework.zend.com/license/new-bsd     New BSD License
 * @version    $Id: Acl.php 58 2008-01-12 10:46:55Z aldemar $
 */

/** Zend_Controller_Action_Helper_Abstract */
require_once 'Zend/Controller/Action/Helper/Abstract.php';

/**
 * Helper for interacting with Core_Controller_Plugin_Acl
 *
 * @uses       Zend_Controller_Action_Helper_Abstract
 * @category   ZendY_JQuery
 * @package    ZendY_JQuery_Controller
 * @subpackage ZendY_JQuery_Controller_Action
 */

class ZendY_JQuery_Controller_Action_Helper_Jquery extends Zend_Controller_Action_Helper_Abstract
{
    /**
     * init
     *
     * init helper
     *
     * @access  public
     * @return  rettype  return
     */
    public function init() 
    {
        // require jQuery library
        require_once 'jQuery.php';
        
        jQuery::init();
        
        $contextSwitch = Zend_Controller_Action_HelperBroker::getStaticHelper('contextSwitch');
        $contextSwitch->initContext('json');
        
        $viewRenderer = Zend_Controller_Action_HelperBroker::getStaticHelper('viewRenderer');
        $viewRenderer->view->a = jQuery::$response['a'];
        $viewRenderer->view->q = jQuery::$response['q'];
        
        $this->disableLayouts();
    }
}