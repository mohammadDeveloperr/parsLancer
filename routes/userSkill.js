const express = require('express')
const router = express.Router()
const checkAccess=require('../middlewares/checkAccess')
const userSkillController=require('../controllers/userSkillController');
const userSkillValidator=require('../middlewares/userSkillValidator')

router.get("/",checkAccess,userSkillController.getUserSkill);
router.post("/",checkAccess,userSkillValidator,userSkillController.addUserSkill)
router.put("/",checkAccess,userSkillValidator,userSkillController.updateUserSkill)
router.delete("/",checkAccess,userSkillController.deleteUserSkill)



module.exports = router