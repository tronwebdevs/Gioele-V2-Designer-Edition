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

$num = get_input_data("number");

//easy fix
if ($_SESSION['user_attempt'] <= 0){
  $_SESSION['user_attempt'] = 3;
  code_response(5, " ", 400, $conn);
  exit();
}

//checks if input is a number
if (!is_numeric($num) || !isset($num) && $num != 0) {
  code_response(-1, "Devi inserire un numero", 400, $conn);
  exit();
}

//checks if number is between interval of 0 to 100
if ($num < 0 || $num > 100) {
  code_response(-1, "Il numero deve essere compreso tra 0 e 100", 400, $conn);
  exit();
}

//checks if number has more than 4 decimal digits
if (strlen(substr(strrchr($num, "."), 1)) > 4 ) {
  code_response(-1, "Il numero non puo' avere piu' di 4 decimali", 400, $conn);
  exit();
}

//subtract attempt
$_SESSION['user_attempt']--;

//stops game to let user restart
if ($_SESSION['user_attempt'] == 3) {
  code_response(4, "Ricomincia", 200, $conn);
  exit();
}

/* huge pogchamp ahead

  score is based on the hyperbole 6xy + y = 1
  where x is the delta and y is the score

  score = 1/(6*D+1)

  since D is always >= than 0 then the score limit is 1,
  in order to get a more useful score, the result is multiplied by 10'000

  if delta is >= 10, the score gets set to 0

  "hyperbole good, straight lines bad"
  - Mahatma Ghandi
*/

function getScore($num) {
  $D = abs($_SESSION['user_number'] - $num);
  if ($D >= 10) {
    return 0;
  } else {
    return floor(10000*(1/(6*$D+1)));
  }
}

//checks attempt
if ($_SESSION['user_attempt'] <= 0) {
  $stmt = $conn->prepare("SELECT score FROM users WHERE id = ?");
  $stmt->bind_param("s", $_SESSION['user_id']);
  $stmt->execute();
  check_quarry($stmt, $conn);
  $result = $stmt->get_result()->fetch_assoc()["score"];
  $stmt->close();

  $score = getScore($num);
  $isRecord = false;

  //updates table if score is higher
  if ($score > $result) {
    $stmt = $conn->prepare("UPDATE users SET score = ? WHERE id = ?");
    $stmt->bind_param("is", $score, $_SESSION['user_id']);
    $stmt->execute();
    check_quarry($stmt, $conn);
    $stmt->close();
    $isRecord = true;
  }
  echo json_encode(
    array(
      "code" => 2,
      "response" => 200,
      "message" => "Hai esaurito i tentativi",
      "result" => substr($_SESSION['user_number'], 0, 6),
      "score" => $score,
      "record" => $isRecord,
    )
  );
  $_SESSION['user_number'] = -1;

  $conn->close();
  exit();
}

//generates random number
if ($_SESSION['user_number'] == -1) {
  $_SESSION['user_number'] = rand(0, 100);
  $_SESSION['user_number'] += (rand(0, 9)/10);
  $_SESSION['user_number'] += (rand(0, 9)/100);
  $_SESSION['user_number'] += (rand(0, 9)/1000);
  $_SESSION['user_number'] += (rand(0, 9)/10000);
}

//response
if ($num > $_SESSION['user_number']) {
  echo json_encode(
    array(
      "code" => 1,
      "response" => 200,
      "message" => "Successo",
      "result" => "$num è maggiore",
      "attempt" => $_SESSION['user_attempt']
    )
  );
  $conn->close();
  exit();
}

if ($num < $_SESSION['user_number']) {
  echo json_encode(
    array(
      "code" => 1,
      "response" => 200,
      "message" => "Successo",
      "result" => "$num è minore",
      "attempt" => $_SESSION['user_attempt']
    )
  );
  $conn->close();
  exit();
}

if ($num == $_SESSION['user_number']) {
  echo json_encode(
    array(
      "code" => 3,
      "response" => 200,
      "message" => "Il tuo nome verrà ricordato nei libri di storia"
    )
  );

  $stmt = $conn->prepare("UPDATE users SET score = 10000 WHERE id = ?");
  $stmt->bind_param("s", $_SESSION['user_id']);
  $stmt->execute();
  check_quarry($stmt, $conn);
  $stmt->close();

  $conn->close();
  exit();
}
