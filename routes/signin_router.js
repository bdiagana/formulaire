const express = require('express');
const signin_router = express.Router();
const http_request = require('../http_request');

signin_router.get('/', (req,res,next)=>{
  console.log('toto');
  if (req.session.dms_session) res.redirect("/offre");
  else {
    if (req.session.success !== undefined) {
      res.locals.success = req.session.success;
      req.session.success = undefined;
    }
    if (req.session.error !== undefined) {
      res.locals.error = req.session.error;
      req.session.error = undefined;
    }
    res.render('form_login');
  }
});

signin_router.post('/', (req,res,next)=>{
  http_request('{"user":"' + req.body.user + '","pass":"' + req.body.pass + '"}',"/login","POST",user_connected,req,res);
});

module.exports = signin_router;

//callback connection
function user_connected(chunk,orig_request_handle,orig_response_handle,res){
	console.log('chunk' + chunk)
	var success = JSON.parse(chunk).success;
	if (success){
		orig_request_handle.session.dms_session = res.headers['set-cookie'];
		orig_request_handle.session.user = orig_request_handle.body.user;
		console.log(orig_request_handle.session.dms_session);
		orig_response_handle.redirect("/offre");
	}
	else {
		var infos_back = {
			user: orig_request_handle.body.user,
			pass: orig_request_handle.body.pass,
			error: "Nom d'utilisateur et/ou mot de passe incorrect !"
		};
		orig_response_handle.render("form_login", infos_back);
	}
}
