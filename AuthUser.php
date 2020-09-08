<?php
require_once 'connection.php';

// Checks if method is correct
if ($_SERVER["REQUEST_METHOD"] != "GET") {
  http_response_code(405);
  $conn->close();
  exit();
}

$token = get_input_data("token");
//check if userid matches in both tables
$stmt = $conn->prepare("SELECT id FROM auth_users WHERE token = ?");
$stmt->bind_param("s", $token);
$stmt->execute();
$id = $stmt->get_result()->fetch_assoc()["id"];
$stmt->close();
if (!isset($id)) {
  error_response("token non valido", 404, $conn);
  exit();
}

//delete auth table row
$stmt = $conn->prepare("DELETE FROM auth_users WHERE id = ?");
$stmt->bind_param("s", $id);
$stmt->execute();
$stmt->close();

//sets auth value to 1 (true) in users table
$stmt = $conn->prepare("UPDATE users SET auth = 1 WHERE id = ?");
$stmt->bind_param("s", $id);
$stmt->execute();
$stmt->close();

//response
code_response(1, "utente autenticato", 200, $conn);
