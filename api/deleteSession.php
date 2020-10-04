<?php
require 'connection.php';

$sessionid = get_input_data("sessionid");

session_name("GioeleSession");
session_id($sessionid);
session_start();

session_unset();
session_destroy();

//response
echo json_encode(
  array(
    "code" => 1,
    "response" => 200,
    "message" => "Logout avvenuto con successo",
  )
);
