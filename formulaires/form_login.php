	<body class="login">
		<div class="navbar navbar-inverse navbar-fixed-top">
			<div class="navbar-inner"> 
				<div class="container-fluid">
					<a class="brand" href="http://212.73.217.202:20080">GEDi</a>
                		</div> 
			</div> 
		</div> 
		<div class="container-fluid"> 
			<div class="row-fluid">
                		<legend>Connexion</legend> 
				<div class="well"> 
					<form class="form-horizontal" action="/process" method="post" name="signin_form" id="form" novalidate="novalidate">
                        			<input type="hidden" name="form" value="signin">
						<div class="control-group">
							<label class="control-label">Identifiant:</label> 
							<div class="controls">
								<input type="text" id="login" name="user" placeholder="Entrez votre identifiant" autocomplete="off" required="" aria-required="true">
							</div>
						</div>
						<div class="control-group"> 
							<label class="control-label">Mot de passe:</label> 
                            				<div class="controls">
								<input type="password" id="pwd" name="pass" placeholder="Entrez votre mot de passe" autocomplete="off" required="" aria-required="true">
							</div>
                        			</div> 
						<div class="controls"> 
							<button type="submit" class="btn">Connexion</button>
                        			</div> 
					</form> 
				</div> 
			</div>
		</div>
	</body> 
</html>
