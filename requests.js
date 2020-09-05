
//REGISTER USER
$("body").on("click", "#signin", function(e) {
  e.preventDefault();

  $("#exceptionReg1").addClass("hide");
  $("#exceptionReg2").addClass("hide");
  $("#exceptionReg3").addClass("hide");

  $.ajax({
    type: "POST",
    url: "AddUser.php",
    data: JSON.stringify({
            username: $("#usernameReg").val().trim(),
            email: $("#emailReg").val().trim(),
            password: $("#passwordReg").val().trim(),
            passwordC: $("#passwordConfirmReg").val().trim()
          }),
    success: function(data) {
      if (data.code == 1) {
        console.log(data.message);
        //redirect to Login form
        SR();
        clearTB();
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
    url: "Login.php",
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
  $.get("autoLogin.php", function(data) {
    if (data.code == 1) {
      console.log(data.message);
      sessionAN();  //animation
      sessionStart(data);
      sessionid = data.sessId;
    } else {
      $("#LoginException").removeClass("hide");
      $("#LoginException").text(data.message);
    }
  });
}

//Edit Username
$("body").on("click", "#confirmEdit", function(e) {
  e.preventDefault();
  $("#exceptionEdit").addClass("hide");

  $.ajax({
    type: "POST",
    url: "EditUser.php",
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
  $.get( "TopTen.php", function(data) {
    showLeaderboard(data);
  });
}
