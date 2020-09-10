<?php

$username = "nomeutente";
$id = "rekt";

$to = "polonia.polski007@gmail.com";
$subject = "Iscrizione a Gioele";
$message = "
<html>
<head>
  <title> autenticazione </title>
  <style>
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
  <div style=\"text-align: center; background-color: #212121; color: gainsboro\">
    <h1 style=\"font-size: 60px\"> GIOELE V2 </h1>
    <h1 style=\"font-size: 20px\"> Ciao $username, clicca il pulsante per confermare la registrazione </h1>
    <div>
      <a href=\"dev.tronweb.it\">
        <input type=\"button\" class=\"button\" value=\"Registrati\">
      </a>
    </div>
    <h1 style=\"font-size: 20px; padding-bottom: 20px\"> se non ti sei registrato ignora questa mail </h1>
  </div>
</body>
</html>";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: tronweb@tronzanella.edu.it" . "\r\n";


mail($to,$subject,$message,$headers);
