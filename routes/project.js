const express = require('express')
const router = express.Router()
const projectValidator=require('../middlewares/projectValidator')
const checkAccess=require('../middlewares/checkAccess')
const projectController=require('../controllers/projectController');

router.get("/",projectController.getProject);
router.post("/",checkAccess,projectValidator,projectController.addProject)
router.put("/:id",checkAccess,projectValidator,projectController.updateProject)
router.delete("/",checkAccess,projectController.deleteProject)

router.patch("/done/freelancer",checkAccess,projectController.freelancerStatus)

router.patch("/done/employer",checkAccess,projectController.employerStatus)


module.exports = router