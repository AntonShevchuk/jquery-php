<?php
// check all errors include E_STRICT
error_reporting(E_ALL | E_STRICT);
ini_set('display_errors', 1);

require __DIR__ . '/../vendor/autoload.php';

use function AntonShevchuk\jQuery\jQuery;
use function AntonShevchuk\jQuery\jQueryContainer;

$action = $_POST['action'] ?? null;

if ($action === 'demo') {
    jQuery('#demo')
        ->html('Server time: ' . date('H:i:s'))
        ->css('backgroundColor', '#ffffdd')
        ->animate(['opacity' => 'show'], 3000)
        ->animate(['opacity' => 'hide'], 3000)
    ;
    print json_encode(jQueryContainer());
    return;
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>jQuery PHP library</title>
    <meta name="keywords" content="php, ajax, jquery, javascript"/>
    <meta name="description" content="jQuery PHP library"/>

    <!-- Load Boostrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Load jQuery -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
    <!-- Load main jQuery-PHP scripts -->
    <script src="js/jquery.php.js"></script>
</head>
<body>
<!-- intro -->
<main class="container">
    <div class="bg-light p-5 rounded">
        <h1>jQuery-PHP</h1>
        <p> jQuery-PHP is a PHP library that seamlessly integrates jQuery with PHP, eliminating the need to worry about
            transmission, parsing, and other tedious tasks. With this bridge, you can bring the DOM directly onto your
            server and easily manipulate it in a jQuery-style manner.</p>

        <button class="btn btn-outline-primary" onclick="$.php(location.pathname,{'action':'demo'});return false;">Run demo snippet</button>
    </div>
</main>
<!-- /intro -->
<!-- example -->
<main class="container">
    <div id="demo" class="p-5 mt-5" style="display: none"></div>
</main>
<!-- /example -->
</body>
</html>

