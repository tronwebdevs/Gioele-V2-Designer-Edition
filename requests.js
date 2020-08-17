
//REGISTER USER
$("body").on("click", "#signin", function(e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "AddUser.php",
    data: JSON.stringify({
            username: $("#username_reg").val(),
            password: $("#password_reg").val(),
            email: $("#email_reg").val()
          }),
    success: (data) => alert(data.message)
  });
});

//LOGIN USER
$("body").on("click", "#login", function(e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "login.php",
    data:  JSON.stringify({
            email: $("#email").val(),
            password: $("#password").val()
          }),
    success: (data) => sessionStart(data)
  });
});
