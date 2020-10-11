<?php
require 'connection.php';

// Checks if method is correct
if ($_SERVER["REQUEST_METHOD"] != "POST") {
  http_response_code(405);
  $conn->close();
  exit();
}

require 'checkSession.php';
checkSession($conn);
$newusername = get_input_data("newusername");

//checks username
if (!isset($newusername) || empty($newusername)) {
  error_response("username non inserito", 404, $conn);
  exit();
}
//checks if username is the same as before
if (strcasecmp($_SESSION['user_name'], $newusername) == 0){
  error_response("Hai gia questo username", 409, $conn);
  exit();
}
// no bad words :(
require 'UsernameCheckout.php';
if (badwords($newusername)){
  code_response(-1, "L'username contiene parole proibite", 400, $conn);
  exit();
}
//name length
if (strlen($newusername) > 20) {
  code_response(-1, "L'username non può avere più di 20 caratteri", 400, $conn);
  exit();
}
//checks if username is already used
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $newusername);
$stmt->execute();
check_quarry($stmt, $conn);
$result = $stmt->get_result();
$stmt->close();
if ($result->num_rows != 0) {
  error_response("L'username è già in uso", 409, $conn);
  exit();
}

//updates table
$stmt = $conn->prepare("UPDATE users SET username = ? WHERE id = ?");
$stmt->bind_param("ss", $newusername, $_SESSION['user_id']);
$stmt->execute();
check_quarry($stmt, $conn);
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
