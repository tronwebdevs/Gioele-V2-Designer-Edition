
//REGISTER USER
$("body").on("click", "#signin", function() {
  alert('niga');
  $.ajax({
    type: "POST",
    url: "AddUser.php",
    data: "{ \"username\":\"" + $("#username_reg").val() + "\", " +
          "\"password\":\"" + $("#password_reg").val() + "\", " +
          "\"email\":\"" + $("#email_reg").val() + "\" }",
    success: function(data) {
      alert(data.message);
    },
  });
});

//LOGIN USER
$("body").on("click", "#login", function() {
  alert('niggatoni');
  $.ajax({
    type: "POST",
    url: "login.php",
    data: "{ \"email\":\"" + $("#email").val() + "\", " +
          "\"password\":\"" + $("#password").val() +  "\"}",
    success: function(data) {
      sessionStart(data);
    },
  });
});
