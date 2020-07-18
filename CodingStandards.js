let rand = 0;
let attempt_counter = 3;

function GENERANUMERO(){
  rand = Math.random() * (99000) + 1000;
  rand = Math.round(rand);
  rand = rand / 1000;
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

  console.log(guess);
  CONTROLLAVITTORIA(guess)
  return;
}

/*      return values:
    -1    è minore
     0    è uguale
    +1    è maggiore
*/
function CONTROLLAVITTORIA(guess){
  console.log(guess + 's');
  //checks if there are any attempts left
  if (attempt_counter == 0){
    $("#div_attempts").addClass("hide");
    $("#div_input").addClass("hide");
    rand = 0;
    attempt_counter = 3;
    return;
  } else {
    attempt_counter--;
  }
  $("#attempts").text(attempt_counter);


  if (guess < rand){
    console.log("minore");
    return -1;
  }
  if (guess > rand){
    console.log("maggiore");
    return 1;
  }


  console.log("uguale");
  return 0;
}

function INIZIAGIOCO(){
  $("#div_attempts").removeClass("hide");
  $("#div_input").removeClass("hide");

  if (rand == 0){
    let rand = GENERANUMERO();
    console.log(rand);
  }

  let attempt = $("#attempts");
  attempt.text(attempt_counter);
}
