//session id
let sessionid;

//clears textboxes value
function clearTB() {
  $("#username").val("");
  $("#password").val("");
  $("#usernameReg").val("");
  $("#emailReg").val("");
  $("#passwordReg").val("");
  $("#passwordConfirmReg").val("");
}

//hides exceptions
function clearEX() {
  $("#LoginException").addClass("hide");
  $("#exceptionReg1").addClass("hide");
  $("#exceptionReg2").addClass("hide");
  $("#exceptionReg3").addClass("hide");
}

//gets cookie and returns object
function getCookie(name) {
  let cookie = decodeURIComponent(document.cookie);
  let cArray = cookie.split(';');
  let obj = {
    exist: false,
    value: null
  }
  for (let i = 0; i <cArray.length; i++) {
    let c = cArray[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      obj.exist = true;
      obj.value = c.substring(name.length+1, c.length);
    }
  }
  return obj;
}

//checks if session cookie exists, if it does then auto logs in user sending request to server
function checkLogin() {
  if (getCookie("GioeleSession").exist) {
    autoLogin();
  } else {

  }
}

//checkbox
function CB() {
  let x = $("#remember");
  if (x.attr("src") == "checkbox.png"){
    x.attr("src","checkbox2.png");
  } else {
    x.attr("src","checkbox.png");
  }
}
$("body").on("click", "#divRemember", CB);


//checks checkbox value
function checkRemember (){
  if ($("#remember").attr("src") == "checkbox.png"){
    return "false"
  } else {
    return "true";
  }
}

//refresh leaderboard
$("body").on("click", "#refreshLeaderboard", function(e) {
  e.preventDefault();
  refreshAN();
  //empties leaderboard
  setTimeout(function(){
    for (let i = 0; i < 10; i++) {
      $("#tr" + i).remove();
    }
    getTop10()
  }, 200);
});
