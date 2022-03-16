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
const auth = require('../middleware/authentification.js');

router.get("/avis", controller.getavis);
router.get("/", controller.getStudents);
router.get("/:id", controller.getoneStudent);
router.get("/avis/:id", controller.getoneAvis);
router.post("/createavis", controller.createAvis);
router.post("/createcompany", controller.createCompany);
router.post("/createStudent", controller.createStudent);
router.post("/login", controller.loginStudent);
//router.get("/user/avis", controller.getavisOfStudent);
router.get('/user/avis', auth,controller.getavisOfStudent);

module.exports = router;