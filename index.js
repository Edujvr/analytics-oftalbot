'use estrict'

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(process.env.PORT || 8080);
var request = require('request');
const Colaboradores = require("./models/Colaboradores");

// db instance connection
require("./config/db");

//Creación del metodo que escucha las llamadas POST y obtiene los parametros
app.post("/webhook", (req, res) =>{  
	
/*let newTask = new Task(req.body);
  newTask.save((err, task) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(task);
  });*/
  console.log(req.body.result.contexts)
	
	
  const Colaboradores = require("./models/Colaboradores");
  const action = req.body.result.action;
  const chatbase = require('@google/chatbase');
  const chatbase2= require('@google/chatbase');	
  
  console.log(action);	
	if(action=='query'){
		var query  = Colaboradores.where({ UsuarioRed: req.body.result.parameters.UsuariosRed });
		query.findOne(function (err, colaboradores) {
		    if (err) {
		      res.status(500).send(err);
		    }
			var respuesta =colaboradores.Nombre +" Tu consultor es " + colaboradores.NombreConsultor //+" Tu nombre " +usuarioName
			sendResponse(respuesta);
		  });
	}
	
function sendResponse (responseToUser) {
    // Si la respuesta es una cadena, envíela como respuesta al usuario
    if (typeof responseToUser === 'string') {
      let responseJson = {};
      responseJson.speech = responseToUser; // respuesta hablada
      responseJson.displayText = responseToUser; // respuesta mostrada
      res.json(responseJson); // Enviar respuesta a Dialogflow
    } else {
      // Si la respuesta al usuario incluye respuestas ricas o contextos, envíelos a Dialogflow
      let responseJson = {};
      // Si speech o displayText está definido, úselo para responder (si uno no está definido use el valor del otro)
      responseJson.speech = responseToUser.speech || responseToUser.displayText;
      responseJson.displayText = responseToUser.displayText || responseToUser.speech;
      // Opcional: agregue mensajes enriquecidos para integraciones (https://dialogflow.com/docs/rich-messages)
      responseJson.data = responseToUser.data;
      // Opcional: agregar contextos (https://dialogflow.com/docs/contexts)
      responseJson.contextOut = responseToUser.outputContexts;
      console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
      res.json(responseJson); // Enviar respuesta a Dialogflow
    }
  }

	
  //Envio de información webhook a Dialogflow		  
	res.json({
            messages: req.body.result.fulfillment.messages,
            speech: req.body.result.fulfillment.speech,
            displayText: req.body.result.fulfillment.speech,
            contextOut: req.body.result.contexts,
            source: req.body.result.source
          });
/*	
	// Creación mensaje Set de Usuario
	var messageSet = chatbase.newMessageSet()
	  .setApiKey("c0f0424f-cf81-4f54-8287-006327e7bf4d") // Chatbase API key
	  .setPlatform("Dialogflow") // Nombre de la Plataforma del Chat
	  .setVersion('1.0'); // La versión que el bot desplegado es

	// Mensaje del Usuario
	if (action == "nothandled") {
	messageSet.newMessage() // Crea una nueva instancia de Mensaje
	  .setAsTypeUser() // Marca como mensaje que viene del Usuario
	  .setUserId(req.body.sessionId) // ID de usuario en la plataforma de chat 
	  .setTimestamp(Date.now().toString()) // Tiempo obtenido del sistema
	  .setIntent(req.body.result.metadata.intentName) // La intención decodificada a partir del mensaje del usuario
	  .setMessage(req.body.result.resolvedQuery) // Mensaje de Usuario
	  .setAsNotHandled(); // Indica a Chatbase que marque esta solicitud de usuario como "no gestionada"(not handled)
	} else {
	  messageSet.newMessage() // Crea una nueva instancia de Mensaje
	  .setAsTypeUser() // Marca como mensaje que viene del Usuario
	  .setUserId(req.body.sessionId) // ID de usuario en la plataforma de chat 
	  .setTimestamp(Date.now().toString()) // Tiempo obtenido del sistema
	  .setIntent(req.body.result.metadata.intentName) // La intención decodificada a partir del mensaje del usuario
	  .setMessage(req.body.result.resolvedQuery) // Mensaje de Usuario
	  .setAsHandled(); // Marque esta solicitud como exitosamente manejada(handled)
	}

	// Envio de mensaje a Chatbase
	messageSet.sendMessageSet()
	  .then(messageSet => {
	    console.log(messageSet.getCreateResponse());
	  })
	  .catch(error => {
	    console.error(error);
	  });	
	
	// Creación mensaje Set del Bot
	var messageSet2 = chatbase.newMessageSet()
	  .setApiKey("c0f0424f-cf81-4f54-8287-006327e7bf4d") // Chatbase API key
	  .setPlatform("Dialogflow") // Nombre de la Plataforma del Chat
	  .setVersion('1.0'); // La versión que el bot desplegado es
	
	// Mensaje del Bot
	const botMessage = messageSet2.newMessage() // Crea una nueva instancia de Mensaje
	  .setAsTypeAgent() // Marca como mensaje que viene del Bot
	  .setUserId(req.body.sessionId) // ID de usuario la misma que arriba
	  .setTimestamp(Date.now().toString()) // Tiempo obtenido del sistema
	  .setMessage(req.body.result.fulfillment.speech); // Mensaje de respuesta del Bot
	
	// Envio de mensaje a Chatbase
	messageSet2.sendMessageSet()
	  .then(messageSet => {
	    console.log(messageSet2.getCreateResponse());
	  })
	  .catch(error => {
	    console.error(error);
	});
		
//Envio de información a Google Analytics libreria request
	const url = 'https://www.google-analytics.com/collect?v=1&t=event&tid=UA-109367761-1&cid='+req.body.sessionId+'&dh=www.google-analytics.com&ec=Intento&ea='+req.body.result.metadata.intentName+'&el='+req.body.result.resolvedQuery+'&ev=1&aip=1';
		request.get(encodeURI(url))
       		.on('error', function(err){
          	if (err) throw err;
	  	console.log('Successfully logged to GA , Response to Dialogflow');
        });*/
});
