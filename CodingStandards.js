let rand = 0;
let attempt_counter = 5;
let rules = false;
let game_started = false;

let exceptions = [
  "inserisci un numero",
  "devi inserire un numero",
  "inserisci un numero pls",
  "devi indovinare un numero",
  "NaN",
  "sei figo ma ora inserisci un numero",
  "mettiti la mascherina e inserisci un numero",
  "ma una rosa senza spine va a batteria?",
  "scusa ma GIOELE V2™ non funziona senza un numero",
  "INSERISCINUMERO()",
  "potresti inserirmi un numero per favore?"
]

function GENERANUMERO(){
  rand = Math.random() * (99000) + 1000;
  rand = Math.round(rand);
  rand = rand / 1000;
  console.log(rand);
  return rand;
}


function INDOVINANUMERO(){
  let exception = $("#exception");
  exception.text(".");
  exception.css("color", "transparent");

  //checks if input is acceptable
  let guess = $("#guess").val()
  if (isNaN(guess) || guess == ''){
    let randE = Math.random() * 10;
    randE = Math.round(randE);
    console.log(randE);
    exception.css("color", "gainsboro");
    exception.text(exceptions[randE]);
    return;
  }
  if (guess < 0 || guess > 100){
    exception.css("color", "gainsboro");
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
  compare.text(".");
  compare.addClass("transparent");

  console.log(guess + 's');

  if (guess < rand){
    compare.removeClass("transparent");
    compare.text(guess + " e' minore");
  }
  if (guess > rand){
    compare.removeClass("transparent");
    compare.text(guess + " e' maggiore");
  }
  if (guess == rand){
    compare.removeClass("transparent");
    compare.text("congratulazioni, hai fatto l'impossibile");
    attempt_counter = 0;
    return;
  }

  //checks if there are any attempts left
  if (attempt_counter == 1){
    attempt.text("hai finito i tentativi");
    compare.text(".");
    compare.addClass("transparent");

    // shows score
    result.removeClass("transparent");
    result.text("hai fatto " + CALCOLAPUNTEGGIO(guess) + " punti");

    //displays the number
    $("#number").removeClass("transparent");
    $("#number").text("il numero da indovinare era " + rand);

    $("#btn_play").text("RICOMINCIAGIOCO()");

    rand = 0;
    attempt_counter = 5;
    return;
  } else {
    attempt_counter--;
    attempt.removeClass("transparent");
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
  if (game_started == false) {
    $("#div_game_2").removeClass("hide");
    $("#div_game_2").removeClass("gameEnd");
    $("#div_game_2").addClass("gameStart");

    if (rand == 0){
      let rand = GENERANUMERO();
      console.log(rand);
    }

    let attempt = $("#attempts");
    attempt.text("tentativi: " + attempt_counter);

    $("#btn_play").text("FERMAGIOCO()");
    game_started = true;
  } else {
    setTimeout(function(){
      $("#div_game_2").addClass("hide");
    }, 450);
    $("#div_game_2").addClass("gameEnd");
    $("#div_game_2").removeClass("gameStart");
    $("#guess").val("");
    $("#exception").text("");
    $("#compare").text("");

    rand = 0;
    attempt_counter = 5;

    $("#btn_play").text("INIZIAGIOCO()");
    game_started = false;
  }
}

function ANIMAZIONI(){
  //Gioele
  setTimeout(function(){
    $(".subtitle").css("opacity", 1);
  }, 2050);
  setTimeout(function(){
    $(".title").css("opacity", 1);
  }, 1550);
  setTimeout(function(){
    $(".divTitle").css("opacity", 1);
  }, 1050);
  setTimeout(function(){
    $(".title").addClass("effect");
    $(".subtitle").addClass("effect");
    $(".line").addClass("effect2");
  }, 2500);

  //button rules
  setTimeout(function(){
    $("#btn_rules").removeClass("hide");
    $("#btn_rules").addClass("buttonBorder");
  }, 2200);
  setTimeout(function(){
    $("#btn_rules").addClass("buttonFill");
  }, 3200);
  setTimeout(function(){
    $("#btn_rules").addClass("buttonText");
  }, 3500);
  setTimeout(function(){
    $("#btn_rules").addClass("effect2");
  }, 4300);

  //button play
  setTimeout(function(){
    $("#btn_play").removeClass("hide");
    $("#btn_play").addClass("buttonBorder");
  }, 2500);
  setTimeout(function(){
    $("#btn_play").addClass("buttonFill");
  }, 3500);
  setTimeout(function(){
    $("#btn_play").addClass("buttonText");
  }, 3800);
  setTimeout(function(){
    $("#btn_play").addClass("effect2");
  }, 4600);

  return;
}

function REGOLE(){
  if (rules == false){
    $('#btn_rules').prop("disabled", true);
    setTimeout(function(){
      $('#btn_rules').prop("disabled", false);
    }, 2250);
    setTimeout(function(){
      $("#rules").removeClass("hide");
      $("#rules").removeClass("outR");
      $("#rules").addClass("inR");
      $("#div_game").addClass("hide");
    }, 1250);
    setTimeout(function(){
      $("#div_game").addClass("hide");
    }, 1150);
    setTimeout(function(){
    $("#div_game").removeClass("in");
    $("#div_game").addClass("out");
    $("#div_game_2").addClass("hide");
    }, 450);
    $("#div_game_2").addClass("gameEnd");
    $("#div_game_2").removeClass("gameStart");
    rules = true;
  } else {
    $('#btn_rules').prop("disabled", true);
    setTimeout(function(){
      $('#btn_rules').prop("disabled", false);
    }, 2300);
    setTimeout(function(){
      $("#div_game").removeClass("hide");
      $("#div_game").removeClass("out");
      $("#div_game").addClass("in");
    }, 1000);
    setTimeout(function(){
      $("#rules").addClass("hide");
    }, 800);
    setTimeout(function(){
      if(game_started) {
        $("#div_game_2").removeClass("hide");
        $("#div_game_2").addClass("gameStart");
      }
    }, 1500);
    $("#div_game_2").addClass("hide");
    $("#div_game_2").removeClass("gameEnd");
    $("#rules").removeClass("inR");
    $("#rules").addClass("outR");

    rules = false;
  }

}
