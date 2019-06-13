const express = require('express');
const signup_router = express.Router();
const http_request = require('../http_request');
const conf = require('../load_conf');
const mail = require('nodemailer').createTransport({
	service: 'gmail',
	auth: {
		user: conf.mail.user,
		pass: conf.mail.pass
	}
});

signup_router.get('/', (req,res,next)=>{
  if (req.session.dms_session) res.redirect("/offre");
	else res.render('form_creation');
});

signup_router.post('/', (req,res,next)=>{
  http_request('{"user":"' + conf.geduser.username + '","pass":"' + conf.geduser.password + '"}',"/login","POST",admin_connection,req,res);
});

module.exports = signup_router;

// callback connection administrateur
function admin_connection(chunk,orig_request_handle,orig_response_handle,res){
	if (res){
		var success = JSON.parse(chunk)['success'];
		if (success) {
			global.admin_session = res.headers['set-cookie'];

			// infos supplémentaires client concaténées dans les commentaire
			//	var comment = `${orig_request_handle.body.societe}
			//	${orig_request_handle.body.adresse}
			//	${orig_request_handle.body.atelephone}`;
			var comment = "";

			// teste  présence des champs pour la concaténation
			if (orig_request_handle.body.societe) comment += orig_request_handle.body.societe + "\n";
			if (orig_request_handle.body.adresse) comment += orig_request_handle.body.adresse + "\n";
			if (orig_request_handle.body.telephone) comment += orig_request_handle.body.telephone + '\n';

			// informations création de compte
			var account_informations = {
				name: orig_request_handle.body.nom + " " + orig_request_handle.body.prenom,
				pass: orig_request_handle.body.pass,
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
		resign_up(orig_request_handle,orig_response_handle);
	}
}

// callback when user just created is disabled
function user_disabled(chunk,orig_request_handle,orig_response_handle,res){
	var success = JSON.parse(chunk).success;
	if (res){
		if(success){

			var code_verif = require('hat')();

			mysql.query('INSERT INTO verif_mail (`id`,`mail`,`code`,`verified`) VALUES (?,?,?,?);',[orig_request_handle.body.user,orig_request_handle.body.mail,code_verif,false],(error,results,fields)=>{
				if (error) throw error;
				console.log("Insrtion reussie")
			});

			var mailOptions = {
				from: 'ged@edu.itescia.fr',
				to: orig_request_handle.body.mail,
				subject: 'Votre code d\'activation pour GEDi',
				text: 'Voici le code à entrer : ' + code_verif
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
			console.log('user not disabled' + chunk)
			resign_up(orig_request_handle,orig_response_handle)
		}
	}
}
