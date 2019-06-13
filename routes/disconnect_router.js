const express = require('express');
const disconnect_router = express.Router();

disconnect_router.get('/', (req,res,next)=>{
  if (req.session.dms_session) {
    req.session.dms_session = undefined
    req.session.success = "Déconnecté !"
  }
  res.redirect("/signin");
});

module.exports = disconnect_router;
