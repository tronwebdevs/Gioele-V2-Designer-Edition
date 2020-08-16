<?php

session_start();

if (!isset($_SESSION['session_id'])) {
  $_SESSION['session_id'] = session_id();
}


$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$result = $result->fetch_assoc();
$stmt->close();

$_SESSION['user_id'] = $result['id'];
$_SESSION['user_name'] = $result['username'];
$_SESSION['user_password'] = $result['password'];
$_SESSION['user_email'] = $result['email'];
$_SESSION['user_score'] = $result['score'];

//response
echo json_encode(
  array(
    "code" => 1,
    "response" => 200,
    "message" => "Login avvenuto con successo",
    "id" => $_SESSION['user_id'],
    "username" => $_SESSION['user_name'],
    "password" => $_SESSION['user_password'],
    "email" => $_SESSION['user_email'],
    "score" => $_SESSION['user_score'],
  )
);
