<<<<<<< HEAD
var num_doc = 13;
$(document).ready(function () {

  $("#errordiv").delay(1000).slideUp();
  $("#successdiv").delay(1000).slideUp();

  //  $('#plus-sign').click(addDocument());

  $("#mailvalidator").hide();
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



  $("input[type='radio']").on('change', function () {
    var selectedValue1 = $("input[id='defaultGroupExample1']:checked").val();
    var selectedValue2 = $("input[id='defaultGroupExample2']:checked").val();
    var selectedValue3 = $("input[id='defaultGroupExample3']:checked").val();
    var selectedValue4 = $("input[id='defaultGroupExample4']:checked").val();

    document.getElementById("adddoc").hidden = false;

    if(selectedValue1){
      document.getElementById("doc1").hidden = false;
      document.getElementById("doc2").hidden = false;
      document.getElementById("doc3").hidden = true;
      document.getElementById("doc4").hidden = true;
      document.getElementById("doc5").hidden = true;
      document.getElementById("doc6").hidden = true;
      document.getElementById("doc7").hidden = true;
      document.getElementById("doc8").hidden = true;
      document.getElementById("doc9").hidden = true;
      document.getElementById("doc10").hidden = true;
      document.getElementById("doc11").hidden = true;
      document.getElementById("doc12").hidden = true;
      document.getElementById("radio1").className="btn btn-secondary active btn-sm";
      document.getElementById("radio2").className="btn btn-secondary  btn-sm";
      document.getElementById("radio3").className="btn btn-secondary btn-sm";
      document.getElementById("radio4").className="btn btn-secondary btn-sm";
    }
    if (selectedValue2) {
      document.getElementById("doc1").hidden = false;
      document.getElementById("doc2").hidden = false;
      document.getElementById("doc3").hidden = true;
      document.getElementById("doc4").hidden = true;
      document.getElementById("doc5").hidden = true;
      document.getElementById("doc6").hidden = true;
      document.getElementById("doc7").hidden = true;
      document.getElementById("doc8").hidden = true;
      document.getElementById("doc9").hidden = true;
      document.getElementById("doc10").hidden = true;
      document.getElementById("doc11").hidden = true;
      document.getElementById("doc12").hidden = true;
      document.getElementById("radio1").className="btn btn-secondary btn-sm";
      document.getElementById("radio2").className="btn btn-secondary active btn-sm";
      document.getElementById("radio3").className="btn btn-secondary btn-sm";
      document.getElementById("radio4").className="btn btn-secondary btn-sm";
    } else if (selectedValue3) {
      document.getElementById("doc1").hidden = true;
      document.getElementById("doc2").hidden = true;
      document.getElementById("doc3").hidden = false;
      document.getElementById("doc4").hidden = false;
      document.getElementById("doc5").hidden = false;
      document.getElementById("doc6").hidden = false;
      document.getElementById("doc7").hidden = false;
      document.getElementById("doc8").hidden = false;
      document.getElementById("doc9").hidden = false;
      document.getElementById("doc10").hidden = false;
      document.getElementById("doc11").hidden = false;
      document.getElementById("doc12").hidden = false;
      document.getElementById("radio1").className="btn btn-secondary btn-sm";
      document.getElementById("radio2").className="btn btn-secondary  btn-sm";
      document.getElementById("radio3").className="btn btn-secondary active btn-sm";
      document.getElementById("radio4").className="btn btn-secondary btn-sm";
    } else if (selectedValue4) {
      document.getElementById("doc1").hidden = true;
      document.getElementById("doc2").hidden = true;
      document.getElementById("doc3").hidden = false;
      document.getElementById("doc4").hidden = false;
      document.getElementById("doc5").hidden = false;
      document.getElementById("doc6").hidden = false;
      document.getElementById("doc7").hidden = false;
      document.getElementById("doc8").hidden = false;
      document.getElementById("doc9").hidden = false;
      document.getElementById("doc10").hidden = false;
      document.getElementById("doc11").hidden = false;
      document.getElementById("doc12").hidden = false;
      document.getElementById("radio1").className="btn btn-secondary btn-sm";
      document.getElementById("radio2").className="btn btn-secondary  btn-sm";
      document.getElementById("radio3").className="btn btn-secondary  btn-sm";
      document.getElementById("radio4").className="btn btn-secondary active btn-sm";
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

function addDocument(){
  if (num_doc > 17) {
    return;
  }
  var div_doc = `<div class="form-group control-group col-md-5">
  <div class="custom-file">
  <input type="file" name="docs" class="custom-file-input" id="inputGroupFile${num_doc}" lang="fr">
  <label class="custom-file-label" for="inputGroupFile${num_doc}" aria-describedby="inputGroupFileAddon${num_doc}">Autre document </label>
  </div>`;

  $('#moredocs').append(div_doc);
  num_doc ++;
  if (num_doc > 17) {
    $("#plus-sign").attr('class', "fas fa-ban text-danger fa-lg");
    $("#adddoc").attr('title', "Nombre maximum de documents atteint");
    return;
  }
}
=======
var num_doc = 13;
$(document).ready(function () {

  $("#errordiv").delay(1000).slideUp();
  $("#successdiv").delay(1000).slideUp();

  //  $('#plus-sign').click(addDocument());

  $("#mailvalidator").hide();
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



  $("input[type='radio']").on('change', function () {
    var selectedValue1 = $("input[id='defaultGroupExample1']:checked").val();
    var selectedValue2 = $("input[id='defaultGroupExample2']:checked").val();
    var selectedValue3 = $("input[id='defaultGroupExample3']:checked").val();
    var selectedValue4 = $("input[id='defaultGroupExample4']:checked").val();

    document.getElementById("adddoc").hidden = false;

    if(selectedValue1){
      document.getElementById("doc1").hidden = false;
      document.getElementById("doc2").hidden = false;
      document.getElementById("doc3").hidden = true;
      document.getElementById("doc4").hidden = true;
      document.getElementById("doc5").hidden = true;
      document.getElementById("doc6").hidden = true;
      document.getElementById("doc7").hidden = true;
      document.getElementById("doc8").hidden = true;
      document.getElementById("doc9").hidden = true;
      document.getElementById("doc10").hidden = true;
      document.getElementById("doc11").hidden = true;
      document.getElementById("doc12").hidden = true;
      document.getElementById("radio1").className="btn btn-secondary active btn-sm";
      document.getElementById("radio2").className="btn btn-secondary  btn-sm";
      document.getElementById("radio3").className="btn btn-secondary btn-sm";
      document.getElementById("radio4").className="btn btn-secondary btn-sm";
    }
    if (selectedValue2) {
      document.getElementById("doc1").hidden = false;
      document.getElementById("doc2").hidden = false;
      document.getElementById("doc3").hidden = true;
      document.getElementById("doc4").hidden = true;
      document.getElementById("doc5").hidden = true;
      document.getElementById("doc6").hidden = true;
      document.getElementById("doc7").hidden = true;
      document.getElementById("doc8").hidden = true;
      document.getElementById("doc9").hidden = true;
      document.getElementById("doc10").hidden = true;
      document.getElementById("doc11").hidden = true;
      document.getElementById("doc12").hidden = true;
      document.getElementById("radio1").className="btn btn-secondary btn-sm";
      document.getElementById("radio2").className="btn btn-secondary active btn-sm";
      document.getElementById("radio3").className="btn btn-secondary btn-sm";
      document.getElementById("radio4").className="btn btn-secondary btn-sm";
    } else if (selectedValue3) {
      document.getElementById("doc1").hidden = true;
      document.getElementById("doc2").hidden = true;
      document.getElementById("doc3").hidden = false;
      document.getElementById("doc4").hidden = false;
      document.getElementById("doc5").hidden = false;
      document.getElementById("doc6").hidden = false;
      document.getElementById("doc7").hidden = false;
      document.getElementById("doc8").hidden = false;
      document.getElementById("doc9").hidden = false;
      document.getElementById("doc10").hidden = false;
      document.getElementById("doc11").hidden = false;
      document.getElementById("doc12").hidden = false;
      document.getElementById("radio1").className="btn btn-secondary btn-sm";
      document.getElementById("radio2").className="btn btn-secondary  btn-sm";
      document.getElementById("radio3").className="btn btn-secondary active btn-sm";
      document.getElementById("radio4").className="btn btn-secondary btn-sm";
    } else if (selectedValue4) {
      document.getElementById("doc1").hidden = true;
      document.getElementById("doc2").hidden = true;
      document.getElementById("doc3").hidden = false;
      document.getElementById("doc4").hidden = false;
      document.getElementById("doc5").hidden = false;
      document.getElementById("doc6").hidden = false;
      document.getElementById("doc7").hidden = false;
      document.getElementById("doc8").hidden = false;
      document.getElementById("doc9").hidden = false;
      document.getElementById("doc10").hidden = false;
      document.getElementById("doc11").hidden = false;
      document.getElementById("doc12").hidden = false;
      document.getElementById("radio1").className="btn btn-secondary btn-sm";
      document.getElementById("radio2").className="btn btn-secondary  btn-sm";
      document.getElementById("radio3").className="btn btn-secondary  btn-sm";
      document.getElementById("radio4").className="btn btn-secondary active btn-sm";
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

function addDocument(){
  if (num_doc > 17) {
    return;
  }
  var div_doc = `<div class="form-group control-group col-md-5">
  <div class="custom-file">
  <input type="file" name="docs" class="custom-file-input" id="inputGroupFile${num_doc}" lang="fr">
  <label class="custom-file-label" for="inputGroupFile${num_doc}" aria-describedby="inputGroupFileAddon${num_doc}">Autre document </label>
  </div>`;

  $('#moredocs').append(div_doc);
  num_doc ++;
  if (num_doc > 17) {
    $("#plus-sign").attr('class', "fas fa-ban text-danger fa-lg");
    $("#adddoc").attr('title', "Nombre maximum de documents atteint");
    return;
  }
}
>>>>>>> 8efcc8186ff46c0e36357531ed4b1d4873476cca
