$(document).ready(function () {

  $('tablePresta').dataTable();

  $("#errordiv").delay(1000).slideUp();
  $("#successdiv").delay(1000).slideUp();

 /* $("#mailvalidator").hide();
  $("#uservalidator").hide();

  $('#user').keyup(() => {
    if ($('#user').val() != "") check_user();
    else $('#uservalidator').hide();
  });
  $('#user').focusin(() =>{
    if ($('#user').val() != "") check_user();
    else $('#uservalidator').hide();
  });
  $('#user').focusout(() =>{
    if ($('#user').val() != "") check_user();
    else $('#uservalidator').hide();
  });
  $('#user').ready(() =>{
    if ($('#user').val() != "") check_user();
    else $('#uservalidator').hide();
  });

  $('#mail').keyup(() => {
    if ($('#mail').val() != "") check_mail();
    else $('#mailvalidator').hide();
  });
  $('#mail').focusin(() =>{
    if ($('#mail').val() != "") check_mail();
    else $('#mailvalidator').hide();
  });
  $('#mail').focusout(() =>{
    if ($('#mail').val() != "") check_mail();
    else $('#mailvalidator').hide();
  });
  $('#mail').ready(() =>{
    if ($('#mail').val() != "") check_mail();
    else $('#mailvalidator').hide();
  });
*/


  $("input[type='radio']").on('change', function () {
    var selectedValue1 = $("input[id='defaultGroupExample1']:checked").val();
    var selectedValue3 = $("input[id='defaultGroupExample3']:checked").val();

    if(selectedValue1){
      document.getElementById("doc1").hidden = false;
      document.getElementById("doc2").hidden = false;
      document.getElementById("doc3").hidden = true;
      document.getElementById("doc4").hidden = true;
      document.getElementById("radio1").className="btn btn-secondary active btn-sm";
      document.getElementById("radio3").className="btn btn-secondary btn-sm";
    }
     else if (selectedValue3) {
      document.getElementById("doc1").hidden = true;
      document.getElementById("doc2").hidden = true;
      document.getElementById("doc3").hidden = false;
      document.getElementById("doc4").hidden = false;
      document.getElementById("radio1").className="btn btn-secondary btn-sm";
      document.getElementById("radio3").className="btn btn-secondary active btn-sm";
    }
  });
});


function check_mail(){
  var emailRegex = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$');
  var str = $('#mail').val();
  var test = str.match(emailRegex);
  console.log(test);

  if (test === false) {
    $("#mailvalidator").attr('class', "fas fa-times-circle text-danger");
    return;
  }

  $("#mailvalidator").attr('class', "fas fa-spinner text-info loader");
  $.ajax({
    url: "/verify",
    contentType: "application/json",
    method: 'GET',
    data: {
      mail: $("#mail").val()
    }
  })
  .done((data) => {
    $("#mailvalidator").show();
    if(data == "1"){

      $("#mailvalidator").attr('class', "fas fa-times-circle text-danger");
    }else{
      $("#mailvalidator").attr('class', "fas fa-check-circle text-success");
    }

  })
  .fail((info) => {
    console.log( "error" + JSON.stringify(info) );
  });
}

function check_user(){
  $("#uservalidator").attr('class', "fas fa-spinner text-info loader");
  $.ajax({
    url: "/verify",
    contentType: "application/json",
    method: 'GET',
    data: {
      user: $("#user").val()
    }
  })
  .done((data) => {
    $("#uservalidator").show();
    if(data == "1"){
      console.log("x");

      $("#uservalidator").attr('class', "fas fa-times-circle text-danger");
    }else{
      $("#uservalidator").attr('class', "fas fa-check-circle text-success");
    }

  })
  .fail((info) => {
    console.log( "error" + JSON.stringify(info) );
  });
}