<?php

function checkSession($conn) {
  $sessionid = get_input_data("sessionid");

  session_name("GioeleSession");
  session_id($sessionid);
  session_start();

  //check if session exist
  if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_name']) || !isset($_SESSION['user_email']) || !isset($_SESSION['user_score'])){
    session_unset();
    session_destroy();
    code_response(-2, "Errore nel Login ", 400, $conn);
    exit();
  }
}
