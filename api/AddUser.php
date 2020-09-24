<?php
require 'connection.php';

// Checks if method is correct
if ($_SERVER["REQUEST_METHOD"] != "POST") {
  http_response_code(405);
  $conn->close();
  exit();
}

$username = get_input_data("username");
$email = get_input_data("email");
$email = strtolower($email);
$password = get_input_data("password");
$passwordC = get_input_data("passwordC");

// Checks username
if (!isset($username) || empty($username)) {
  code_response(-1, "Username non inserito", 400, $conn);
  exit();
}
// is already used
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();
if ($result->num_rows != 0) {
  code_response(-1, "Questo username e' gia' stato usato", 409, $conn);
  exit();
}

// Checks email
if (!isset($email) || empty($email)) {
  code_response(-2, "Email non inserita", 400, $conn);
  exit();
}
//Checks if email is acceptable
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  code_response(-2, "Email non valida", 400, $conn);
  exit();
}
if (strpos($email, "@tronzanella.edu.it") != (strlen($email) - 19)) {
  code_response(-2, "Devi usare la mail scolastica", 400, $conn);
  exit();
}

// Checks if email is already used
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();
if ($result->num_rows != 0) {
  code_response(-2, "Questa email e' gia' stata usata", 409, $conn);
  exit();
}

//Checks password
if (!isset($password) || empty($password)) {
  code_response(-3, "Password non inserita", 400, $conn);
  exit();
}
//Checks if password is acceptable
if (strlen($password ) <= 1) {
  code_response(-3, "La password non può essere di 1 carattere", 400, $conn);
  exit();
}
if (mb_detect_encoding($password, 'ASCII') == false) {
  code_response(-3, "Password non valida", 400, $conn);
  exit();
}
//checks if password is confirmed
if ($password != $passwordC || !isset($passwordC)) {
  code_response(-2, "Password non confermata", 400, $conn);
  exit();
}

//clear non-authenticated users more than 2hr ago
$cday = date("d");
$chour = date("H");
$stmt = $conn->prepare("SELECT * FROM users");
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();
while($row = $result->fetch_assoc()) {
  $date = date_parse($row["date"]);
  $day = $date["day"];
  $hour = $date["hour"];
  if(($cday > $day && $hour > 2) || ($cday <= $day && $chour - $hour >= 2)){
    $stmt = $conn->prepare("SELECT * FROM users WHERE id = ? AND auth = 0");
    $stmt->bind_param("s", $row["id"]);
    $stmt->execute();
    $result2 = $stmt->get_result()->fetch_assoc();
    $stmt->close();
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("s", $result2["id"]);
    $stmt->execute();
    $stmt->close();
    $stmt = $conn->prepare("DELETE FROM auth_users WHERE id = ?");
    $stmt->bind_param("s", $result2["id"]);
    $stmt->execute();
    $stmt->close();
  }
}

// Insert user into database
$userid = uniqid("", true);
$password = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (id, username, password, email) VALUES (?,?,?,?)");
$stmt->bind_param("ssss", $userid, $username, $password, $email);
$stmt->execute();
$stmt->close();

// send mail
require 'SendMail.php';
SendMail($conn, $userid, $email, $username);

// Response
code_response(1, "Utente registrato con successo", 200, $conn);
