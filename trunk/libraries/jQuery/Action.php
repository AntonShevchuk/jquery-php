<?php
/**
 * Class jQuery_Action
 *
 * Abstract class for any parameter of any action
 *
 * @access   public
 * @package  jQuery
 * @created  Thu Sep 13 18:07:27 EEST 2007
 */
class jQuery_Action
{
    /**
     * add param to list
     * 
     * @param  string $param
     * @param  string $value
     * @return jQuery_Action
     */
    public function add($param, $value)
    {
        $this->$param = $value;
        return $this;
    }
}