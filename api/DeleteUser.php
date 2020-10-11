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

//deletes user from database
$stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
$stmt->bind_param("s", $_SESSION['user_id']);
$stmt->execute();
check_quarry($stmt, $conn);
$stmt->close();

//response
code_response(1, "utente elimintato con successo", 200, $conn);
