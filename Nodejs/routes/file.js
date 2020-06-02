var express =  require('express');
var router = express.Router();
var multer = require('multer');
var path=require('path');

var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'.'+file.originalname);
    }
});

var upload=multer({storage:store}).single('file');

router.post('/upload/:userid',function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    upload(req,res,function(err)
    {
        if(err){
            return res.status(501).json({error:err});
        }
        console.log(req.params.userid);
        res.json({originalname:req.file.originalname,uploadname:req.file.filename});
    });
});
router.post('/download',function(req,res,next)
{
    filepath=path.join(__dirname,'../uploads')+'/'+req.body.filename;
    res.sendFile(filepath);
})


module.exports=router;