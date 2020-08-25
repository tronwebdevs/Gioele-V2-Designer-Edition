<?php
require 'connection.php';

// Checks if method is correct
if ($_SERVER["REQUEST_METHOD"] != "GET") {
  http_response_code(405);
  $conn->close();
  exit();
}

//orders users by descending score and stores result in array
$result = $conn->query("SELECT username, score FROM users ORDER BY score DESC");
$leaderboard = array();

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    array_push($leaderboard, $row);
  }
}

// creates top 10 array
$Top10 = array();

$max = 10;
if ($result->num_rows < 10){
  $max = $result->num_rows;
}

for ($i = 0; $i < $max; $i++) {
  array_push($Top10, $leaderboard[$i]);
}

//response
echo json_encode($Top10);
