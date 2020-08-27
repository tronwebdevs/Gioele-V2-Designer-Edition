
//REGISTER USER
$("body").on("click", "#signin", function(e) {
  e.preventDefault();

  $("#SigninException").addClass("hide");
  $("#SigninPassException").addClass("hide");

  $.ajax({
    type: "POST",
    url: "AddUser.php",
    data: JSON.stringify({
            username: $("#usernameReg").val(),
            email: $("#emailReg").val(),
            password: $("#passwordReg").val(),
            passwordC: $("#passwordConfirmReg").val()
          }),
    success: function(data) {
      if (data.code == 1) {
        $("#SigninException").text("inattivo");
        $("#SigninException").addClass("hide");
        console.log(data.message);
        //redirect to Login form
        SR();
      }
      if (data.code == -1) {
        $("#SigninException").removeClass("hide");
        $("#SigninException").text(data.message);
      }
      if (data.code == -2) {
        $("#SigninException").text("inattivo");
        $("#SigninPassException").removeClass("hide");
        $("#SigninPassException").text(data.message);
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
            username: $("#username").val(),
            password: $("#password").val(),
            remember: checkRemember()
          }),
    success: function(data) {
      if (data.code == 1) {
        console.log(data.message);
        sessionAN();  //animation
        sessionStart(data);
      } else {
        $("#LoginException").removeClass("hide");
        $("#LoginException").text(data.message);
      }
    }
  });
});


//AUTOLOGIN USER
function autoLogin() {
  $.get( "autoLogin.php", function(data) {
    if (data.code == 1) {
      console.log(data.message);
      sessionAN();  //animation
      sessionStart(data);
    } else {
      $("#LoginException").removeClass("hide");
      $("#LoginException").text(data.message);
    }
  });
}

//get top 10 players
function getTop10() {
  $.get( "TopTen.php", function(data) {
    showLeaderboard(data);
  });
}
