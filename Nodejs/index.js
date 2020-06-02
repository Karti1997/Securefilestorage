const express=require('express');
var app=express(); 
const path=require('path');
const userRoutes=require('./routes/user');
const crypto=require('crypto');
const multer=require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const bodyParser=require('body-parser');
const cors=require('cors');
const Grid =require('gridfs-stream');
const mongoose=require('mongoose');
const conn=mongoose.createConnection('mongodb://localhost:27017/Fileupload',{useNewUrlParser: true,useUnifiedTopology: true });
var gfs;

conn.once('open',()=>{
    gfs=Grid(conn.db,mongoose.mongo);
    gfs.collection('uploads');
});
mongoose.connect("mongodb://localhost:27017/Fileupload", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(()=>{
  console.log('connected to database');
})
.catch(() =>{
  console.log('connection failed');
});


app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Acces-Control-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
       "POST, PUT, GET, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
//schema

//storage engine
const storage=new GridFsStorage({
    
    url:'mongodb://localhost:27017/Fileupload',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true 
      },
    file:(req,file)=>{
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(16,(err,buf)=>{
                if(err)
                {
                    return reject(err);
                }
                //const filename=buf.toString('hex')+path.extname(file.originalname);
                const filename=file.originalname;
                const user=req.params.userid;
                //const originalname=file.originalname;
                const fileInfo={
                    filename:{filename,user},
                    bucketName:'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
})
let upload = multer({
    storage: storage
}).single('file');

// Route for file upload
app.post('/upload/:userid', (req, res) => {
    console.log(req.params.userid);
    upload(req,res, (err) => {
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        res.json({error_code:0, error_desc: null, file_uploaded: true});
    });
});

// Downloading a single file
app.get('/file/:filename', (req, res) => {

     
    /** First check if file exists */
    gfs.files.find({"filename.filename": req.params.filename}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        // create read stream
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            originalname: files[0].originalname,
            root: "uploads"
        });
        // set the proper content type 
        res.set('Content-Type', files[0].contentType)
        // Return response
        return readstream.pipe(res);
    });
});

// Route for getting all the files
app.get('/files/:id', (req, res) => {
    
    let filesData = [];
    let count = 0;
    gfs.files.find().toArray((err, files) => {
    if (files || files.length != 0) {
        files.forEach((file) => {
            filesData[count++] = {
                user:req.params.id,
                filename: file.filename,
                contentType: file.contentType,
                originalname:file.originalname
            }
            console.log(file.filename);
            console.log(file.contentType);
            console.log(file.originalname);
        });
        res.json(filesData);
      }
       else{
          res.send('error');
           }
      
});
});
app.use('/api/user', userRoutes);

app.listen(3000,function(){
    console.log('Server running at port 3000');
});



