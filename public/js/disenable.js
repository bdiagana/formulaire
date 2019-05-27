$(document).ready(function () {

  $("#errordiv").delay(1000).slideUp();

  $("input[type='radio']").on('change', function () {
    var selectedValue1 = $("input[id='defaultGroupExample1']:checked").val();
    var selectedValue2 = $("input[id='defaultGroupExample2']:checked").val();
    var selectedValue3 = $("input[id='defaultGroupExample3']:checked").val();
    var selectedValue4 = $("input[id='defaultGroupExample4']:checked").val();

    if(selectedValue1){
      document.getElementById("doc1").hidden = false;
      document.getElementById("doc2").hidden = false;
      document.getElementById("doc3").hidden = false;
      document.getElementById("doc4").hidden = false;
      document.getElementById("doc5").hidden = true;
      document.getElementById("doc6").hidden = true;
      document.getElementById("radio1").className="btn btn-secondary active btn-sm";
      document.getElementById("radio2").className="btn btn-secondary  btn-sm";
      document.getElementById("radio3").className="btn btn-secondary btn-sm";
      document.getElementById("radio4").className="btn btn-secondary btn-sm";
    }
    if (selectedValue2) {
      document.getElementById("doc1").hidden = false;
      document.getElementById("doc2").hidden = false;
      document.getElementById("doc3").hidden = false;
      document.getElementById("doc4").hidden = false;
      document.getElementById("doc5").hidden = true;
      document.getElementById("doc6").hidden = true;
      document.getElementById("radio1").className="btn btn-secondary btn-sm";
      document.getElementById("radio2").className="btn btn-secondary active btn-sm";
      document.getElementById("radio3").className="btn btn-secondary btn-sm";
      document.getElementById("radio4").className="btn btn-secondary btn-sm";
    } else if (selectedValue3) {
      document.getElementById("doc1").hidden = true;
      document.getElementById("doc2").hidden = true;
      document.getElementById("doc3").hidden = true;
      document.getElementById("doc4").hidden = true;
      document.getElementById("doc5").hidden = false;
      document.getElementById("doc6").hidden = false;
      document.getElementById("radio1").className="btn btn-secondary btn-sm";
      document.getElementById("radio2").className="btn btn-secondary  btn-sm";
      document.getElementById("radio3").className="btn btn-secondary active btn-sm";
      document.getElementById("radio4").className="btn btn-secondary btn-sm";
    } else if (selectedValue4) {
      document.getElementById("doc1").hidden = true;
      document.getElementById("doc2").hidden = true;
      document.getElementById("doc3").hidden = true;
      document.getElementById("doc4").hidden = true;
      document.getElementById("doc5").hidden = false;
      document.getElementById("doc6").hidden = false;
      document.getElementById("radio1").className="btn btn-secondary btn-sm";
      document.getElementById("radio2").className="btn btn-secondary  btn-sm";
      document.getElementById("radio3").className="btn btn-secondary  btn-sm";
      document.getElementById("radio4").className="btn btn-secondary active btn-sm";
    }
  });
});
