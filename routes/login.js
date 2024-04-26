const express = require('express')
const router = express.Router()
const userValidator=require('../middlewares/validators/userValidator')
const userController=require('../controllers/userController');
const checkAccess=require('../middlewares/checkAccess')

router.post('/',checkAccess,userValidator,userController.login)

module.exports = router