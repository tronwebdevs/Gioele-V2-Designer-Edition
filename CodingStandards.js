let rand = 0;
let attempt_counter = 5;

function GENERANUMERO(){
  rand = Math.random() * (99000) + 1000;
  rand = Math.round(rand);
  rand = rand / 1000;
  console.log(rand);
  return rand;
}


function INDOVINANUMERO(){
  let exception = $("#exception");
  exception.addClass("hide");

  //checks if input is acceptable
  let guess = $("#guess").val()
  if (isNaN(guess) || guess == ''){
    exception.removeClass("hide");
    exception.text("devi inserire un numero");
    return;
  }
  if (guess < 0 || guess > 100){
    exception.removeClass("hide");
    exception.text("il numero deve essere compreso tra 0 e 100");
    return;
  }

  console.log(rand);
  console.log(guess);
  CONTROLLAVITTORIA(guess)
  return;
}


function CONTROLLAVITTORIA(guess){
  let result = $("#result");
  let attempt = $("#attempts");
  let compare = $("#compare");
  compare.addClass("hide");

  console.log(guess + 's');

  if (guess < rand){
    console.log("minore");
    $("#compare").removeClass("hide");
    compare.text(guess + " e' minore");
  }
  if (guess > rand){
    console.log("maggiore");
    $("#compare").removeClass("hide");
    compare.text(guess + " e' maggiore");
  }
  if (guess == rand){
    console.log("uguale");
    $("#compare").removeClass("hide");
    compare.text("congratulazioni, hai fatto l'impossibile");
    attempt_counter = 0;
    return;
  }

  //checks if there are any attempts left
  if (attempt_counter == 1){
    $("#div_attempts").addClass("hide");
    $("#div_input").addClass("hide");
    attempt.text("hai finito i tentativi");
    compare.addClass("hide");

    // shows score
    result.removeClass("hide");
    result.text("hai fatto " + CALCOLAPUNTEGGIO(guess) + " punti");

    //displays the number
    $("#number").removeClass("hide");
    $("#number").text("il numero da indovinare era " + rand);

    rand = 0;
    attempt_counter = 5;
    return;
  } else {
    attempt_counter--;
    attempt.text("tentativi: " + attempt_counter);
  }



  return;
}

function CALCOLAPUNTEGGIO(guess){
  let delta = Math.abs(rand - guess);
  console.log("r = " + rand);
  console.log("g = " + guess);
  console.log("d = " + delta);
  if (delta != 0){
    score = 100 / delta - 1;
    score.toFixed(2);
  } else {
    score = 100000;
  }
  var str = score.toFixed(2);
  score = parseFloat(str);
  return score;
}


function INIZIAGIOCO(){
  $("#div_attempts").removeClass("hide");
  $("#div_input").removeClass("hide");
  $("#result").addClass("hide");
  $("#number").addClass("hide");

  if (rand == 0){
    let rand = GENERANUMERO();
    console.log(rand);
  }

  let attempt = $("#attempts");
  attempt.text("tentativi: " + attempt_counter);
}
