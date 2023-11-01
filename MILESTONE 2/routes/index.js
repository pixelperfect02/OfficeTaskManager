var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Express' });
});
//task1-3
var text='';
var cred=
{ username:'archie', pwd:'apple' };
router.post('/login',function(req,res,next)
{
var uname=req.body.uname;
var pas=req.body.pas;
console.log(uname);
console.log(pas);
if(cred.username==uname && cred.pwd==pas)
{
text ='login successful: '+uname+' '+pas;
}else{
text ='login unsuccessful: '+uname+' '+pas;
}
res.send(text);
});
module.exports = router;