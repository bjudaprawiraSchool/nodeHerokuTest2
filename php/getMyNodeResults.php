<?php

require_once 'HTTP/Request2.php';

$request = new HTTP_Request2('https://csweb01.csueastbay.edu/~ae4654/exercise3/php/getMyNodeResults.php');
$request->setMethod(HTTP_Request2::METHOD_POST)
    ->addPostParameter('name', 'CS3520');

// ######### To Fix the SSL issue ###########
$request->setConfig(array(
    'ssl_verify_peer'   => TRUE,
    'ssl_verify_host'   => TRUE
));
// ########################################

//invoke request and get the response
try {
    $response = $request->send();
    if (200 == $response->getStatus()) {
        echo $response->getBody();
    } else {
        echo 'Unexpected HTTP status: ' . $response->getStatus() . ' ' .
            $response->getReasonPhrase();
    }
} catch (HTTP_Request2_Exception $e) {
    echo 'Error: ' . $e->getMessage();
}

?>