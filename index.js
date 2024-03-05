const express = require('express');
const bodyParser = require('body-parser');

const createDOMPurify = require('dompurify');
const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const DOMPurify = createDOMPurify(window);

const limit = '16mb';

const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit }));
app.use(bodyParser.json({ limit }));
app.use(bodyParser.raw({ limit }));

app.get('/ping', function (req, res) {
  res.send('pong');
})

app.post('/sanitize', (req, res) => {
  //console.log('Got body:', req.body);
  //const dirty = "<img src=x onerror=alert(1)//>";
  const dirty = req.body.data;
  const clean = DOMPurify.sanitize(dirty);
  //res.json({ data: clean });
  res.send(clean);
});




const port = process.env.PORT || 3000;
console.log(`Listening: http://localhost:${port}`); 
console.log(`curl -d "data=<img src=x onerror=alert(1)//>" -X POST http://localhost:${port}/sanitize`);

app.listen(port);

