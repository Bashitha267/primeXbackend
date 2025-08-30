import express from 'express';
// REMOVE THIS LINE: import fileUpload from 'express-fileupload';
import eventcontol, { uploadImages } from '../controllers/eventcontol.js';
import graphicControl from '../controllers/graphicControl.js';
import orderController from '../controllers/orderController.js';
import websiteController from '../controllers/webcontrol.js';

const { addGraphic, getGraphics } = graphicControl;
const { getWebSites, addwebProject } = websiteController;
const { addEvent, getEvents,getEventsbyCate } = eventcontol;
const { getOrders, addOrder } = orderController;

const router = express.Router();

// REMOVE THIS ENTIRE BLOCK
/*
router.use(
  fileUpload({
    useTempFiles: false,
  })
);
*/

// --- Your Routes Remain Unchanged ---
router.post("/events/upload", uploadImages);
router.post('/web/addwebsite', addwebProject);
router.get('/web/getwebsites', getWebSites);
router.post('/events/addevent', addEvent);
router.get('/event/getevents', getEvents);
router.post('/graphics/addgraphic', addGraphic);
router.get('/graphics/getgraphics', getGraphics);
router.get('/orders/getorders', getOrders);
router.post('/orders/addorder', addOrder);
router.get('/events/:category',getEventsbyCate);
// router.delete('/events/all',deleteAllEvents)
export default router;