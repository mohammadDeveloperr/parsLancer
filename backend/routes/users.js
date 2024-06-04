const express = require('express')
const router = express.Router()
const userValidator=require('../middlewares/validators/userValidator')
const userController=require('../controllers/userController');
const checkAccess=require('../middlewares/checkAccess')

router.get("/",userController.getUser);
router.put("/",checkAccess,userValidator,userController.updateUser)
router.patch("/",checkAccess,userValidator,userController.updatePassword)
module.exports = router