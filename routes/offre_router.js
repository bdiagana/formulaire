const express = require('express');
const offre_router = express.Router();
const http_request = require('../http_request');
const conf = require('../load_conf');
const mysql = require('mysql').createConnection({
	host: conf.mysql.hostname,
	user: conf.mysql.user,
	password: conf.mysql.pass,
	port: conf.mysql.port,
	database: conf.mysql.db,
	charset: 'utf8'
});

offre_router.get("/",(req,res,nex)=>{
  	if (req.session.dms_session) {
  		if (req.session.user) res.locals.username = req.session.user;
  		res.render('form_offre');
  	}
  	else {
  		req.session.error = "Veuillez vous connecter";
  		res.redirect("/signin");
  	}
});

ofre_router.post("/", (req,res,next)=>{
  if (req.session.dms_session === undefined) {
    req.session.error = "Veuillez vous connecter";
    res.redirect("/signin");
    return
  }

  console.log(JSON.stringify(req.files));

  files_to_upload = req.files;

  var query_folder = "SELECT homefolder FROM tblUsers WHERE login = ?";

  mysql.query(query_folder, [req.session.user], (error,results,fields)=>{
    if (error) throw error;
    var folder = results[0].homefolder;
    console.log("folder : " + folder);

    var query_test_folder = "SELECT id,parent FROM tblFolders WHERE name = ?";

    var annee = req.body.annee;

    mysql.query(query_test_folder,[annee],(error,results2,fields)=>{
      if (error) throw error;

      if (results2[0] === undefined || results2[0].parent != folder){
        console.log("creation du dossier année : " + annee + " pour l'utilisateur : " + req.session.user);
        var data = {
          name: annee
        };

        http_request(JSON.stringify(data),"/folder/"+folder+"/createfolder","POST",offre_folder_created,req,res,req.session.dms_session);
      }
      else {
        console.log("dossier année : " + annee + " déjà présent pour l'utilisateur : " + req.session.user);
        var id_folder = results2[0].id;
        var data = files_to_upload.shift();
        console.log("data to send :" + JSON.stringify(data))
        var dms_session = req.session.dms_session;
        http_request(data,"/folder/"+id_folder+"/document","POST",document_uploaded,req,res,dms_session);
      }
    });
  });
});

module.exports = offre_router;

function offre_folder_created(chunk,orig_request_handle,orig_response_handle,res){
	console.log(chunk)
	if (JSON.parse(chunk).success){
		var id_folder = JSON.parse(chunk).data.id;
		var data = files_to_upload.shift();
		console.log("document à upload" + JSON.stringify(data))
		var dms_session = orig_request_handle.session.dms_session;
		http_request(data,"/folder/"+id_folder+"/document","POST",document_uploaded,orig_request_handle,orig_response_handle,dms_session);
	}
	else {
		console.log("erreur lors de la création du folder : " + chunk)
	}
}

function document_uploaded(chunk,orig_request_handle,orig_response_handle,res){
	if (JSON.parse(chunk).success){
		console.log('doc uploaded : ' + chunk)
		console.log(files_to_upload)
		if (files_to_upload.length > 0){
			if(JSON.parse(chunk).data.id && JSON.parse(chunk).data.id != "") id_document_attach = JSON.parse(chunk).data.id;
			var dms_session = orig_request_handle.session.dms_session;
			var data = files_to_upload.shift();
			http_request(data,"/document/"+id_document_attach+"/attachment","POST",document_uploaded,orig_request_handle,orig_response_handle,dms_session)
		}
		else orig_response_handle.render('form_success',{url: "http://" + conf.gedportal.hostname + ":" + conf.gedportal.port});
	}
	else console.log("fail to attach or upload file"+ chunk)
}
