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
  $("#divAccess").addClass("rotateRight");
  setTimeout(function() {
    $("#divHide").addClass("hide");
    $("#divHide").removeClass("makeTr");
    $("#divAccess").removeClass("rotateRight");
    $("#divAccess").addClass("hideDisplay");
    $("#divHide").removeClass("hide");

    $("#divAccessReg").removeClass("hideDisplay");
    $("#divAccessReg").addClass("rotateLeft");
    $("#divHideReg").addClass("makeVs");
  }, 450);
  setTimeout(function() {
    $("#divHideReg").removeClass("hide");
    $("#divHideReg").removeClass("makeVs");
    $("#divAccessReg").removeClass("rotateLeft");
  }, 950);
});

//switch signin to login
$("body").on("click", "#alreadySigned", function() {
  alert('funzione inattiva');
});
