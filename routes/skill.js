const express = require('express')
const router = express.Router()
const skillValidator=require('../middlewares/validators/skillValidator')
const checkAccess=require('../middlewares/checkAccess')
const skillController=require('../controllers/skillController');

router.get("/:name",skillController.getSkill);
router.post("/",checkAccess,skillValidator,skillController.addSkill)
router.put("/:name",checkAccess,skillValidator,skillController.updateSkill)
router.delete("/:name",checkAccess,skillController.deleteSkill)
module.exports = router