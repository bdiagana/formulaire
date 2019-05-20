<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Offre</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!--===============================================================================================-->	
        <link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="fonts/Linearicons-Free-v1.0.0/icon-font.min.css">
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
        <!--===============================================================================================-->	
        <link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
        <!--===============================================================================================-->	
        <link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css">
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="css/util.css">
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <!--===============================================================================================-->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <!--===============================================================================================-->

    </head>
    <body>

        <div class="limiter">
            <div class="container-login100">
                <div class="wrap-login100 p-b-160 p-t-50">
                    <form class="login100-form validate-form" action="test.php" method="post">
                        <span class="login100-form-title p-b-43">
                            Reponse appel d'offre
                        </span>
                        <div class="container">
                            <div class="row">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="inputGroupSelect01" style="background-color: #007bff;border-color: #007bff;color:white; ">Année concerné</label>
                                    </div>
                                    <select class="custom-select" id="inputGroupSelect01" name="annee">
                                        <option selected value="2019-2020">2019-2020</option>
                                        <option value="2020-2021">2020-2021</option>
                                    </select>
                                </div>
                            </div>
                            <!-- Fichiers -->
                            <div class="row">
                                <div class="input-group validate-input" data-validate = "Vous devez joindre un document" >
                                    <span class="input-group-btn">
                                        <span class="btn btn-primary" onclick="$(this).parent().find('input[type=file]').click();">Document</span>
                                        <input name="uploaded_file_doc" onchange="$(this).parent().parent().find('.form-control').html($(this).val().split(/[\\|/]/).pop());" style="display: none;" type="file">
                                    </span>
                                    <span class="form-control">Veuillez joindre un docuemnt</span>
                                </div>
                            </div>
                            <!-- Radio button -->
                            <div class="row">
                                <div class="input-group" id="montant" > 
                                    <!-- Radios - < 25 K -->
                                    <div class="custom-control custom-radio">
                                        <input type="radio" class="custom-control-input" value="1" id="defaultGroupExample1" name="mpRadios" >
                                        <label class="custom-control-label" for="defaultGroupExample1" style="color: white;"> < 25 K </label>
                                    </div>

                                    <!-- Radios - 25K < X < 90K -->
                                    <div class="custom-control custom-radio">
                                        <input type="radio" class="custom-control-input" value="2" id="defaultGroupExample2" name="mpRadios">
                                        <label class="custom-control-label" for="defaultGroupExample2"  style="color: white;"> 25K < X < 90K </label>
                                    </div>

                                    <!-- Radios - >90K -->
                                    <div class="custom-control custom-radio">
                                        <input type="radio" class="custom-control-input" value="3" id="defaultGroupExample3" name="mpRadios">
                                        <label class="custom-control-label" for="defaultGroupExample3" style="color: white;"> >90K </label>
                                    </div>
                                </div>
                            </div>
                            <!-- Devis -->
                            <div class="row">

                                <div class="input-group" id="devis" hidden="true">
                                    <span class="input-group-btn">
                                        <span class="btn btn-primary" onclick="$(this).parent().find('input[type=file]').click();">Devis</span>
                                        <input name="uploaded_file_devis" onchange="$(this).parent().parent().find('.form-control').html($(this).val().split(/[\\|/]/).pop());" style="display: none;" type="file">
                                    </span>
                                    <span class="form-control">Veuillez joindre un docuemnt</span>

                                </div>

                            </div>
                            <!-- Documents 1 -->
                            <div class="row">

                                <div class="input-group" id="doc1" hidden="true">
                                    <span class="input-group-btn">
                                        <span class="btn btn-primary" onclick="$(this).parent().find('input[type=file]').click();">Documents</span>
                                        <input name="uploaded_file_doc1" onchange="$(this).parent().parent().find('.form-control').html($(this).val().split(/[\\|/]/).pop());" style="display: none;" type="file">
                                    </span>
                                    <span class="form-control">Veuillez joindre un document</span>
                                </div>
                            </div>
                            <!-- Documents 2 -->
                            <div class="row">

                                <div class="input-group" id="doc2" hidden="true">
                                    <span class="input-group-btn">
                                        <span class="btn btn-primary" onclick="$(this).parent().find('input[type=file]').click();">Documents</span>
                                        <input name="uploaded_file_doc2" onchange="$(this).parent().parent().find('.form-control').html($(this).val().split(/[\\|/]/).pop());" style="display: none;" type="file">
                                    </span>
                                    <span class="form-control">Veuillez joindre un document</span>

                                </div>
                            </div>
                        </div>     


                        <div class="container-login100-form-btn">
                            <button class="login100-form-btn" type="submit">
                                Répondre
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!--===============================================================================================-->

        <!--===============================================================================================-->
        <script src="vendor/jquery/jquery-3.2.1.min.js"></script>
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
                                                        document.getElementById("doc1").hidden = true;
                                                        document.getElementById("doc2").hidden = true;
                                                    }
                                                });
                                            });
        </script>
        <!--===============================================================================================-->
        <script>
            $('#password, #conf_password').on('keyup', function () {
                if ($('#password').val() == $('#conf_password').val()) {
                    $('#message').html('Identique').css('color', 'green');
                } else
                    $('#message').html('Non Identique').css('color', 'red');
            });
        </script>
        <!--===============================================================================================-->
        <script src="vendor/animsition/js/animsition.min.js"></script>
        <!--===============================================================================================-->
        <script src="vendor/bootstrap/js/popper.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
        <!--===============================================================================================-->
        <script src="vendor/select2/select2.min.js"></script>
        <!--===============================================================================================-->
        <script src="vendor/daterangepicker/moment.min.js"></script>
        <script src="vendor/daterangepicker/daterangepicker.js"></script>
        <!--===============================================================================================-->
        <script src="vendor/countdowntime/countdowntime.js"></script>
        <!--===============================================================================================-->
        <script src="js/main.js"></script>
        <!--===============================================================================================-->
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

    </body>
</html>