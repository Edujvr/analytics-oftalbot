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
  
  const Colaboradores = require("./models/Colaboradores");
  const action = req.body.result.action;
  const chatbase = require('@google/chatbase');
  const chatbase2= require('@google/chatbase');	
  console.log(action);	
	if(action=='query'){
		var query  = Colaboradores.where({ userid: req.body.result.parameters.UsuariosRed });
		var colaborador = new Object();
		colaborador.userid = req.body.result.parameters.UsuariosRed;
		console.log('Ingreso al metodo de consulta');
		console.log(req.body.result.parameters.UsuariosRed);
		var cola = query.findOne(function (err, colaboradores) {
		    if (err) {
		      res.status(500).send(err);
		    }
		    res.status(200).json(colaboradores.consultor);
			console.log(colaboradores.consultor)
		  });
		console.log("Tu consultor es : " + cola);
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
	  .setAsTypeUser() // Marca como mensaje que viene del humano
	  .setUserId(req.body.sessionId) // ID de usuario en la plataforma de chat 
	  .setTimestamp(Date.now().toString()) // Tiempo obtenido del sistema
	  .setIntent(req.body.result.metadata.intentName) // La intención decodificada a partir del mensaje del usuario
	  .setMessage(req.body.result.resolvedQuery) // Mensaje de Usuario
	  .setAsNotHandled(); // Indica a Chatbase que marque esta solicitud de usuario como "no gestionada"(not handled)
	} else {
	  messageSet.newMessage() // Crea una nueva instancia de Mensaje
	  .setAsTypeUser() // Marca como mensaje que viene del humano
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
	  .setAsTypeAgent() // Este mensaje es la respuesta bot
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
