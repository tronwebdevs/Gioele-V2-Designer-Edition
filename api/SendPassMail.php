<?php
require 'connection.php';

// Checks if method is correct
if ($_SERVER["REQUEST_METHOD"] != "POST") {
  http_response_code(405);
  $conn->close();
  exit();
}

$email = get_input_data("email");
$email = strtolower($email);

// Checks email
if (!isset($email) || empty($email)) {
  code_response(-1, "Email non inserita", 400, $conn);
  exit();
}
//Checks if email is acceptable
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  code_response(-1, "Email non valida", 400, $conn);
  exit();
}
if (strpos($email, "@tronzanella.edu.it") != (strlen($email) - 19)) {
  code_response(-1, "Devi usare la mail scolastica", 400, $conn);
  exit();
}

// Checks if email is used
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();
if ($result->num_rows == 0) {
  code_response(-1, "La mail non esiste", 409, $conn);
  exit();
}

// Checks if request is already being sent
$stmt = $conn->prepare("SELECT * FROM change_pass WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();
if ($result->num_rows != 0) {
  code_response(-1, "La richiesta è già stata fatta", 409, $conn);
  exit();
}

//clear requests more than 2hr ago
$cday = date("d");
$chour = date("H");
$stmt = $conn->prepare("SELECT * FROM change_pass");
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();
while($row = $result->fetch_assoc()) {
  $date = date_parse($row["date"]);
  $day = $date["day"];
  $hour = $date["hour"];
  if(($cday > $day && $hour > 2) || ($cday <= $day && $chour - $hour >= 2)){
    $stmt = $conn->prepare("DELETE FROM change_pass WHERE id = ?");
    $stmt->bind_param("s", $row["id"]);
    $stmt->execute();
    $stmt->close();
  }
}


//gets user id
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();
$userid = $result["id"];
$username = $result["username"];
$stmt->close();


// Insert request into database
$token = rand(100000, 999999);
$stmt = $conn->prepare("INSERT INTO change_pass (id, token, email) VALUES (?,?,?)");
$stmt->bind_param("sss", $userid, $token, $email);
$stmt->execute();
$stmt->close();

//Send mail
$subject = "Cambio di Password";
$message = "
<html>
<head>
  <title> Cambio Password </title>
  <style>
    .im {
      color: gainsboro;
    }
    .num {
      font-size: 40px;
      color: white;
      background-color: rgba(255, 255, 255, 0.2);
      width: 165px;
      margin: 0 auto;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class=\"im\" style=\"text-align: center; background-color: #212121;\">
    <h1 style=\"font-size: 55px; margin-bottom: 0px\"> GIOELE V2 </h1>
    <h1 style=\"font-size: 28px; margin-top: 0px; margin-bottom: 40px\"> Designer Edition </h1>
    <div>
      <h1 style=\"font-size: 20px; font-weight: normal\"> Ciao $username, questo è il codice per resettare e cambiare la tua password </h1>
      <div style=\"text-align: center;\">
        <h1 class=\"num\"> $token </h1>
      </div>
      <h1 style=\"font-size: 20px; font-weight: normal\"> E <a href=\"https://dev.tronweb.it/gioelev2/reset\" style=\"text-decoration: underline; color: gainsboro\"> questo </a> è il link dove devi usarlo </h1>
      <br>
      <h1 style=\"font-size: 14px; padding-bottom: 20px; font-weight: normal\"> se non hai provato a cambiare la password ignora questa mail </h1>
    </div>
  </div>
</body>
</html>";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: tronweb@tronzanella.edu.it" . "\r\n";

if (!mail($email, $subject, $message, $headers)) {
  code_response(-1, "Errore nell'invio della mail", 400, $conn);
  exit();
}

// Response
code_response(1, "Email inviata, controlla la tua casella di posta", 200, $conn);
