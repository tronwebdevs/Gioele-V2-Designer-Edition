<?php
require 'connection.php';

// Checks if method is correct
if ($_SERVER["REQUEST_METHOD"] != "POST") {
  http_response_code(405);
  $conn->close();
  exit();
}

require 'checkSession.php';
$newusername = get_input_data("newusername");

//checks username
if (!isset($newusername) || empty($newusername)) {
  error_response("Username non inserito", 404, $conn);
  exit();
}

//checks if username is the same as before
if (strcasecmp($_SESSION['user_name'], $newusername) == 0){
  error_response("Hai gia questo username", 409, $conn);
  exit();
}

//checks if username is already used
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $newusername);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();
if ($result->num_rows != 0) {
  error_response("L'username è già in uso", 409, $conn);
  exit();
}

//updates table
$stmt = $conn->prepare("UPDATE users SET username = ? WHERE email = ?");
$stmt->bind_param("ss", $newusername, $_SESSION['user_email']);
$stmt->execute();
$stmt->close();
$_SESSION['user_name'] = $newusername;

//response
echo json_encode(
  array(
    "code" => 1,
    "response" => 200,
    "message" => "Username modificato",
    "username" => $newusername
  )
);


$conn->close();
