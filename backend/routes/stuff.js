/*

const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router.get('/', stuffCtrl.getAllStuff);
router.post('/', stuffCtrl.createThing);
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);

module.exports = router;

// in routes/stuff.js

*/

const { Router } = require('express');
const controller = require('../controllers/stuff');
const router = Router();

router.get("/avis", controller.getavis);
router.get("/", controller.getStudents);
router.get("/:id", controller.getoneStudent);

module.exports = router;