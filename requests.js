
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
