const ini = require('ini');
const fs = require('fs');

function parse_ini(){
    var file = fs.readFileSync('./conf/node-app.conf','utf8', (err) => {
        if (err) throw err;
    });
    return ini.parse(file);
}

var parse = parse_ini();

module.exports = parse;
