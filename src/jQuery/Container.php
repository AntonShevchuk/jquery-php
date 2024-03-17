<?php

namespace AntonShevchuk\jQuery;

/**
 * query
 *
 * @author Anton Shevchuk
 * @access   public
 * @package  query
 * @version  0.8
 */
class Container implements \JsonSerializable
{
    /**
     * The class instance
     * @var Container|null
     */
    private static ?Container $instance = null;

    protected array $actions = [];

    protected array $elements = [];

    /**
     * The constructor is private
     * to prevent initiation with 'new'
     */
    private function __construct()
    {
        // ...
    }

    /**
     * The object is created from within the class itself
     * only if the class has no instance.
     * @return Container
     */
    public static function getInstance(): Container
    {
        if (self::$instance == null) {
            self::$instance = new Container();
        }

        return self::$instance;
    }

    /**
     * Prevent the instance from being cloned
     *
     * @return void
     */
    private function __clone()
    {
    }

    /**
     * Prevent from being unserialized
     *
     * @return mixed
     * @throws \Exception
     */
    public function __wakeup()
    {
        throw new \Exception("Cannot unserialize a singleton.");
    }

    /**
     * addAction
     * add a query to stack
     *
     * @param Action $action
     * @return void
     */
    public function addAction(Action $action)
    {
        $this->actions[] = $action;
    }

    /**
     * addQuery
     * add query to stack
     *
     * @param Element $element
     * @return void
     */
    public function addElement(Element $element)
    {
        $this->elements[] = $element;
    }

    /**
     * @return array
     */
    public function jsonSerialize(): array
    {
        return [
           "actions" => $this->actions,
           "elements" => $this->elements,
        ];
    }
}