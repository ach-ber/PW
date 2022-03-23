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


router.get("/avis/:idspec/:iduniv", controller.getconditions);
router.get("/avis", controller.getavis);
router.get("/Bestavis", controller.getBestAvis);
router.get("/Recentavis", controller.getRecentAvis);
router.get("/student", controller.getStudents);
router.get("/student/:id/avis", controller.getAvisofoneStudent);
router.get("/student/:id/avis/:idavis", controller.getoneAvisofoneStudent);
router.get("/student/:id", controller.getoneStudent);
router.get("/avis/:id", controller.getoneAvis);
router.get("/company", controller.getCompany);
router.get("/studentemail", controller.getStudentsemail);
router.get("/speciality", controller.getspeciality);
router.get("/university", controller.getuniversity);

router.get("/universityAvis", controller.getuniversityAvis);
router.get("/universityAvis/:iduniversity", controller.getspecialityAvis);






router.post("/createavis", controller.createAvis);
router.post("/createcompany", controller.createCompany);
router.post("/createStudent", controller.createStudent);
router.post("/login", controller.loginStudent);

router.put("/student/:id/avis/:idavis", controller.modifyAvis);

router.delete("/student/:id/avis/:idavis", controller.deleteAvis);


//router.get("/user/avis", controller.getavisOfStudent);
router.get('/user/avis', auth,controller.getavisOfStudent);

module.exports = router;