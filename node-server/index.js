const express = require('express');
const app = express();
const port = 3001;
const comment_model = require('./comment_model');
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  res.status(200).send('It works!');
})

app.get('/comments', (req, res) => {
  const params = Object.entries(req.query);
  const len = params.length;

  if(len == 0) {
    comment_model.getComments().then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(500).send(error);
    });
  }

  else if(len == 1) {
    comment_model.getCommentsPaginate(params).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(500).send(error);
    });
  }

  else if(len == 4) {
    comment_model.getCommentsWithParams(params).then(response => {
        res.status(200).send(response);
    }).catch(error => {
        res.status(500).send(error);
    });
  }

  else {
    res.status(400).send("Запрос с неправильными параметрами");
  }


})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})