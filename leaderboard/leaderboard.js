let c = 1;

function showTable(data){
  if (data.quantity == 0) {
    return;
  }
  for (let i = 0; i < data.quantity; i++) {
    $("#leaderboardTable").append("<tr id=\"tr" + i + "\">");
    $("#tr"+i).append("<th class=\"cell1\"> #" + (i+1+((c-1)*50)) +"</th");
    $("#tr"+i).append("<th class=\"cell1\">" + data.leaderboard[i]["score"] +"</th");
    $("#tr"+i).append("<th class=\"cell2\">" + data.leaderboard[i]["username"] +"</th");
    $("#tr"+i).append("</tr>");
  }
}

function getTable() {
  $("#exception").addClass("hide");

  $.ajax({
    type: "POST",
    url: "GetTable.php",
    data:  JSON.stringify({
            counter: c
          }),
    success: function(data) {
      if (data.code == 1) {
        showTable(data);
      }
      if (data.code == -1) {
        $("#exception").removeClass("hide");
        $("#exception").text(data.message);
      }
    }
  });
}




function showPage(data, messMax) {
  if (data.quantity == 0) {
    if (c > 1) c--;
    $("#exception").removeClass("hide");
    $("#exception").text(messMax);
  } else {
    //change table
    for (let i = 0; i < 50; i++) {
      $("#tr" + i).remove();
    }
    showTable(data);
  }
  $("#counter").attr("placeholder", c);
  $("#counter").val(c);
  return;
}





function changePage(n) {
  $("#exception").addClass("hide");
  c += n;
  //controls
  if (parseInt(n) != 1 && parseInt(n) != -1) {
    $("#exception").removeClass("hide");
    $("#exception").text("Errore nel caricamento");
    c = 1;
  }
  if (c <= 0) {
    c = 1;
    return;
  }
  //request (differs from getTable)
  $.ajax({
    type: "POST",
    url: "GetTable.php",
    data:  JSON.stringify({
            counter: c
          }),
    success: function(data) {
      if (data.code == 1) {
        showPage(data, "Non ci sono altre pagine");
      }
      if (data.code == -1) {
        $("#exception").removeClass("hide");
        $("#exception").text(data.message);
      }
    }
  });
}




//change Page to user's input
$(document).on("keypress", "input", function(e){
  $("#exception").addClass("hide");
  if(e.which != 13){
    return;
  }
  let p = $("#counter").val();

  //controls
  if (Number.isInteger(p)) {
    $("#exception").removeClass("hide");
    $("#exception").text("Devi inserire un numero");
    $("#counter").val(c);
    return;
  }
  if (p <= 0) {
    $("#exception").removeClass("hide");
    $("#counter").val(1);
  }
  //request
  $.ajax({
    type: "POST",
    url: "GetTable.php",
    data:  JSON.stringify({
            counter: p
          }),
    success: function(data) {
      if (data.code == 1) {
        showPage(data, "Hai superato il numero di pagine");
      }
      if (data.code == -1) {
        $("#exception").removeClass("hide");
        $("#exception").text(data.message);
      }
    }
  });
});

//refresh table
function refreshLeaderboard() {
  $("#tableWrapper").addClass("makeTr");
  $("#refreshLeaderboard").addClass("fa-spin");
  setTimeout(function(){
    $("#tableWrapper").removeClass("makeTr");
    $("#tableWrapper").addClass("makeVs");
  }, 450);
  setTimeout(function(){
    $("#tableWrapper").removeClass("makeVs");
    $("#refreshLeaderboard").removeClass("fa-spin");
  }, 1000);

  //empties leaderboard
  setTimeout(function(){
    for (let i = 0; i < 50; i++) {
      $("#tr" + i).remove();
    }
    getTable();
  }, 200);
}

//footer animation
function FooterAN() {
  setTimeout(function(){
    $("#footerDiv").removeClass("hide");
  }, 2050);
}
