# jQuery PHP

This library facilitates working with the jQuery framework from the server-side.

> However, it's important to note that this approach is considered an antipattern. Server-side code typically shouldn't have knowledge of HTML structure or manipulate the DOM in this manner.

## Requirements

* PHP 7.4.0 or higher (with JSON extension)
* jQuery 1.10 / 2.2 / 3.3 or higher

## Documentation

### Installation

Install Composer in Your Project.

Run this in your command line:

```shell
curl -sS https://getcomposer.org/installer | php
```

Or [download composer.phar](https://getcomposer.org/composer.phar) into your project root.

Execute this in your project root.

```shell
php composer.phar install
```

### Usage

Add the autoloader to your PHP file.:

```php
require 'vendor/autoload.php';
```

After this, you can use this jQuery-PHP library in your PHP code, for example, this is `index.php`:
```php
use function AntonShevchuk\jQuery\jQuery;
use function AntonShevchuk\jQuery\jQueryContainer;

// create jQuery-way queries
jQuery('#demo')
    ->html('Server time: ' . date('H:i:s'))
    ->css('backgroundColor', '#ffffdd')
    ->animate(['opacity' => 'show'], 3000)
    ->animate(['opacity' => 'hide'], 3000)
;

// return JSON
print json_encode(jQueryContainer());
```

Include jQuery and jQuery-PHP library:

```html
<!-- Load jQuery -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
<!-- Load main jQuery-PHP scripts -->
<script src="public/js/jquery.php.js"></script>
```

Add a call in your HTML page:

```html
<!-- Call $.php -->
<button onclick="$.php('index.php',{'action':'demo'});return false;">Run demo snippet</button>
<!-- Target DOM Element -->
<div id="demo">...</div>
```

### Examples

You can find more examples on the site: https://jquery.hohli.com
    
## Author

The project is developed by [Anton Shevchuk][1], and distributed under [MIT LICENSE][2]

[1]: https://anton.shevchuk.name/
[2]: https://raw.githubusercontent.com/AntonShevchuk/ukrainian-typography-keyboard-layout/master/LICENSE