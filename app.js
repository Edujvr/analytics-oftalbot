const express = require('express');
const app = express();
app.use(require('body-parser').json());

const router = express.Router();

router.post('/webhook', (req, res, next) => {  
  const action = req.body.results.action;
  switch(action) {   
    case 'track_event':
        const url = 'https://www.google-analytics.com/collect?v=1&t=event&tid=UA-109367761-1&cid=${request.body.sessionId}&dh=www.google-analytics.com&ec=Intent&ea=${request.body.result.metadata.intentName}&ev=1&aip=1';
        require('request').get(encodeURI(url))
        .then(err => {
          if (err) throw err;
          console.log('Successfully logged to GA');
          res.json({
            messages: req.body.result.fulfillment.messages,
            speech: req.body.result.fulfillment.speech,
            displayText: req.body.result.fulfillment.speech,
            contextOut: req.body.result.contexts,
            source: req.body.result.source
          });
        });
      break; 
  }
});
