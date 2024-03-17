<?php

namespace AntonShevchuk\jQuery;

/**
 * Wrapper for working with jQuery element
 *
 * @method html(string $string)
 * @method animate(string[] $array, int $int)
 */
class Element
{
    /**
     * selector path
     * @var string
     */
    public string $selector;

    /**
     * methods
     * @var array
     */
    public array $methods = [];

    /**
     * args
     * @var array
     */
    public array $arguments = [];

    /**
     * Constructor of a query
     */
    public function __construct($selector)
    {
        $this->selector = $selector;
    }

    /**
     * __call
     *
     * @return Element
     */
    public function __call($method, $args)
    {
        $this->methods[] = $method;
        $this->arguments[] = $args;

        return $this;
    }
}