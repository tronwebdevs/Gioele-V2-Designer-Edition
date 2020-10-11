<?php

function session($remember, $conn, $username) {
  session_name("GioeleSession");
  if ($remember == "false"){
    session_start([
      'cookie_lifetime' => 1,
    ]);
  } else {
    session_start();
  }

  if (!isset($_SESSION['session_id'])) {
    $_SESSION['session_id'] = session_id();
  }

  $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  check_quarry($stmt, $conn);
  $result = $stmt->get_result();
  $result = $result->fetch_assoc();
  $stmt->close();

  $_SESSION['user_id'] = $result['id'];
  $_SESSION['user_name'] = $result['username'];
  $_SESSION['user_email'] = $result['email'];
  $_SESSION['user_score'] = $result['score'];
  $_SESSION['user_attempt'] = 3;
  $_SESSION['user_number'] = -1;

  //response
  echo json_encode(
    array(
      "code" => 1,
      "response" => 200,
      "message" => "Login avvenuto con successo",
      "sessId" => session_id(),
      "id" => $_SESSION['user_id'],
      "username" => $_SESSION['user_name'],
      "email" => $_SESSION['user_email'],
      "score" => $_SESSION['user_score'],
      "attempt" => $_SESSION['user_attempt']
    )
  );
}
