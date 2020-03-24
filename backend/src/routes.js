const express = require('express');

const ongsController = require('./controllers/ongsController');
const incidentsController = require('./controllers/incidentsController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');


const routes = express.Router();

routes.post('/session', sessionController.create) 

routes.get('/profile', profileController.index) 

routes.get('/ongs', ongsController.index)
routes.post('/ongs', ongsController.create);

routes.post('/incidents', incidentsController.create);
routes.get('/incidents', incidentsController.index) 
routes.delete('/incidents/:id', incidentsController.delete);

module.exports = routes;