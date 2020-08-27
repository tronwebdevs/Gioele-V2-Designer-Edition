<?php
require 'connection.php';

if ($_SERVER["REQUEST_METHOD"] != "GET") {
  http_response_code(405);
  $conn->close();
  exit();
}

session_name("GioeleSession");
session_start();

//response
echo json_encode(
  array(
    "code" => 1,
    "response" => 200,
    "message" => "Login avvenuto con successo",
    "id" => $_SESSION['user_id'],
    "username" => $_SESSION['user_name'],
    "email" => $_SESSION['user_email'],
    "score" => $_SESSION['user_score'],
  )
);
