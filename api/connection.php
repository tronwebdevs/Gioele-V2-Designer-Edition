<?php
  require '../config.php';
  require 'headers.php';

  //connect to database
  $conn = new mysqli($config['servername'], $config['dbusername'], $config['dbpassword'], $config['dbname']);
  if ($conn->connect_error) {
      http_response_code(500);
      echo json_encode(array("code"=>-1,"message"=>$conn->connect_error));
      exit();
  }
