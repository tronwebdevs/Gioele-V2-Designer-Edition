$("body").on("click", "#sml", function() {
  let x = $("#divTitle");
  if (x.hasClass("gioele")) {
    x.removeClass("gioele");
    $("#designer").css("color", "#696969");
  } else {
    x.addClass("gioele");
    $("#designer").css("color", "transparent");
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
    $("#divHideReg").removeClass("hide");
    $("#divHideReg").removeClass("makeVs");
    $("#divAccessReg").removeClass("foldOut");
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
  $("#divAccess").removeClass("hideDisplay");
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
