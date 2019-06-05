# api-gedi

**installation nodejs et npm**

    apt-get install nodejs npm
    
**clone du dépot et installation des dépendances npm**
    
    cd
    git clone https://github.com/bdiagana/formulaire.git node-app
    cd node app
    npm install

**démarrage du serveur**

    npm run start

Pas besoin de le relancer à chaque modification (utilisation de nodemon)

**fichier de configuration de l'application**

dans conf/node-app.conf

    ; fichier de configuration de l'application
    [app]
    port = 3000

    ; informations relatives au portail SeedDMS
    [gedportal]
    hostname = localhost
    port = 80

    ; identifiants administrateur de SeedDMS
    [geduser]
    username = user
    password = pass

    ; compte mail à utiliser pour envoyer les codes de vérification
    [mail]
    user = adresse@mail.com
    pass = password

    ; informations pour la connexion à la base de donnée MySQL de SeedDMS
    [mysql]
    hostname = localhost
    port = 3306
    db = database
    user = user
    pass = pass
