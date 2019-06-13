const request = require('request');
const fs = require('fs');
const conf = require('./load_conf');

// automatise les requetes
// data : json ou file à envoyer
// string_path : chemin de l'API sur lequel requeter
// string_method : méthode à utiliser GET,POST,PUT,DELETE
// cb : fonction de callback
// orig_request_handle : handle de request utilisateur
// orig_response_handle : handle de response utilisateur
// dms_session : session dms utilisateur (overwrite admin session)
function http_request(data, string_path,string_method,cb,orig_request_handle,orig_response_handle, dms_session) {

	var post_options = {
		method: string_method,
		url:  'http://' + conf.gedportal.hostname + ":" + conf.gedportal.port + '/restapi/index.php' + string_path,
		headers: {}
	};

	if (dms_session && dms_session != ""){
		post_options.headers["Cookie"] = dms_session;
		console.log('user cookie sent');
	}
	else if (global.admin_session && global.admin_session != ""){
		post_options.headers["Cookie"] = global.admin_session;
		console.log('admin cookie sent');
	}
	else {
		console.log('no cookie sent');
	}

	if (typeof data === 'string' || data instanceof String){
		post_options.headers["content-type"] = "application/json";
		post_options.body = data
		console.log("data de type string")
	}
	else {
		post_options.headers["content-type"] = "multipart/form-data";
		post_options.formData = {
			file: fs.createReadStream(data.path),
			name: data.originalname,
			"Content-Type": data.mimetype
		}
	}

	request(post_options, (error,response,body)=>{
		if (error) throw error;
			if (cb) cb(body,orig_request_handle,orig_response_handle,response)
	});
}

module.exports = http_request;
