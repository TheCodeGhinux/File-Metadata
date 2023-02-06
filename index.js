var express = require('express');
var cors = require('cors');
const multer = require('multer')
require('dotenv').config()

const upload = multer({ dest: './public/data/uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const name = req.file.originalname;
  const type = req.file.mimetype;
  const size = req.file.size;

  console.log(name)
  if(name) {
    return res.status(200).json({
      name: name,
      type: type,
      size: size
    })
  } else {
    res.status(404).send('No file found')
  }

  res.json
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
