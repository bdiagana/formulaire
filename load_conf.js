const ini = require('ini');
const fs = require('fs');

function parse_ini(){
    var file = fs.readFileSync('./conf/global-app.conf','utf8', (err) => {
        if (err) throw err;
    });
    if (!file){
    	file = fs.readFileSync('./conf/node-app.sample.conf','utf8', (err) => {
        	if (err) throw err;
    	});
    }
    return ini.parse(file);
}

var parse = parse_ini();

module.exports = parse;

