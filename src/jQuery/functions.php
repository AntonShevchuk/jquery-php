<?php

namespace AntonShevchuk\jQuery;

/**
 * jQuery
 *
 * @param string|null $selector
 * @return Action|Element
 */
function jQuery(string $selector = null)
{
    $container = Container::getInstance();

    if ($selector) {
        $element = new Element($selector);
        $container->addElement($element);
        return $element;
    } else {
        $action = new Action();
        $container->addAction($action);
        return $action;
    }
}

/**
 * jQuery Container
 *
 * @return Container
 */
function jQueryContainer(): Container
{
    return Container::getInstance();
}
