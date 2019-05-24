$(document).ready(function () {
  $("input[type='radio']").on('change', function () {
    var selectedValue1 = $("input[id='defaultGroupExample1']:checked").val();
    var selectedValue2 = $("input[id='defaultGroupExample2']:checked").val();
    var selectedValue3 = $("input[id='defaultGroupExample3']:checked").val();
    var selectedValue4 = $("input[id='defaultGroupExample4']:checked").val();
    console.log(selectedValue4);
    if(selectedValue1){
      document.getElementById("doc1").hidden = false;
      document.getElementById("doc2").hidden = false;
      document.getElementById("doc3").hidden = false;
      document.getElementById("doc4").hidden = false;
      document.getElementById("doc5").hidden = true;
      document.getElementById("doc6").hidden = true;
    }
    if (selectedValue2) {
      document.getElementById("doc1").hidden = false;
      document.getElementById("doc2").hidden = false;
      document.getElementById("doc3").hidden = false;
      document.getElementById("doc4").hidden = false;
      document.getElementById("doc5").hidden = true;
      document.getElementById("doc6").hidden = true;
    } else if (selectedValue3) {
      document.getElementById("doc1").hidden = true;
      document.getElementById("doc2").hidden = true;
      document.getElementById("doc3").hidden = true;
      document.getElementById("doc4").hidden = true;
      document.getElementById("doc5").hidden = false;
      document.getElementById("doc6").hidden = false;
    } else if (selectedValue4) {
      document.getElementById("doc1").hidden = true;
      document.getElementById("doc2").hidden = true;
      document.getElementById("doc3").hidden = true;
      document.getElementById("doc4").hidden = true;
      document.getElementById("doc5").hidden = false;
      document.getElementById("doc6").hidden = false;
    }
  });
});

function change_state(btn){
  console.log("test");
  if(btn.checked)btn.setAttribute("class", "active");
  else btn.removeAttribute("class");
}
