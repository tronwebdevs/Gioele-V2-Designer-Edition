<?php

function SendMail($conn, $userid, $email, $username) {
  //generates token
  $token = uniqid("", true);

  //creates user on auth table
  $stmt = $conn->prepare("INSERT INTO auth_users (id, token) VALUES (?,?)");
  $stmt->bind_param("ss", $userid, $token);
  $stmt->execute();
  $stmt->close();


  $to = $email;
  $subject = "Iscrizione a Gioele";
  $message = "
  <html>
  <head>
    <title> autenticazione </title>
    <style>
      .im {
        color: gainsboro;
      }
      .button {
        width: 200px;
        height: 50px;
        background-color: #4471E6;
        border: none;
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        color: gainsboro;
        cursor: pointer;
        outline: none;
      }
      .button:hover {
        background-color: #4268C9;
        outline: none;
      }
      .button:focus {
        outline: none;
      }
      .button:active {
        background-color: #3F6ED4;
        outline: none;
      }
    </style>
  </head>
  <body>
    <div class=\"im\" style=\"text-align: center; background-color: #212121;\">
      <h1 style=\"font-size: 55px; margin-bottom: 0px\"> GIOELE V2 </h1>
      <h1 style=\"font-size: 28px; margin-top: 0px; margin-bottom: 40px\"> Designer Edition </h1>
      <div>
        <h1 style=\"font-size: 16px; font-weight: normal\"> Ciao $username, clicca il pulsante per confermare la registrazione </h1>
        <div>
          <a href=\"http://localhost/Gioele%20V2%20Designer%20Edition/AuthUser.php?token=$token\" style=\"text-decoration: none\">
            <input type=\"button\" class=\"button\" value=\"Registrati\">
          </a>
        </div>
        <h1 style=\"font-size: 14px; padding-bottom: 20px; font-weight: normal\"> se non ti sei registrato ignora questa mail </h1>
      </div>
    </div>
  </body>
  </html>";
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $headers .= "From: tronweb@tronzanella.edu.it" . "\r\n";

  if (!mail($to,$subject,$message,$headers)) {
    code_response(-2, "Errore nell'invio della mail", 400, $conn);
    exit();
  }
}
