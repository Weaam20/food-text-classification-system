const express = require('express')
const app = express();
var FastText = require('node-fasttext');
const cors = require('cors');


let config = { 
  dim: 100,
  input: "train.txt",
  output: "model"
}


FastText.train("supervised", config, function (success, error) {

  if(error) {
    console.log(error)
    return;
  }
  
  console.log(success)
  
})

app.use(cors())

app.get('/', (req, res) => {
  res.sendfile("index.html");
});

app.get('/fasttext/', function(req, res) {
  var statement = req.param('statement');
  res.send(getFastTextResults(statement));
});


function getFastTextResults(statement) {
	var x = null
	//predict returns an array with the input and predictions for best cateogires
	FastText.predict(
		"model.bin", 3,
		[statement],
		function (success, error) {

		  if(error) {
			console.log(error)
			return;
		  }
		  x = success
		  console.log(success)
		})
	return x;
}

app.listen(8000, () => {
  console.log('Listening on port 8000!')
});

