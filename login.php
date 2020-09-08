<?php
require 'connection.php';

// Checks if method is correct
if ($_SERVER["REQUEST_METHOD"] != "POST") {
  http_response_code(405);
  $conn->close();
  exit();
}

$username = get_input_data("username");
$password = get_input_data("password");
$remember = get_input_data("remember");

// Checks username
if (!isset($username) || empty($username)) {
  error_response("username non inserito", 400, $conn);
  exit();
}
//checks if user exists
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();
if ($result->num_rows == 0) {
  error_response("L'utente non esiste", 404, $conn);
  exit();
}

//Checks password
if (!isset($password) || empty($password)) {
  error_response("Password non inserita", 400, $conn);
  exit();
}
//Checks if password is acceptable
if (strlen($password ) <= 1) {
  error_response("La password non può essere di 1 carattere", 400, $conn);
  exit();
}
if (mb_detect_encoding($password, 'ASCII') == false) {
  error_response("Password non valida", 400, $conn);
  exit();
}

//checks if password matches
$stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$result = $result->fetch_assoc();
$stmt->close();
if (!password_verify($password, $result["password"])) {
  error_response("Password sbagliata", 401, $conn);
  exit();
}

//checks if user is authenticated
$stmt = $conn->prepare("SELECT auth FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$result = $result->fetch_assoc();
$stmt->close();
if ($result["auth"] == 0) {
  error_response("Utente non autenticato", 401, $conn);
  exit();
}

//starts Session
require 'session.php';

$conn->close();
