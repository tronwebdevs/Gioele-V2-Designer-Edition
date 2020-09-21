<?php
require '..\connection.php';

// Checks if method is correct
if ($_SERVER["REQUEST_METHOD"] != "POST") {
  http_response_code(405);
  $conn->close();
  exit();
}

$c = get_input_data("counter");

//Checks if counter is acceptable
if (!is_numeric($c) || !isSet($c) || $c < 1) {
  code_response(-1, "Errore nel caricamento, prova ad aggiornare la pagina", 400, $conn);
  exit();
}

//get entire leaderboard
$result = $conn->query("SELECT username, score FROM users ORDER BY score DESC");
$leaderboard = array();

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    array_push($leaderboard, $row);
  }
}

//selects 50 rows based on counter value
$res = array();
for($i = ($c * 50 - 50); $i < ($c * 50); $i++) {
  if (isset($leaderboard[$i])) {
    array_push($res, $leaderboard[$i]);
  } else {
    break;
  }
}


//response
echo json_encode(
  array(
    "code" => 1,
    "response" => 200,
    "message" => "Classifica ottenuta",
    "quantity" => count($res),
    "leaderboard" => $res
  )
);
$conn->close();
