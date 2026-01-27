<?php

namespace AntonShevchuk\jQuery;

use Exception;

/**
 * Class Action
 *
 * Abstract class for any parameter of any action
 */
class Action
{
    /**
     * @var string|null
     */
    public ?string $function = null;

    /**
     * @var array
     */
    public array $arguments;

    /**
     * __call
     *
     * @param $function
     * @param $args
     * @return void
     * @throws Exception
     */
    public function __call($function, $args)
    {
        if ($this->function) {
            throw new Exception("This action already initialized with call $this->function.");
        }

        $this->function = $function;
        $this->arguments = $args;
    }
}