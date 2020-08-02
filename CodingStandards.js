let rand = 0;
let attempt_counter = 5;
let rules = false;
let start = true;
let stop = false;
let god = false;
let game_started = false;

/*
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
*/

function GENERANUMERO(){
  rand = Math.random() * (99000) + 1000;
  rand = Math.round(rand);
  rand = rand / 1000;
  console.log(rand);
  return rand;
}

function CALCOLAPUNTEGGIO(guess){
  let delta = Math.abs(rand - guess);
  if (delta >= 10) {
    score = 0;
  } else {
    let a = 40;
    let b = 512 * delta;
    let c = -4000 + (40 * delta * delta);
    score = (-b + Math.sqrt(b*b - 4*a*c)) / (2*a);
  }
  console.log("score:" + score);
  var str = score.toFixed(3);
  console.log("str:" + str);
  score = parseFloat(str);
  score = score * 1000;
  console.log("score score " + score)
  score = Math.round(score);
  console.log("final score:" + score);
  return score;
}

function GIOCO(){
  if (stop == true && start == true) {
    $('#btn_play').prop("disabled", true);
    setTimeout(function(){
      $('#btn_play').prop("disabled", false);
    }, 1550);

    $("#div_game_2").removeClass("gameStart");
    $("#div_game_2").addClass("gameEnd");
    setTimeout(function(){
      $("#div_game_2").removeClass("gameEnd");
      $("#div_game_2").addClass("gameStart");
    }, 450);

    attempt_counter = 5;
    rand = GENERANUMERO();

    $("#attempts").text("tentativi: " + attempt_counter);
    $("#guess").val("");
    $("#exception").text(' ');
    $("#compare").text(' ');
    $("#result").text(' ');
    $("#number").text(' ');

    start = false;
    stop = true;
    $("#btn_play").text("FERMAGIOCO()");
    game_started = true;
    return;
  }
  if (start){
    $('#btn_play').prop("disabled", true);
    setTimeout(function(){
      $('#btn_play').prop("disabled", false);
    }, 550);

    //starts game animation
    $("#div_game_2").removeClass("hide");
    $("#div_game_2").addClass("gameStart");
    $("#div_game_2").removeClass("gameEnd");

    //randomize number
    if(rand == 0){
      rand = GENERANUMERO();
    }

    $("#attempts").text("tentativi: " + attempt_counter);

    start = false;
    stop = true;
    $("#btn_play").text("FERMAGIOCO()");
    game_started = true;
    return;
  }
  if (stop) {
    $('#btn_play').prop("disabled", true);
    setTimeout(function(){
      $('#btn_play').prop("disabled", false);
    }, 1050);

    setTimeout(function(){
      $("#div_game_2").addClass("hide");
    }, 450);
    $("#div_game_2").removeClass("gameStart");
    $("#div_game_2").addClass("gameEnd");

    attempt_counter = 5;
    rand = 0;

    $("#attempts").text(' ');
    $("#guess").val("");
    $("#exception").text(' ');
    $("#compare").text(' ');
    $("#result").text(' ');
    $("#number").text(' ');

    start = true;
    stop = false;
    $("#btn_play").text("INIZIAGIOCO()");
    game_started = false;
    return;
  }
}

function DECIMALI(guess){
  let decimals = false;
  let counter = 0;
  for (let i = 0; i < guess.length; i++){
    if (decimals) {
      counter++;
    }
    if (guess[i] == '.'){
      decimals = true;
    }
  }
  console.log(counter)
  return counter;
}

$("#guess").keypress(function(e) {
  if (e.key === "Enter") {
    console.log("dd");
    CONTROLLANUMERO();
  }
  console.log("d");
});

function CONTROLLANUMERO(){
  let exception = $("#exception");
  let compare = $("#compare");
  exception.text(" ");
  exception.addClass("transparent");

  //checks if input is acceptable
  let guess = $("#guess").val()
  if (isNaN(guess) || guess == ''){
    /*
    let randE = Math.random() * 10;
    randE = Math.round(randE);
    console.log(randE);
    exception.text(exceptions[randE]);
    exception.css("color", "gainsboro");
    */
    compare.addClass("transparent");
    exception.removeClass("transparent");
    exception.text("devi inserire un numero");
    return;
  }
  if (guess < 0 || guess > 100){
    compare.addClass("transparent");
    exception.removeClass("transparent");
    exception.text("il numero deve essere compreso tra 0 e 100");
    return;
  }
  if (DECIMALI(guess) > 3){
    compare.addClass("transparent");
    exception.removeClass("transparent");
    exception.text("il numero non può avere più di 3 cifre decimali");
    return;
  }

  CONTROLLAVITTORIA(guess)
  return;
}


function CONTROLLAVITTORIA(guess){
  let result = $("#result");
  let attempt = $("#attempts");
  let compare = $("#compare");
  compare.text(' ');
  compare.addClass("transparent");

  if (guess < rand){
    compare.removeClass("transparent");
    compare.text(guess + " è minore");
  }
  if (guess > rand){
    compare.removeClass("transparent");
    compare.text(guess + " è maggiore");
  }
  if (guess == rand){
    god = true;
  }

  if (!god){
    //checks if there are any attempts left
    if (attempt_counter <= 1){
      attempt.text("hai finito i tentativi");
      compare.text(' ');
      compare.addClass("transparent");

      // shows score
      result.removeClass("transparent");
      result.text("hai fatto " + CALCOLAPUNTEGGIO(guess) + " punti");

      //displays the number
      $("#number").removeClass("transparent");
      $("#number").text("il numero da indovinare era " + rand);

      start = true;
      stop = true;
      $("#btn_play").text("RICOMINCIAGIOCO()");
      return;
    } else {
      attempt_counter--;
      attempt.removeClass("transparent");
      attempt.text("tentativi rimasti: " + attempt_counter);
    }
  } else {
    attempt_counter = 5;
    attempt.text("congratulazioni, hai fatto l'impossibile");
    compare.removeClass("transparent");
    compare.text("hai indovinato il numero.");
    result.text("Gioele è compiaciuto della tua impresa e ti permetterà di continuare a vivere");
    result.removeClass("transparent");

    start = true;
    stop = true;
    $("#btn_play").text("RICOMINCIAGIOCO()");
    god = false;
    return;
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
      $("#div_start").addClass("hide");
    }, 1150);
    setTimeout(function(){
      $("#div_start").removeClass("in");
      $("#div_start").addClass("out");
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
      $("#div_start").removeClass("hide");
      $("#div_game").removeClass("hide");
      $("#div_start").removeClass("out");
      $("#div_start").addClass("in");
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
