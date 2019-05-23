// imports modules nodejs
const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const express = require('express');
const app = express();
const conf = require('./load_conf');


//variable de session dms
var mydms_session;
var mydms_cookie;

app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs')

app.get('/signin', (req, res) => res.render('form_login'));
app.get('/signup', (req, res) => res.render('form_creation'));
app.get('/verify', (req, res) => res.render('form_code'));
app.get('/postdocs', (req, res) => res.render('form_offre'));

app.post('/process', (req, res) => {
	console.log(req.body)
	switch(req.body['form']){
		case "signin":
			var user = req.body['user'];
			var pass = req.body['pass'];
			//if (mydms_session) http_request('{}',"/logout","POST",disconnect);
			http_request('{"user":"' + user + '","pass":"' + pass + '"}',"/login","POST",connected,res);
		break;
		case "signup":
			console.log(req.body)
				res.render('form_code',{ mail : req.body['mail'] })
		break;
		case "offre":
			res.statusCode = 200;
			console.log(JSON.stringify(req.body));
			res.end(JSON.stringify(req.body));
		break;

	}
});

app.listen(conf.app.port, () => console.log(`Example app listening on port ${conf.app.port}!`));

// callback détail compte
function account(chunk){
	console.log(chunk);
	mydms_session=null;
	http_request("{}","/logout","GET",disconnect);
}

//callback connection
function connected(chunk,result,res){
	if (res.headers){
		var cookie = res.headers['set-cookie'];
		if (result){
			if (cookie){
				result.setHeader("set-cookie",cookie);
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
	else {
		result.statusCode = 302;
		result.setHeader("Location","/signin");
		result.end("");
	}
}

function disconnect(chunk){
}

// automatise les requetes
// data : json à envoyer
// string_path : chemin de l'API sur lequel requeter
// string_method : méthode à utiliser GET,POST,PUT,DELETE
// cb : fonction de callback
// response_handle : handle de reponse pour l'utilisateur
function http_request(data, string_path,string_method,cb,response_handle) {

	// An object of options to indicate where to post to
	var post_options = {
		host: conf.gedportal.hostname,
	        port: conf.gedportal.port,
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
				if (response_handle) cb(chunk,response_handle,res);
				else cb(chunk);
			}
			else {
				console.log('request without callback')
			}
      		});
  	});

  	// post the data
  	post_req.write(data);
  	post_req.end();
}
