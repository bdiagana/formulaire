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
    
    ;; concerne l'application elle meme
    [app]  
    port = 3000

    ;; concerne la ged
    [gedportal]
    hostname = localhost 
    port = 80

    ;; compte administrateur de la ged
    [geduser]
    username = user
    password = pass
