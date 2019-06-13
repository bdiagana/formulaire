// imports modules nodejs
const querystring = require('querystring');
const fs = require('fs');
const express = require('express');
const app = express();
const conf = require('./load_conf');
const multer = require('multer');

const mysql = require('mysql').createConnection({
	host: conf.mysql.hostname,
	user: conf.mysql.user,
	password: conf.mysql.pass,
	port: conf.mysql.port,
	database: conf.mysql.db,
	charset: 'utf8'
});
const session = require('express-session');

// imports routes
const signin_router = require('./routes/signin_router');
const disonnect_router = require('./routes/disconnect_router');
const signup_router = require('./routes/signup_router');
const offre_router = require('./routes/offre_router');
// const verify_router = require('./routes/verify_router');


//variable de session dms
global.admin_session;

// used to queue files to upload
var files_to_upload;
var id_document_attach;

var upload = multer({ dest: 'uploads/' })

// middleware
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(session({
	secret: 'apigeditwothousandnineteen',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}));

app.use('/signin', signin_router);
app.use('/disconnect', disonnect_router);
app.use('/signup', signup_router);
// app.use('/offre', offre_router);
// app.use('/verify', verify_router);

// paramétrage moteur de template
app.set('view engine', 'ejs')

// get routes
app.get('/',(req,res) => {
	req.session.offre = req.query.offre;
	res.redirect('/signin');
});



app.get('/offre', (req, res) => {

});

app.get('/verify', (req, res) => {

	var query = "";
	var variable = "";

	if (req.query.mail){
		query = 'SELECT * FROM tblUsers WHERE email = ?;';
		variable = [req.query.mail];
	}
	else if (req.query.user){
		query = 'SELECT * FROM tblUsers WHERE login = ?;';
		variable = [req.query.user];
	}

	if (query && variable){
		mysql.query(query , variable,(error,results,fields) => {
			if (error) throw error;
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

app.get('/prestation', (req, res) => {

	if (req.session.dms_session) {
		if (req.session.user) res.locals.user = req.session.user;
		res.render('form_presta');
	}
	else {
		req.session.error = "Veuillez vous connecter";
		res.redirect("/signin");
	}
});

app.post('/code',(req,res)=>{
	//require('./response').verify_mail(req,res);
	console.log("verif_mail");
	query = 'SELECT * FROM verif_mail WHERE mail = ? AND code = ? LIMIT 1;';
	mysql.query(query,[req.body.mail,req.body.code],(error,results,fields)=> {
		if (error) throw error;
		if(results.length > 0){
			update_result(results,req,res);
		}
		else {
			res.render('form_code', {mail: req.body.mail});
		}
	});
});

app.post('/offre',upload.array('docs',12), (req,res) => {


})

// démarrage du serveur
app.listen(conf.app.port, () => console.log(`Example app listening on port ${conf.app.port}!`));

function update_result(results,req,res){
	var user = results[0].id;
	console.log(user + " activated with : " + req.body.code);
	mysql.query('UPDATE verif_mail SET verified = true WHERE code = ?;', [req.body.code],(error,results,fields)=> {
		if (error) throw error;
		console.log(JSON.stringify(results));
		http_request('{"disable": "false"}',"/users/"+user+"/disable",'PUT',user_reactivated,req,res);
	});
}

function user_reactivated(chunk,orig_request_handle,orig_response_handle){
	if (JSON.parse(chunk).success){
		var name = JSON.parse(chunk).data.login;
		var data = {
			name: name
		};

		http_request(JSON.stringify(data),"/folder/22/createfolder","POST",folder_created,orig_request_handle,orig_response_handle);
	}
	else {
		console.log("failed user reactivate : " + chunk);
		resign_up(orig_request_handle,orig_response_handle)
	}
}

function folder_created(chunk,orig_request_handle,orig_response_handle,res){
	if (JSON.parse(chunk).success){
		console.log("kfzmlkfdmlzkfdml" +  chunk)
		var user = JSON.parse(chunk).data.name;
		var id = JSON.parse(chunk).data.id;
		mysql.query("UPDATE tblUsers SET homefolder = ? WHERE login = ?",[id,user],(error,results,fields) =>{
			if (error) throw error;
			console.log(results);

			var data = {
				id: user,
				mode: 3
			};

			http_request(JSON.stringify(data),"/folder/"+id+"/access/user/add","PUT",folder_access_granted,orig_request_handle,orig_response_handle);
		});
	}
	else {
		console.log("failed folder creation : " + chunk);
		resign_up(orig_request_handle,orig_response_handle)
	}
}



function folder_access_granted(chunk,orig_request_handle,orig_response_handle,res){
	if (JSON.parse(chunk).success){
		var user = JSON.parse(chunk).message;
		mysql.query("SELECT id FROM tblUsers WHERE login = ?", [user],(error,results,fields)=>{
			if (error) throw error;
			var id = results[0].id;
			mysql.query("UPDATE tblFolders SET owner = ? WHERE name = ?",[id,user],(error,results,fields)=>{
				if (error) throw error;
				console.log("account created successfully")
				orig_response_handle.redirect("/signin");
			});
		});
	}
	else {
		console.log("failed access grant : " + chunk);
		resign_up(orig_request_handle,orig_response_handle);
	}
}

function resign_up(orig_request_handle,orig_response_handle){

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
	console.log('triste')
}
