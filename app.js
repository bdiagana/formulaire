// imports modules nodejs
const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const express = require('express');
const app = express();
const conf = require('./load_conf');
const _ = require('lodash');


//variable de session dms
var mydms_session;
var mydms_cookie;
var admin_session;

// middleware
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

// paramétrage moteur de template
app.set('view engine', 'ejs')

// get routes
app.get('/signin', (req, res) => res.render('form_login'));
app.get('/signup', (req, res) => res.render('form_creation'));
app.get('/postdocs', (req, res) => res.render('form_offre'));

// post routes
app.post('/process', (req, res) => {
	console.log(req.body)
	switch(req.body['form']){
		case "signin":

		http_request('{"user":"' + req.body.user + '","pass":"' + req.body.pass + '"}',"/login","POST",user_connected,req,res);

		break;
		case "signup":

		//connection administrateur
		http_request('{"user":"' + conf.geduser.username + '","pass":"' + conf.geduser.password + '"}',"/login","POST",admin_connection,req,res);

		break;
		case "offre":
		res.statusCode = 200;
		console.log(JSON.stringify(req.body));
		res.end(JSON.stringify(req.body));
		break;
		case 'verify':
		res.render('form_offre');
		break;

	}
});

// démarrage du serveur
app.listen(conf.app.port, () => console.log(`Example app listening on port ${conf.app.port}!`));

// callback détail compte. @deprecated
function account(chunk){
	console.log(chunk);
	mydms_session=null;
	http_request("{}","/logout","GET",disconnect);
}



// automatise les requetes
// data : json à envoyer
// string_path : chemin de l'API sur lequel requeter
// string_method : méthode à utiliser GET,POST,PUT,DELETE
// cb : fonction de callback
// response_handle : handle de reponse pour l'utilisateur
function http_request(data, string_path,string_method,cb,orig_request_handle,orig_response_handle) {

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
	if (admin_session && admin_session != ""){
		post_options.headers["Cookie"] = admin_session;
		console.log('admin cookie sent');
	}

	// Set up the request
	var post_req = http.request(post_options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			if (cb) {
				if (orig_response_handle) return cb(chunk,orig_request_handle,orig_response_handle,res);
				else return cb(chunk);
			}
			else {
				console.log('request without callback')
				return false;
			}
		});
	});

	// post the data
	post_req.write(data);
	post_req.end();
}

// CALLBACKS : code à mettre dans un module

// callback connection administrateur
function admin_connection(chunk,orig_request_handle,orig_response_handle,res){
	if (res){
		var success = JSON.parse(chunk)['success'];
		if (success === "success") {
			admin_session = res.headers['set-cookie'];
			console.log('connection admin : ' + chunk)
			return true;
		}
		else {
			console.log('erreur 500');
			orig_response_handle.status(500).end();
		}
	}

	// infos supplémentaires client concaténées dans les commentaire
	var comment;

	// teste  présence des champs pour la concaténation
	if (orig_request_handle.body.societe) comment += orig_request_handle.body.societe + "\n";
	if (orig_request_handle.body.addresse) comment += orig_request_handle.body.adresse + "\n";
	if (orig_request_handle.body.telephonne) comment += orig_request_handle.body.telephone;

	// informations création de compte
	var account_informations = {
			name: orig_request_handle.body.name,
			email: orig_request_handle.body.mail,
			theme: 'bootstrap',
			language: 'fr',
			comment: comment
	};

	console.log('creation');

	// requete création de compte
	http_request(JSON.stringify(account_informations),'/users','POST',account_creation,req,res);

}

// callback création de compte
function account_creation(chunk,orig_request_handle,orig_response_handle,res){
	if (JSON.parse(chunk).message === "success") {
		console.log('creation compte : \n' + chunk);
		return true;
	}
	else return false;

	if (is_account_created) res.render("./form_code", {mail: req.body.mail});
	else {
		res.statusCode = 302 ;
		res.setHeader("Location","/signup");
		res.body = req.body;
		res.end("");
	}
}

//callback connection
function user_connected(chunk,orig_request_handle,orig_response_handle,res){
	if (res.headers){
		var cookie = res.headers['set-cookie'];
		if (response_handle){
			if (cookie){
				response_handle.setHeader("set-cookie",cookie);
				response_handle.statusCode = 302 ;
				response_handle.setHeader("Location","/postdocs");
				response_handle.end("");
			}
			else {
				response_handle.statusCode = 302;
				response_handle.setHeader("Location","/signin");
				response_handle.end("");
			}
		}
	}
	else {
		response_handle.statusCode = 302;
		response_handle.setHeader("Location","/signin");
		response_handle.end("");
	}
}

function disconnect(chunk){
	console.log('admin disconnected : ' + chunk);
}
