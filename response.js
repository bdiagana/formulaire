exports.verify_mail = function (req,res){
console.log("verif_mail");
query = 'SELECT * FROM verif_mail WHERE mail = ? AND code = ? LIMIT 1;';
mysql.query(query,[req.body.mail,req.body.code],(error,results,fields)=> {
  if (error) throw error;
  console.log("verif_mail ok ? : " + JSON.stringify(results['id']));
  if(results.length > 0){
    update_result(results,req,res);
  }
  else {
    res.render('form_code', {mail: req.body.mail});
  }

});
}
