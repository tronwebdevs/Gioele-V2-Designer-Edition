//gets cookie and returns object
function getCookie(name) {
  let cookie = decodeURIComponent(document.cookie);
  let cArray = cookie.split(';');
  for (let i = 0; i <cArray.length; i++) {
    let c = cArray[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return true;
    }
  }
}

//checks if session cookie exists, if it does then auto logs in user sending request to server
function checkLogin() {
  if (getCookie("GioeleSession")) autoLogin();
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

//logout from session
$("body").on("click", "#logout", function () {
  logoutAN();
  document.cookie = "GioeleSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
});
