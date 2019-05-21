<body class="login">
<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container-fluid">
            <a class="brand" href="form_offre.php">GEDi</a>
        </div>
    </div>
</div>
<div class="container-fluid">
    <div class="row-fluid">
        <legend>Offre d'appel</legend>
        <div class="well">
            <form class="form-horizontal" action="/process" method="post" enctype="multipart/form-data" name="form" id="form">
                <div class="control-group">
                    <label class="control-label">Annee:</label>
                    <div class="controls">
                        <select id="languageselector" name="annee">
                            <option value="2019-2020">2019-2020</option>
                            <option value="2020-2021">2020-2021</option>
                        </select>
                    </div>
		</div>
                <div class="control-group" id="doc1" hidden="true">
                    <label class="control-label">Document1:</label>
                    <div class="controls">
                        <input type="file"  name="doc1">
		            </div>
		        </div>
                <div class="control-group" id="doc2" hidden="true">
                    <label class="control-label">Document2:</label>
                    <div class="controls">
                        <input type="file"  name="doc2">
                    </div>
                </div>
                <div class="control-group" id="devis" hidden="true">
                    <label class="control-label">Devis:</label>
                    <div class="controls">
                        <input type="file"  name="devis">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">25K</label>
                    <div class="controls">
                         <input type="radio" class="custom-control-input" id="defaultGroupExample1" value="1" name="mpRadios" >
                    </div>
                    <label class="control-label">25K < X < 90K</label>
                    <div class="controls">
                        <input type="radio" class="custom-control-input" id="defaultGroupExample2" value="2" name="mpRadios" >
                    </div>
                    <label class="control-label">> 90K</label>
                    <div class="controls">
                        <input type="radio" class="custom-control-input" id="defaultGroupExample3" value="3" name="mpRadios" >
                    </div>
                </div>
                <input type="hidden"  name="form" id="login" value="offre" >

        </div>
        <div class="controls">
            <button type="submit" class="btn">OK</button>
        </div>
        </form>
    </div>
</div>
</div>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $("input[type='radio']").on('change', function () {
            var selectedValue = $("input[id='defaultGroupExample2']:checked").val();
            var selectedValue2 = $("input[id='defaultGroupExample3']:checked").val();
            if (selectedValue) {
                document.getElementById("doc1").hidden = true;
                document.getElementById("doc2").hidden = true;
                document.getElementById("devis").hidden = false;
            } else if (selectedValue2) {
                document.getElementById("doc1").hidden = false;
                document.getElementById("doc2").hidden = false;
                document.getElementById("devis").hidden = true;
            } else {
                document.getElementById("devis").hidden = true;
                document.getElementById("doc1").hidden = false;
                document.getElementById("doc2").hidden = true;
            }
        });
    });
</script>
</body>
</html>
