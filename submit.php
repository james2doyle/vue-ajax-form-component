<?php

function json_response($code = 200, $data = null)
{
  $status = array(
    200 => '200 OK',
    400 => '400 Bad Request',
    500 => '500 Internal Server Error'
  );
  // clear the old headers
  header_remove();
  // set the header to make sure cache is forced
  header("Cache-Control: no-transform,public,max-age=300,s-maxage=900");
  // treat this as json
  header('Content-Type: application/json');
  // ok, validation error, or failure
  header('Status: ' . $status[$code]);
  // return the encoded json
  return json_encode(array(
    'status' => $code < 300, // success or not?
    'data' => $data
  ));
}

// usage
echo json_response(200, [$_POST, $_FILES]);

exit;