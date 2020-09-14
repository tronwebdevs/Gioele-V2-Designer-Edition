<?php
require 'connection.php';

if ($_SERVER["REQUEST_METHOD"] != "POST") {
  http_response_code(405);
  $conn->close();
  exit();
}

require 'checkSession.php';
checkSession($conn);

//get score form database
$stmt = $conn->prepare("SELECT score FROM users WHERE id = ?");
$stmt->bind_param("s", $_SESSION['user_id']);
$stmt->execute();
$score = $stmt->get_result()->fetch_assoc()["score"];
$stmt->close();

//response
echo json_encode(
  array(
    "code" => 1,
    "response" => 200,
    "message" => "Login avvenuto con successo",
    "sessId" => session_id(),
    "id" => $_SESSION['user_id'],
    "username" => $_SESSION['user_name'],
    "email" => $_SESSION['user_email'],
    "score" => $score,
    "attempt" => $_SESSION['user_attempt']
  )
);
