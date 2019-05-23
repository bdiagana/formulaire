$(document).ready(function () {
        $("input[type='radio']").on('change', function () {
            var value1 = $("input[id='defaultGroupExample1']:checked").val();
            var selectedValue = $("input[id='defaultGroupExample2']:checked").val();
            var selectedValue2 = $("input[id='defaultGroupExample3']:checked").val();
            if(value1){
                document.getElementById("doc1").hidden = false;
                document.getElementById("doc2").hidden = false;
                document.getElementById("doc3").hidden = false;
                document.getElementById("doc4").hidden = false;
                document.getElementById("doc5").hidden = true;
                document.getElementById("doc6").hidden = true;
            }
            if (selectedValue) {
                document.getElementById("doc1").hidden = false;
                document.getElementById("doc2").hidden = false;
                document.getElementById("doc3").hidden = false;
                document.getElementById("doc4").hidden = false;
                document.getElementById("doc5").hidden = true;
                document.getElementById("doc6").hidden = true;
            } else if (selectedValue2) {
                document.getElementById("doc1").hidden = true;
                document.getElementById("doc2").hidden = true;
                document.getElementById("doc3").hidden = true;
                document.getElementById("doc4").hidden = true;
                document.getElementById("doc5").hidden = false;
                document.getElementById("doc6").hidden = false;
            } else {
                document.getElementById("doc1").hidden = true;
                document.getElementById("doc2").hidden = true;
                document.getElementById("doc3").hidden = true;
                document.getElementById("doc4").hidden = true;
                document.getElementById("doc5").hidden = false;
                document.getElementById("doc6").hidden = false;
            }
        });
    });
