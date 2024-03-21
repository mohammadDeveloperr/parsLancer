const express = require('express')
const router = express.Router()
const projectValidator=require('../middlewares/projectValidator')
const checkAccess=require('../middlewares/checkAccess')
const projectController=require('../controllers/projectController');

router.get("/",projectController.getProject);
router.post("/",checkAccess,projectValidator,projectController.addProject)
router.put("/",checkAccess,projectValidator,projectController.updateProject)
router.delete("/",checkAccess,projectController.deleteProject)


module.exports = router