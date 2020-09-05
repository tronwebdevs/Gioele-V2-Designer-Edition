<?php

$sessionid = get_input_data("sessionid");

session_name("GioeleEdit");
session_id($sessionid);
session_start([
  'cookie_lifetime' => 1,
]);

//check if session exist
if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_name']) || !isset($_SESSION['user_email']) || !isset($_SESSION['user_score'])){
  code_response(-2, "La sessione non esiste", 406, $conn);
  exit();
}
