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
$("body").on("click", "#alreadySigned", function() {
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
});


//shows actual game
function sessionAnimation() {
  $("#divAccess").addClass("hideDisplay");
  $("#divAccessReg").addClass("hideDisplay");

  $("#divSession").removeClass("hideDisplay");
}
