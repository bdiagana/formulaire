// imports modules nodejs
const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const express = require('express');
const app = express();
const conf = require('./load_conf');
const multer = require('multer');
const mail = require('nodemailer').createTransport({
	service: 'gmail',
	auth: {
		user: conf.mail.user,
		pass: conf.mail.pass
	}
});
const mysql = require('mysql').createConnection({
	host: conf.mysql.hostname,
	user: conf.mysql.user,
	password: conf.mysql.pass,
	port: conf.mysql.port,
	database: conf.mysql.db,
	charset: 'utf8'
});


//variable de session dms
var mydms_session;
var mydms_cookie;
var admin_session;

var upload = multer({ dest: 'uploads/' })

// middleware
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// paramétrage moteur de template
app.set('view engine', 'ejs')

// get routes
app.get('/',(req,res) => {
	res.render('form_login')
});
app.get('/signin', (req, res) => res.render('form_login'));
app.get('/signup', (req, res) => res.render('form_creation'));
app.get('/postdocs', (req, res) => res.render('form_offre'));
app.get('/verify', (req, res) => {

	var query = "";
	var variable = "";

	if (req.query.mail){
		query = 'SELECT * FROM tblUsers WHERE email = ?;';
		variable = req.query.mail;
	}
	else if (req.query.user){
		query = 'SELECT * FROM tblUsers WHERE login = ?;';
		variable = req.query.user;
	}

	if (query && variable){
		mysql.query(query , [variable],(error,results,fields) => {
			if (error) throw error;
			console.log(JSON.stringify(results));
			if(results.length > 0){
				res.codeStatus = 200;
				res.send('1');
			}
			else {
				res.codeStatus = 200;
				res.send('0');
			}
		});
	}
});

var arrays_to_upload = [
  { name: 'devis1', maxCount: 1 },
	{ name: 'devis2', maxCount: 1 },
	{ name: 'devis3', maxCount: 1 },
	{ name: 'rib', maxCount: 1 },
	{ name: 'ptf', maxCount: 1 },
	{ name: 'publication', maxCount: 1 }
]

// post routes
app.post('/process',upload.fields(arrays_to_upload, 12), (req, res) => {
	console.log('process : ' + JSON.stringify(req.files))

	switch(req.body['form']){
		case "signin":

		http_request('{"user":"' + req.body.user + '","pass":"' + req.body.pass + '"}',"/login","POST",user_connected,req,res);

		break;
		case "signup":

		//connection administrateur
		http_request('{"user":"' + conf.geduser.username + '","pass":"' + conf.geduser.password + '"}',"/login","POST",admin_connection,req,res);

		break;
		case "offre":

		console.log('offre ' +JSON.stringify(req.files))
		res.statusCode = 200;
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
		console.log(success + " dshfgsjdhfjé")
		if (success) {
			admin_session = res.headers['set-cookie'];

			console.log('connection admin : ' + chunk)

			console.log('ad : ' + admin_session);
			// infos supplémentaires client concaténées dans les commentaire
			var comment = "";

			// teste  présence des champs pour la concaténation
			if (orig_request_handle.body.societe) comment += orig_request_handle.body.societe + "\n";
			if (orig_request_handle.body.addresse) comment += orig_request_handle.body.adresse + "\n";
			if (orig_request_handle.body.telephonne) comment += orig_request_handle.body.telephone;

			// informations création de compte
			var account_informations = {
				name: orig_request_handle.body.nom + " " + orig_request_handle.body.prenom,
				user: orig_request_handle.body.user,
				email: orig_request_handle.body.mail,
				theme: 'bootstrap',
				language: 'fr',
				comment: comment
			};

			console.log('creation');

			// requete création de compte
			http_request(JSON.stringify(account_informations),'/users','POST',account_creation,orig_request_handle,orig_response_handle);
		}
		else {
			console.log('erreur 500');
			orig_response_handle.status(500).end();
			return
		}
	}



}

// callback création de compte
function account_creation(chunk,orig_request_handle,orig_response_handle,res){
	if (JSON.parse(chunk).success) {
		console.log('creation compte : \n' + chunk);

		http_request('{"disable":"true"}',"/users/" + orig_request_handle.body.user + "/disable",'PUT',user_disabled,orig_request_handle,orig_response_handle);
	}
	else {
		var infos_back = {
			nom: orig_request_handle.body.nom,
			prenom: orig_request_handle.body.prenom,
			societe: orig_request_handle.body.societe,
			adresse: orig_request_handle.body.adresse,
			telephone: orig_request_handle.body.telephone,
			mail: orig_request_handle.body.mail,
			user: orig_request_handle.body.user,
			pass: orig_request_handle.body.pass,
			passconf: orig_request_handle.body.passconf,
			error: 'Echec lors de la création du compte !'
		};

		orig_response_handle.render("form_creation", infos_back);
		console.log('trise')
	}
}

//callback connection
function user_connected(chunk,orig_request_handle,orig_response_handle,res){
	if (res.headers){
		var cookie = res.headers['set-cookie'];
		if (orig_response_handle){
			if (cookie){
				orig_response_handle.setHeader("set-cookie",cookie);
				orig_response_handle.statusCode = 302 ;
				orig_response_handle.setHeader("Location","/postdocs");
				orig_response_handle.end("");
			}
			else {
				orig_response_handle.statusCode = 302;
				orig_response_handle.setHeader("Location","/signin");
				orig_response_handle.end("");
			}
		}
	}
	else {
		response_handle.statusCode = 302;
		response_handle.setHeader("Location","/signin");
		response_handle.end("");
	}
}

function user_disabled(chunk,orig_request_handle,orig_response_handle,res){
	var success = JSON.parse(chunk).success;
	if (res){
		if(success){

			var code_verif = require('hat')();

			mysql.query('INSERT INTO verif_mail (`mail`,`code`,`verified`) VALUES (?,?,?);',[orig_request_handle.body.mail,code_verif,false],(error,results,fields)=>{
				if (error) throw error;
				console.log("Insrtion reussie")
			});

			var mailOptions = {
				from: 'ged@edu.itescia.fr',
				to: orig_request_handle.body.mail,
				subject: 'Sending Email using Node.js',
				text: 'That was easy! ' + code_verif
			};

			mail.sendMail(mailOptions, function(error, info){
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
			});

			orig_response_handle.render("./form_code", {mail: orig_request_handle.body.mail});
		}
		else {
			console.log('user not disabled')
		}
	}
}

function disconnect(chunk){
	console.log('admin disconnected : ' + chunk);
}
