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
            <form class="form-inline" action="/process" method="post" enctype="multipart/form-data" name="form" id="form">
                <div class="control-group">
                    <label class="control-label">Annee:</label>
                    <div class="controls">
                        <select id="languageselector" name="annee">
                            <option value="2019-2020">2019-2020</option>
                            <option value="2020-2021">2020-2021</option>
                        </select>
                    </div>
                </div>
                
                <div class="control-group" id="sumselector">
					<div class="controls-row">
					<label class="radio"><input type="radio" id="defaultGroupExample1" value="1" name="mpRadios">Entre 5K et 25K</label>
					<label class="radio"><input type="radio" id="defaultGroupExample2" value="2" name="mpRadios">Entre 25K et 90K</label>
					<label class="radio"><input type="radio" id="defaultGroupExample3" value="3" name="mpRadios">Plus de 90K</label>
					</div>
                <div class="control-group" id="doc1" hidden="true">
                    <label class="control-label">Devis1:</label>
                    <div class="controls">
                        <input type="file" name="doc1">
                    </div>
                </div>
                <div class="control-group" id="doc2" hidden="true">
                    <label class="control-label">Devis2:</label>
                    <div class="controls">
                        <input type="file" name="doc2">
                    </div>
                </div>
                <div class="control-group" id="doc3" hidden="true">
                    <label class="control-label">Devis3:</label>
                    <div class="controls">
                        <input type="file" name="doc3">
                    </div>
                </div>
                <div class="control-group" id="doc4" hidden="true">
                    <label class="control-label">RIB:</label>
                    <div class="controls">
                        <input type="file" name="doc4">
                    </div>
                </div>
                <div class="control-group" id="doc5" hidden="true">
                    <label class="control-label">PTF:</label>
                    <div class="controls">
                        <input type="file" name="doc5">
                    </div>
                </div>
                <div class="control-group" id="doc6" hidden="true">
                    <label class="control-label">Publication:</label>
                    <div class="controls">
                        <input type="file" name="doc6">
                    </div>
                </div>
				<input type="hidden" name="form" id="login" value="offre">

        </div>
        <div class="controls">
            <button type="submit" class="btn">Valider</button>
        </div>
        </form>
    </div>
</div>
</div>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
<script type="text/javascript">
    $(document).ready(function () {
        $("input[type='radio']").on('change', function () {
            var value1 = $("input[id='defaultGroupExample1']:checked").val();
            var selectedValue = $("input[id='defaultGroupExample2']:checked").val();
            var selectedValue2 = $("input[id='defaultGroupExample3']:checked").val();

            if (value1) {
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
            }
        });
    });
</script>
</body>
</html>
