
//REGISTER USER
$("body").on("click", "#signin", function(e) {
  e.preventDefault();

  $("#exceptionReg1").addClass("hide");
  $("#exceptionReg2").addClass("hide");
  $("#exceptionReg3").addClass("hide");

  //$("#signin").prop("disabled",true);
  loadingIn();

  $.ajax({
    type: "POST",
    url: "api\\AddUser.php",
    data: JSON.stringify({
            username: $("#usernameReg").val().trim(),
            email: $("#emailReg").val().trim(),
            password: $("#passwordReg").val().trim(),
            passwordC: $("#passwordConfirmReg").val().trim()
          }),
    success: function(data) {
      $("#signin").prop("disabled",false);
      loadingOut();
      if (data.code == 1) {
        console.log(data.message);
        //redirect to Login form
        SR();
        clearTB();
        reminder();
      }
      if (data.code == -1) {
        $("#exceptionReg1").removeClass("hide");
        $("#exceptionReg1").text(data.message);
      }
      if (data.code == -2) {
        $("#exceptionReg2").removeClass("hide");
        $("#exceptionReg2").text(data.message);
      }
      if (data.code == -3) {
        $("#exceptionReg3").removeClass("hide");
        $("#exceptionReg3").text(data.message);
      }
    }
  });
});


//LOGIN USER
$("body").on("click", "#login", function(e) {
  e.preventDefault();

  $.ajax({
    type: "POST",
    url: "api\\Login.php",
    data:  JSON.stringify({
            username: $("#username").val().trim(),
            password: $("#password").val().trim(),
            remember: checkRemember()
          }),
    success: function(data) {
      if (data.code == 1) {
        console.log(data.message);
        clearTB();
        sessionAN();  //animation
        sessionStart(data);
        sessionid = data.sessId;
      } else {
        $("#LoginException").removeClass("hide");
        $("#LoginException").text(data.message);
      }
    }
  });
});


//AUTOLOGIN USER
function autoLogin() {
  $.ajax({
    type: "POST",
    url: "api\\autoLogin.php",
    data:  JSON.stringify({
            sessionid: getCookie("GioeleSession").value
          }),
    success: function(data) {
      if (data.code == 1) {
        console.log(data.message);
        sessionAN();  //animation
        sessionStart(data);
        sessionid = data.sessId;
      } else {
        $("#LoginException").removeClass("hide");
        $("#LoginException").text(data.message);
        document.cookie = ("GioeleSession=" + getCookie("GioeleSession").value + "; expires=Thu, 01 Jan 1970 00:00:00 UTC");
        document.cookie = ("GioeleSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/");
      }
    }
  });
}

//logout from session
$("body").on("click", "#logout", function (){

  $.ajax({
    type: "POST",
    url: "api\\deleteSession.php",
    data:  JSON.stringify({
            sessionid: sessionid
          }),
    success: function(data) {
      logoutAN();
      document.cookie = "GioeleSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      document.cookie = "GioeleSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      console.log(data.message);
      sessionid = "";
    }
  });

});

//Edit Username
$("body").on("click", "#confirmEdit", function(e) {
  e.preventDefault();
  $("#exceptionEdit").addClass("hide");

  $.ajax({
    type: "POST",
    url: "api\\EditUser.php",
    data:  JSON.stringify({
            sessionid: sessionid,
            newusername: $("#editUsername").val().trim()
          }),
    success: function(data) {
      if (data.code == 1) {
        $("#usernameInfo").text(data.username);
        $("#editUsername").attr("placeholder", data.username);
      }
      if (data.code == -1) {
        $("#exceptionEdit").removeClass("hide");
        $("#exceptionEdit").text(data.message);
      }
    }
  });
});

//Delete Profile
$("body").on("click", "#deleteConfirm", function(e) {
  e.preventDefault();
  alert('inattivo')
});

//get top 10 players
function getTop10() {
  $.get( "api\\TopTen.php", function(data) {
    showLeaderboard(data);
  });
}

//game
$("body").on("click", "#gameButton", function(e) {

  e.preventDefault();
  $("#gameException").addClass("hide");
  $("#gameButton").prop('value', 'Prova');

  $.ajax({
    type: "POST",
    url: "api\\Game.php",
    data:  JSON.stringify({
            sessionid: sessionid,
            number: $("#gameAttempt").val().trim()
          }),
    success: function(data) {
      if (data.code == 1) {
        $("#gameResult").removeClass("hide");
        $("#gameAttemptsLeft").text("tentativi: " + data.attempt);
        $("#gameResult").text(data.result);
      }
      if (data.code == 2) {
        $("#gameResult").removeClass("hide");
        $("#gameAttemptsLeft").text("tentativi esauriti");
        $("#gameResult").text("Il numero era " + data.result + " - Hai fatto " + data.score + " punti");
        $("#gameButton").prop("value", "Ricomincia");
        if (data.record == true) {
          $("#scoreInfo").text("punteggio: " + data.score);
        }
      }
      if (data.code == 3) {
        $("#gameResult").removeClass("hide");
        $("#gameAttemptsLeft").text("I tentativi non ti servono più");
        $("#gameResult").text(data.message);
        $("#scoreInfo").text("punteggio: 100000");
      }
      if (data.code == 4) {
        $("#gameAttemptsLeft").text("tentativi: 3");
        $("#gameResult").addClass("hide");
        $("#gameResult").text(".");
        $("#gameAttempt").val("");
      }
      if (data.code == -1) {
        $("#gameException").removeClass("hide");
        $("#gameException").text(data.message);
      }
    }
  });
});
