function showInfo(data) {
  $("#usernameInfo").text(data.username);
  $("#emailInfo").text(data.email);
  $("#scoreInfo").text("punteggio: " + data.score);
}

function showLeaderboard(data) {
  let length = Object.keys(data).length;
  let counter = 0;

  for (let i = 0; i < length; i++) {
    $("#leaderboardTable").append("<tr id=\"tr" + counter + "\">");
    $("#tr"+counter).append("<th> #" + (counter+1) +"</th");
    $("#tr"+counter).append("<th>" + data[i].score +"</th");
    $("#tr"+counter).append("<th>" + data[i].username +"</th");
    $("#tr"+counter).append("</tr>");
    if (data[i].score == data[counter].score){
      counter++;
    }
  }
}

/*                                    cose per l'anzazheirmeamerprrrrrrr
"code" => 1,
"response" => 200,
"message" => "Login avvenuto con successo",
"id" => $_SESSION['user_id'],
"username" => $_SESSION['user_name'],
"password" => $_SESSION['user_password'],
"email" => $_SESSION['user_email'],
"score" => $_SESSION['user_score'],
)
)*/


function sessionStart(data) {
  showInfo(data);
  getTop10();





}
