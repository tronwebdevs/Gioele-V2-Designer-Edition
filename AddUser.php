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

// Cheks if values are inserted
if (!isset($username) || empty($username)) {
  error_response("Username non inserito", 400, $conn);
  exit();
}
if (!isset($email) || empty($email)) {
  error_response("Email non inserita", 400, $conn);
  exit();
}

//Checks if email is acceptable
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  error_response("Email non valida", 400, $conn);
  exit();
}
if (strpos($email, "@tronzanella.edu.it") != (strlen($email) - 19)) {
  error_response("Devi usare la mail scolastica", 400, $conn);
  exit();
}

// Cheks if values are inserted
if (!isset($password) || empty($password)) {
  error_response("Password non inserita", 400, $conn);
  exit();
}

//Checks if password is acceptable
if (strlen($password ) <= 1) {
  error_response("La password deve essere più lunga di 1 carattere", 400, $conn);
  exit();
}
if (mb_detect_encoding($password, 'ASCII') == false) {
  error_response("Password non valida", 400, $conn);
  exit();
}

//checks if password is confirmed
if ($password != $passwordC || !isset($passwordC)) {
  echo json_encode(
    array(
      "code" => -2,
      "response" => 400,
      "message" => "Password non confermata"
    )
  );
  exit();
}


// Checks if email is already used
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();
if ($result->num_rows != 0) {
  error_response("L'email $email e' gia' stata usata", 409, $conn);
  exit();
}

// Checks if username is already used
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();
if ($result->num_rows != 0) {
  error_response("L'username $username e' gia' stato usato", 409, $conn);
  exit();
}

// Insert user into database
$stmt = $conn->prepare("INSERT INTO users (username, password, email) VALUES (?,?,?)");
$stmt->bind_param("sss", $username, $password, $email);
$stmt->execute();

// Response
echo json_encode(
  array(
    "code" => 1,
    "response" => 200,
    "message" => "Utente registrato con successo"
  )
);

$conn->close();
