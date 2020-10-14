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
  if (x.attr("src") == "img\\checkbox.png"){
    x.attr("src","img\\checkbox2.png");
  } else {
    x.attr("src","img\\checkbox.png");
  }
}
$("body").on("click", "#divRemember", CB);


//checks checkbox value
function checkRemember (){
  if ($("#remember").attr("src") == "img\\checkbox.png"){
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

function logout() {
  logoutAN();
  document.cookie = "GioeleSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  document.cookie = "GioeleSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  sessionid = "";
  //deletes leaderboard
  for (let i = 0; i < 10; i++) {
    $("#tr" + i).remove();
  }
}

//variables for arrows that close things
let BoxP = true;
let BoxR = true;
let BoxL = true;

//switches profile box
$("body").on("click", "#infoArrow", function(e) {
   if (BoxP) {
     BoxP = false;
     closePB();
   } else {
     BoxP = true;
     openPB();
   }
});

//switches rules box
$("body").on("click", "#rulesArrow", function(e) {
   if (BoxR) {
     BoxR = false;
     closeRB();
   } else {
     BoxR = true;
     openRB();
   }
});

//switches rules box
$("body").on("click", "#leaderboardArrow", function(e) {
   if (BoxL) {
     BoxL = false;
     closeLB();
   } else {
     BoxL = true;
     openLB();
   }
});

//hoes mad
let designerr = true;
$("body").on("click", "#sadtesto", function(e) {
  if (designerr) {
    designerr = false;
    document.head.childNodes.forEach(ch => ch.nodeName === 'LINK' ? document.head.removeChild(ch) : null);
  } else {
    $('head').append('<link rel="stylesheet" type="text/css" href="css/classes.css">');
    $('head').append('<link rel="stylesheet" type="text/css" href="css/animations.css">');
    $('head').append('<link rel="stylesheet" type="text/css" href="css/medias.css">');
    $('head').append('<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>');
    $('head').append('<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin">');
    $('head').append('<link rel="icon" href="img/favicontrue.png">');

    designerr = true;
  }
});
