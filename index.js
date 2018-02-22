'use estrict'

const express = require('express');
const app = express();
app.use(require('body-parser').json());
app.listen(process.env.PORT || 8080);

var request = require('request');

app.post("/webhook", (req, res, next) => {  
  const action = req.body.result.action;
  const chatbase = require('@google/chatbase');
  //Envio de información webhook a Dialogflow		  
	res.json({
            messages: req.body.result.fulfillment.messages,
            speech: req.body.result.fulfillment.speech,
            displayText: req.body.result.fulfillment.speech,
            contextOut: req.body.result.contexts,
            source: req.body.result.source
          });
	
switch(action) {   
    case 'control':
	// Create a Message Set
	// See: https://github.com/google/chatbase-node
	var messageSet = chatbase.newMessageSet()
	  .setApiKey("c0f0424f-cf81-4f54-8287-006327e7bf4d") // Chatbase API key
	  .setPlatform("prueba"); // Chat platform name

	// Track the message from the user
	const userMessage = messageSet.newMessage() // Create a new instance of Message
	  .setAsTypeUser() // Mark it as a message coming from the human
	  .setUserId(req.body.sessionId) // User ID on the chat platform, or custom ID
	  .setTimestamp(Date.now().toString()) // Mandatory
	  .setIntent(req.body.result.metadata.intentName) // The intent decoded from the user message, if applicable
	  .setMessage(req.body.result.resolvedQuery); // User message

	// Was the intent successfully decoded?
	if (action == "nothandled") {
	  userMessage.setAsNotHandled(); // Tell Chatbase to mark this user request as "not handled"
	} else {
	  userMessage.setAsHandled(); // Mark this request as successfully handled ;)
	}

	// Track the response message from the bot
	const botMessage = messageSet.newMessage() // See above
	  .setAsTypeAgent() // This message is the bot response
	  .setUserId(req.body.sessionId) // Same as above
	  .setTimestamp(Date.now().toString()) // Mandatory
	  .setIntent(req.body.result.metadata.intentName)
	  .setMessage(req.body.result.fulfillment.messages.speech); // Bot response message

	// Send all messages to Chatbase
	return messageSet.sendMessageSet()
	  .then(response => {
	    var createResponse = response.getCreateResponse();
	    return createResponse.all_succeeded; // "true" if all messages were correctly formatted and have been successfully forwarded
	  })
	  .catch(error => {
	    console.error(error);
	    return false;
	  });
	/*const messageSet = chatbase.newMessageSet()
	.setApiKey("c0f0424f-cf81-4f54-8287-006327e7bf4d")
	.setPlatform("Dialogflow");

	const userMessage = messageSet.newMessage() // Create a new instance of Message
	  .setAsTypeUser(true) // Mark it as a message coming from the human
	  .setUserId(req.body.sessionId) // User ID on the chat platform, or custom ID
	  .setTimestamp(Date.now().toString())
	  .setIntent(req.body.result.metadata.intentName) // The intent decoded from the user message, if applicable
	  .setMessage(req.body.result.resolvedQuery); // User message

	// Was the intent successfully decoded?
	if (req.body.result.metadata.intentName.toString() == "Default") {
	  userMessage.setAsNotHandled(); // Tell Chatbase to mark this user request as "not handled"
	} else {
	  userMessage.setAsHandled(); // Mark this request as successfully handled ;)
	}

	// Track the response message from the bot
	const botMessage = messageSet.newMessage() // See above
	  .setAsTypeAgent(true) // This message is the bot response
	  .setUserId(req.body.sessionId) // Same as above
	  .setTimestamp(Date.now().toString())
	  .setMessage(req.body.result.fulfillment.messages.speech); // Bot response message
		

	// Send all messages to Chatbase
	return messageSet.sendMessageSet()
	  .then(response => {
	    var createResponse = response.getCreateResponse();
	    return createResponse.all_succeeded; // "true" if all messages were correctly formatted and have been successfully forwarded
	  })
	  .catch(error => {
	    console.error(error);
	    return false;
	  });
	*/	
/*		
 	  
//Envio de información a Chatbase libreria @google/chatbase
	var msg = chatbase.newMessage('c0f0424f-cf81-4f54-8287-006327e7bf4d', req.body.sessionId)
	.setAsTypeUser()
	.setPlatform('Dialogflow') 
	.setMessage(req.body.result.resolvedQuery) 
	.setIntent(req.body.result.metadata.intentName)  
	.setVersion('1.0') 
	.setMessageId(req.body.id) 
	/*.send()
	.then(msgUser => console.log(msgUser.getCreateResponse()))
	.catch(err => console.error(err));/
		
	var msgAgent = msg.newMessage()
	.setAsTypeUser()
	.setIntent(req.body.result.metadata.intentName)
	.setMessage(req.body.result.fulfillment.speech)
	.send()
	.then(msg => console.log(msg.getCreateResponse()))
	.catch(err => console.error(err));
*/		
//Envio de información a Google Analytics libreria request
	const url = 'https://www.google-analytics.com/collect?v=1&t=event&tid=UA-109367761-1&cid='+req.body.sessionId+'&dh=www.google-analytics.com&ec=Intento&ea='+req.body.result.metadata.intentName+'&el='+req.body.result.resolvedQuery+'&ev=1&aip=1';
		request.get(encodeURI(url))
       		.on('error', function(err){
          	if (err) throw err;
	  	console.log('Successfully logged to GA , Response to Dialogflow');
        });
      break; 
	case 'nothandled':
//Envio de información a Chatbase libreria @google/chatbase
	var msgUser = chatbase.newMessage('c0f0424f-cf81-4f54-8287-006327e7bf4d', req.body.sessionId)
	.setAsTypeUser('user')
	.setPlatform('Dialogflow') 
	.setMessage(req.body.result.resolvedQuery) 
	.setIntent(req.body.result.metadata.intentName)  
	.setVersion('1.0')
	.setAsNotHandled(true)
	.setMessageId(req.body.id) 
	.send()
	.then(msgUser => console.log(msgUser.getCreateResponse()))
	.catch(err => console.error(err));
		
	var msgAgent = chatbase.newMessage('c0f0424f-cf81-4f54-8287-006327e7bf4d', req.body.sessionId)
	.setAsTypeAgent('agent')
	.setIntent(req.body.result.metadata.intentName)
	.setMessage(req.body.result.fulfillment.speech)
	.send()
	.then(msgAgent => console.log(msgAgent.getCreateResponse()))
	.catch(err => console.error(err));
//Envio de información a Google Analytics libreria request
	const url2 = 'https://www.google-analytics.com/collect?v=1&t=event&tid=UA-109367761-1&cid='+req.body.sessionId+'&dh=www.google-analytics.com&ec=Intento&ea='+req.body.result.metadata.intentName+'&el='+req.body.result.resolvedQuery+'&ev=1&aip=1';     	
		request.get(encodeURI(url2))
       		.on('error', function(err){
          	if (err) throw err;
	  	console.log('Successfully logged to GA , Response to Dialogflow');
        });
      break; 
  }
});
