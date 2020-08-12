<?php
  require 'headers.php';

  //connect to database
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "gioele_v2";

  $conn = new mysqli($servername, $username, $password, $dbname);
  if ($conn->connect_error) {
      http_response_code(500);
      echo json_encode(array("code"=>-1,"message"=>$conn->connect_error));
      exit();
  }
