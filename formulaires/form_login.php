<div class="container-fluid"> 
  <div class="row-fluid">
    <legend>Connexion</legend> 
    <form action="/process" method="post" novalidate="novalidate">
      <input type="hidden" name="form" value="signin">
      <div class="form-group col-md-3">
        <label for="exampleInputEmail1">Identifiant :</label>
        <input type="text" class="form-control" name="user" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Entrez votre identifiant">
      </div>
      <div class="form-group col-md-3">
        <label for="exampleInputPassword1">Mot de passe :</label>
        <input type="password" name="pass" class="form-control" id="exampleInputPassword1" placeholder="Entrez votre mot de passe">
      </div>
      <div class="form-check form-group">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Se rappeler de moi</label>
      </div>
      <button type="submit" class="btn btn-primary">Connexion</button>
    </form>
  </div>
</div>
</body> 
</html>
