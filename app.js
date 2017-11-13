const express = require('express');
const app1 = express();
app1.use(require('body-parser').json());

app1.post('/webhook/ai', (req, res, next) => {
    
  const action = req.body.results.action; // 'track_event'
   console.log(action+'Est es la accion que llega');
  switch(action) {
   
    case'track_event':
        const url = 'https://www.google-analytics.com/collect?v=1&t=event&tid<UA-109367761-1>&cid=${request.body.sessionId}&dh<https://www.google-analytics.com>&ec=Intent&ea=${request.body.result.metadata.intentName}&ev=1&aip=1';
        require('request').get(url)
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
