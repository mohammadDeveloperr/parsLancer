const express = require('express')
const router = express.Router()
const checkAccess=require('../middlewares/checkAccess')
const projectSkillController=require('../controllers/projectSkillController');
const projectSkillValidator=require('../middlewares/projectSkillValidator')

router.get("/",checkAccess,projectSkillController.getProjectSkill);
router.post("/:projectId",checkAccess,projectSkillValidator,projectSkillController.addProjectSkill)
router.put("/:projectId",checkAccess,projectSkillValidator,projectSkillController.updateProjectSkill)
router.delete("/:projectId",checkAccess,projectSkillController.deleteProjectSkill)



module.exports = router