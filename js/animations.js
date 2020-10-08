$("body").on("click", "#sml", function() {
  let x = $("#divTitle");
  if (x.hasClass("gioele")) {
    x.removeClass("gioele");
    $("#title").removeClass("hide");
    $("#subtitle").removeClass("hide");
    $("#designer").removeClass("hide");
  } else {
    $("#title").addClass("hide");
    $("#subtitle").addClass("hide");
    $("#designer").addClass("hide");
    x.addClass("gioele");
  }
});


//switch login to signin
$("body").on("click", "#register", function() {
  $("#divHide").addClass("makeTr");
  $("#divAccess").addClass("foldIn");
  setTimeout(function() {
    $("#divHide").removeClass("makeTr");
    $("#divAccess").removeClass("foldIn");
    $("#divAccess").addClass("hideDisplay");

    $("#divAccessReg").removeClass("hideDisplay");
    $("#divAccessReg").addClass("foldOut");
    $("#divHideReg").addClass("makeVs");
  }, 450);
  setTimeout(function() {
    clearEX();
    $("#divHideReg").removeClass("hide");
    $("#divHideReg").removeClass("makeVs");
    $("#divAccessReg").removeClass("foldOut");
  }, 950);
});

//switch login to Forgot Password
$("body").on("click", "#forgotPassword", function() {
  $("#divHide").addClass("makeTr");
  $("#divAccess").addClass("foldIn");
  setTimeout(function() {
    $("#divHide").removeClass("makeTr");
    $("#divAccess").removeClass("foldIn");
    $("#divAccess").addClass("hideDisplay");

    $("#divForgot").removeClass("hideDisplay");
    $("#divForgot").addClass("foldOut");
    $("#divFHide").addClass("makeVs");
  }, 450);
  setTimeout(function() {
    clearEX();
    $("#divFHide").removeClass("hide");
    $("#divFHide").removeClass("makeVs");
    $("#divForgot").removeClass("foldOut");
  }, 950);
});

//switch Forgot Password to login
$("body").on("click", "#back", function() {
  $("#divFHide").addClass("makeTr");
  $("#divForgot").addClass("foldIn");
  setTimeout(function() {
    $("#divFHide").removeClass("makeTr");
    $("#divForgot").removeClass("foldIn");
    $("#divForgot").addClass("hideDisplay");

    $("#divAccess").removeClass("hideDisplay");
    $("#divAccess").addClass("foldOut");
    $("#divHide").addClass("makeVs");
  }, 450);
  setTimeout(function() {
    clearEX();
    $("#divHide").removeClass("hide");
    $("#divHide").removeClass("makeVs");
    $("#divAccess").removeClass("foldOut");
  }, 950);
});


//switch signin to login
function SR() {
  $("#divHideReg").addClass("makeTr");
  $("#divAccessReg").addClass("foldIn");
  setTimeout(function() {
    $("#divHideReg").removeClass("makeTr");
    $("#divAccessReg").removeClass("foldIn");
    $("#divAccessReg").addClass("hideDisplay");

    $("#divAccess").removeClass("hideDisplay");
    $("#divAccess").addClass("foldOut");
    $("#divHide").addClass("makeVs");
  }, 450);
  setTimeout(function() {
    clearEX();
    $("#divHide").removeClass("hide");
    $("#divHide").removeClass("makeVs");
    $("#divAccess").removeClass("foldOut");
  }, 950);
}

$("body").on("click", "#alreadySigned", SR);


//shows actual game when logging in
function sessionAN() {
  $("#divAccess").addClass("hideDisplay");
  $("#divAccessReg").addClass("hideDisplay");
  $("#divSession").removeClass("hideDisplay");
}

function logoutAN() {
  $("#divSession").addClass("hideDisplay");
  $("#divRules").addClass("hide");
  $("#divGame").addClass("hide");
  $("#divLeaderboard").addClass("hide");
  $("#divAccess").removeClass("hideDisplay");
}

//switch to edit profile
$("body").on("click", "#editProfile", function() {
  $("#divInfo").addClass("hideDisplay");
  $("#divEdit").removeClass("hideDisplay");
  $("#editUsername").val("");
});

//switch back to profile info
$("body").on("click", "#discardEdit", function() {
  $("#divEdit").addClass("hideDisplay");
  $("#divInfo").removeClass("hideDisplay");
});

//switch edit to confirm delete
$("body").on("click", "#deleteProfile", function() {
  $("#editOptions").addClass("hideDisplay");
  $("#confirmDelete").removeClass("hideDisplay");
});

//cancel delete this
$("body").on("click", "#deleteUndo", function() {
  $("#editOptions").removeClass("hideDisplay");
  $("#confirmDelete").addClass("hideDisplay");
});

function refreshAN(){
  $("#tableHeader").addClass("makeTr");
  $("#refreshLeaderboard").addClass("fa-spin");
  setTimeout(function(){
    $("#tableHeader").removeClass("makeTr");
    $("#tableHeader").addClass("makeVs");
  }, 450);
  setTimeout(function(){
    $("#tableHeader").removeClass("makeVs");
    $("#refreshLeaderboard").removeClass("fa-spin");
  }, 1000);
}

// shows loading spinning wheel
function loadingIn(div){
  $(div).addClass("makeVs");
  $(div).removeClass("hide");
  $(div).removeClass("makeTr");
}
function loadingOut(div){
  $(div).addClass("makeTr");
  $(div).addClass("hide");
  $(div).removeClass("makeVs");
}
//shows reminder after signing in
function reminder(){
  setTimeout(function(){
    $("#reminder").removeClass("hideDisplay");
    $("#reminder").addClass("showReminder");
    $("#reminder").removeClass("hideReminder");
    setTimeout(function(){
      $("#reminder").addClass("hideReminder");
      $("#reminder").removeClass("showReminder");
      setTimeout(function(){
        $("#reminder").addClass("hideDisplay");
      }, 650);
    }, 5000);
  }, 1000);
}

//logging in cool animations
function GameAN() {
  $("#divProfile").addClass("slideInLeft");
  setTimeout(function(){
    $("#divRules").removeClass("hide");
    $("#divRules").addClass("slideInLeft");
  }, 150);
  setTimeout(function(){
    $("#divLeaderboard").removeClass("hide");
    $("#divLeaderboard").addClass("slideInRigth");
  }, 300);
  setTimeout(function(){
    $("#divGame").removeClass("hide");
    $("#divGame").addClass("gameAN");
  }, 800);

  setTimeout(function(){
    $("#divProfile").removeClass("slideInLeft");
    setTimeout(function(){
      $("#divRules").removeClass("slideInLeft");
    }, 150);
    setTimeout(function(){
      $("#divLeaderboard").removeClass("slideInRigth");
    }, 300);
    setTimeout(function(){
      $("#divGame").removeClass("gameAN");
    }, 800);
  }, 950);
}

//title animation
function TitleAN() {
  $("#title").addClass("titleAN");
  setTimeout(function(){
    $("#subtitle").removeClass("hide");
    $("#subtitle").addClass("titleAN");
  }, 300);
  setTimeout(function(){
    $("#designer").removeClass("hide");
    $("#designer").addClass("makeVs");
  }, 2000);
  setTimeout(function(){
    $("#title").removeClass("titleAN");
    $("#subtitle").removeClass("titleAN");
    $("#designer").removeClass("makeVs");
  }, 2500);
}

//footer animation
function LoginAN() {
  setTimeout(function() {
    $("#divAccess").removeClass("hide");
    $("#divAccess").addClass("accessAN");
    $("#divHide").addClass("accessHideAN");
  }, 2500);
  setTimeout(function() {
    $("#divHide").removeClass("hide");
    $("#divHide").removeClass("accessHideAN");
    $("#divAccess").removeClass("accessAN");
  }, 4050);
}

//footer animation
function FooterAN() {
  setTimeout(function(){
    $("#footerDiv").removeClass("hide");
  }, 1050);
}

//first animations to load
function LoadAN() {
  TitleAN();
  LoginAN();
  FooterAN();
}

//arrows animations
function closePB() {
  $("#infoHide").addClass("makeTr");
  setTimeout(function(){
    $("#divInfo").removeClass("openBox1");
    $("#divInfo").addClass("closeBox1");
    $("#infoArrow").removeClass("rotateOpen");
    $("#infoArrow").addClass("rotateClose");
    $("#infoHide").addClass("hideDisplay");
  }, 450);
  setTimeout(function(){
    $("#infoHide").removeClass("makeTr");
  }, 950);
}

function openPB() {
  $("#infoArrow").addClass("rotateOpen");
  $("#divInfo").removeClass("closeBox1");
  $("#divInfo").addClass("openBox1");
  setTimeout(function(){
    $("#infoHide").removeClass("hideDisplay");
    $("#infoHide").addClass("makeVs");
    $("#infoArrow").removeClass("rotateClose");
  }, 450);
  setTimeout(function(){
    $("#infoHide").removeClass("makeVs");
  }, 950);
}

function closeRB() {
  $("#rulesHide").addClass("makeTr");
  setTimeout(function(){
    $("#rulesWrapper").removeClass("openBox2");
    $("#rulesWrapper").addClass("closeBox2");
    $("#rulesArrow").removeClass("rotateOpen");
    $("#rulesArrow").addClass("rotateClose");
    $("#rulesHide").addClass("hideDisplay");
  }, 450);
  setTimeout(function(){
    $("#rulesHide").removeClass("makeTr");
  }, 950);
}

function openRB() {
  $("#rulesArrow").addClass("rotateOpen");
  $("#rulesWrapper").removeClass("closeBox2");
  $("#rulesWrapper").addClass("openBox2");
  setTimeout(function(){
    $("#rulesHide").removeClass("hideDisplay");
    $("#rulesHide").addClass("makeVs");
    $("#rulesArrow").removeClass("rotateClose");
  }, 450);
  setTimeout(function(){
    $("#rulesHide").removeClass("makeVs");
  }, 950);
}


function closeLB() {
  $("#leaderboardHide").addClass("makeTr");
  setTimeout(function(){
    $("#divLeaderboard").removeClass("openBox3");
    $("#divLeaderboard").addClass("closeBox3");
    $("#leaderboardArrow").removeClass("rotateOpen");
    $("#leaderboardArrow").addClass("rotateClose");
    $("#leaderboardHide").addClass("hideDisplay");
  }, 450);
  setTimeout(function(){
    $("#leaderboardHide").removeClass("makeTr");
  }, 950);
}

function openLB() {
  $("#leaderboardArrow").addClass("rotateOpen");
  $("#divLeaderboard").removeClass("closeBox3");
  $("#divLeaderboard").addClass("openBox3");
  setTimeout(function(){
    $("#leaderboardHide").removeClass("hideDisplay");
    $("#leaderboardHide").addClass("makeVs");
    $("#leaderboardArrow").removeClass("rotateClose");
  }, 450);
  setTimeout(function(){
    $("#leaderboardHide").removeClass("makeVs");
  }, 950);
}

// hoes mad
/*
$(document).ready(function() {
  $('body').clickBubble({
		color: 'rgba(255, 255, 255, 0.2)',
		size: 40,
		time: 500,
		borderWidth: 3
	});
});
*/
