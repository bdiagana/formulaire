// imports modules nodejs
const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const express = require('express');
const app = express();

//variable de session dms
var mydms_session = null;

// informations pour la connexion
const hostname = '0.0.0.0'; 
const port = 20083;


app.use(express.urlencoded());
app.get('/signin', (req, res) => send_form('formulaires/form_login.php',res));	
app.get('/signup', (req, res) => send_form('formulaires/form_creation.php',res));	
app.get('/verify', (req, res) => send_form('formulaires/form_code.php',res));
app.get('/postdocs', (req, res) => send_form('formulaires/form_offre.php',res));
app.post('/process', (req, res) => {
	switch(req.body['form']){
		case "signin":
			var user = req.body['user'];
			var pass = req.body['pass'];
			console.log(JSON.stringify(req.body));
			if (mydms_session) http_request('{}',"/logout","POST",disconnect);
			http_request('{"user":"' + user + '","pass":"' + pass + '"}',"/login","POST",connected,res);
		break;
		case "signup":
				
		break;
		case "offre":
			res.statusCode = 200; 
			console.log(JSON.stringify(req.body));
			res.end(JSON.stringify(req.body));
		break;

	}
});
app.use(express.static(__dirname + '/public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// callback détail compte
function account(chunk){
	console.log(chunk);
	mydms_session=null;
	http_request("{}","/logout","GET",disconnect);
}

//callback connection
function connected(chunk,result,res){
	var cookie = res.headers['set-cookie'][0];
	var session = cookie.split(";")[0];
	var mydms_session = session.split("=")[1];
	console.log("admin here : " + mydms_session);
	if (result){
		if (mydms_session != null & mydms_session != "deleted"){
			result.setHeader("set-cookie","mydms_session=" + mydms_session);
			result.statusCode = 302 ;
			result.setHeader("Location","/postdocs");
			result.end("");
		}
		else {
			result.statusCode = 302;
			result.setHeader("Location","/signin");
			result.end("");
		}
	}
}

function disconnect(chunk){
}

// automatise les requetes
// data : json à envoyer
// string_path : chemin de l'API sur lequel requeter
// string_method : méthode à utiliser GET,POST,PUT,DELETE
// cb : fonction de callback
function http_request(data, string_path,string_method,cb,result) {

	// An object of options to indicate where to post to
	var post_options = {
		host: 'localhost',
	        port: '20080',
	      	path: '/restapi/index.php'+string_path,
	      	method: string_method,
	      	headers: {
		  	'Content-Type': 'application/json',
		  	'Content-Length': Buffer.byteLength(data)
	      	}
	};
	// si session mydms : ajout du header cookie dans la requete
	if (mydms_session && mydms_session != ""){
		post_options.headers["Cookie"] = 'mydms_session='+mydms_session;
	}

  	// Set up the request
  	var post_req = http.request(post_options, function(res) {
      		res.setEncoding('utf8');
      		res.on('data', function (chunk) {
			if (cb) {
				if (result) cb(chunk,result,res);
				else cb(chunk);
			}
      		});
  	});

	console.log(data);
  	// post the data
  	post_req.write(data);
  	post_req.end();
}

function send_form(path,res){
  	res.statusCode = 200;
  	res.setHeader('Content-Type', 'text/html');
	var str = fs.readFileSync("formulaires/header.php",'utf-8');
	str += fs.readFileSync(path, 'utf8');
	res.send(str);

}

