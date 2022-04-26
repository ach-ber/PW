

const { Router } = require('express');
const controller = require('../controllers/stuff');
const router = Router();
const auth = require('../middleware/authentification.js');



router.get("/avis", controller.getavis);
router.get("/Bestavis", controller.getBestAvis);
router.get("/Recentavis", controller.getRecentAvis);
router.get("/avis/:idavis", controller.getoneAvis);
router.get("/avis/:idspec/:iduniv", controller.getavisSorted);

router.get("/student/:id/avis", controller.getAvisofoneStudent);
router.get("/student/:id/avis/:idavis", controller.getoneAvisofoneStudent);


router.get("/studentemail", controller.getStudentsemail);
router.get("/student", controller.getStudents);
router.get("/student/:id", controller.getoneStudent);
router.get("/company", controller.getCompany);

router.get("/speciality", controller.getspeciality);
router.get("/university", controller.getuniversity);

//router.get("/universityAvis", controller.getuniversityAvis);
//router.get("/universityAvis/:iduniversity", controller.getspecialityAvis);

router.post("/createStudent", controller.createStudent);
router.post("/login", controller.loginStudent);

router.post("/createavis", auth,controller.createAvis);
router.post("/createcompany", auth,controller.createCompany);
router.put("/student/:id/avis/:idavis",auth,controller.modifyAvis);
router.delete("/student/:id/avis/:idavis", auth,controller.deleteAvis);


//router.get("/user/avis", controller.getavisOfStudent);
//router.get('/user/avis', auth,controller.getavisOfStudent);

module.exports = router;