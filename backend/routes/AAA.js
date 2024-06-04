const express = require('express')
const router = express.Router()
const userValidator=require('../middlewares/validators/userValidator')
const userController=require('../controllers/userController');
const checkAccess=require('../middlewares/checkAccess')

router.post('/login',checkAccess,userValidator,userController.login)
router.post('/register',checkAccess,userValidator,userController.register)
module.exports = router