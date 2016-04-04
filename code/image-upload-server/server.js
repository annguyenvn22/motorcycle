var express = require('express'),
    multer = require('multer'),

    storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname)
        }
    });

var upload = multer({
        storage: storage
    }),
    app = express();



app.set('views', './views');
app.set('view engine', 'ejs');




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.setHeader('Content-Type', 'application/json', 'multipart/form-data');
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    next();
});




// app.post('/img', upload.single('file'), function(req, res) {
//     res.status(200).send({
//         message: 'OK'
//     });
// });

app.post('/img', function(req, res) {
  upload.single('file')(req,res, function(err) {
    if(err) {
      console.log(err);
    } else {
      res.status(200).send({
        filename: req.file.filename
      })
    }
  })
});




app.get('/', function(req, res) {
    res.send('<h1>Hello World</h1>')
});




app.use(express.static('./'));
app.listen(3000);
console.log('Serer is running at http://localhost:3000');