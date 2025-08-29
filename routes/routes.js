import express from 'express';
import eventcontol from '../controllers/eventcontol.js';
import graphicControl from '../controllers/graphicControl.js';
import orderController from '../controllers/orderController.js';
import websiteController from '../controllers/webcontrol.js';
const {addGraphic,getGraphics} =graphicControl
const { getWebSites, addwebProject } = websiteController;
const  {addEvent,getEvents} =eventcontol
const {getOrders,addOrder}=orderController
const routes=express.Router();
routes.post('/web/addwebsite',addwebProject);
routes.get('/web/getwebsites',getWebSites)
routes.post('/events/addevent',addEvent)
routes.get('/event/getevents',getEvents)
routes.post('/graphics/addgraphic',addGraphic);
routes.get('/graphics/getgraphics',getGraphics);
routes.get('/orders/getorders',getOrders);
routes.post('/orders/addorder',addOrder);
export default routes;