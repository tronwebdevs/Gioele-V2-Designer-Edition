<?php
require '..\api\connection.php';

// Checks if method is correct
if ($_SERVER["REQUEST_METHOD"] != "POST") {
  http_response_code(405);
  $conn->close();
  exit();
}

$code = get_input_data("code");
$password = get_input_data("password");
$passwordC = get_input_data("passwordC");

// Checks code
if (!isset($code) || empty($code)) {
  code_response(-1, "Codice non inserito", 400, $conn);
  exit();
}
if ($code < 100000 || $code > 999999) {
  code_response(-1, "Formato del codice errato", 400, $conn);
  exit();
}
//selects from table
$stmt = $conn->prepare("SELECT * FROM change_pass WHERE token = ?");
$stmt->bind_param("s", $code);
$stmt->execute();
$result = $stmt->get_result();
$userid = $result->fetch_assoc()["id"];
$stmt->close();
if ($result->num_rows == 0) {
  error_response("Il codice non esiste", 409, $conn);
  exit();
}

//Checks password
if (!isset($password) || empty($password)) {
  code_response(-2, "Password non inserita", 400, $conn);
  exit();
}
//Checks if password is acceptable
if (strlen($password ) <= 1) {
  code_response(-2, "La password non può essere di 1 carattere", 400, $conn);
  exit();
}
if (mb_detect_encoding($password, 'ASCII') == false) {
  code_response(-2, "Password non valida", 400, $conn);
  exit();
}
//checks if password is confirmed
if ($password != $passwordC || !isset($passwordC)) {
  code_response(-2, "Password non confermata", 400, $conn);
  exit();
}

// updates password
$password = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
$stmt->bind_param("ss", $password, $userid);
$stmt->execute();
$stmt->close();

//deletes request row
$stmt = $conn->prepare("DELETE FROM change_pass WHERE id = ?");
$stmt->bind_param("s", $userid);
$stmt->execute();
$stmt->close();

// Response
code_response(1, "Password cambiata con successo", 200, $conn);
