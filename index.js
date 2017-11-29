'use estrict'

const express = require('express');
const app = express();
app.use(require('body-parser').json());
app.listen(process.env.PORT || 8080);
console.log('Inicio el programa');
const router = express.Router();

app.post("/webhook", (req, res, next) => {  
console.log('entro aqui');
  const action = req.body.result.action;
  console.log(action);
  switch(action) {   
    case 'prueba':
        const url = 'https://www.google-analytics.com/collect?v=1&t=event&tid=UA-109367761-1&cid=${request.body.sessionId}&dh=www.google-analytics.com&ec=Intent&ea=${request.body.result.metadata.intentName}&ev=1&aip=1';
        var request = require('request');
		request.get(encodeURI(url))
        .on('error', function(err){
          if (err) throw err;
          else{
			  console.log('Successfully logged to GA');
          res.json({
            messages: req.body.result.fulfillment.messages,
            speech: req.body.result.fulfillment.speech,
            displayText: req.body.result.fulfillment.speech,
            contextOut: req.body.result.contexts,
            source: req.body.result.source
          });
		  }
        });
      break; 
  }
});
