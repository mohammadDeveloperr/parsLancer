const express = require('express')
const router = express.Router()
const adminValidator=require('../middlewares/adminValidator')
const checkAccess=require('../middlewares/checkAccess')
const projectController=require('../controllers/projectController');

router.get("/",projectController.getProject);
router.post("/",projectController.addProject)
router.put("/:id",projectController.updateProject)
router.delete("/:id",projectController.deleteProject)


module.exports = router