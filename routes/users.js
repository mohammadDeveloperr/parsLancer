const express = require('express')
const router = express.Router()
const userValidator=require('../middlewares/userValidator')
const checkAccess=require('../middlewares/checkAccess')
const userController=require('../controllers/userController');
// middleware that is specific to this router
/*router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})*/
router.post('/login',
//checkAccess,
userValidator,userController.login)
router.post('/register',userValidator,userController.register)
router.get("/",userController.getUser);
router.put("/:username",userController.updateUser)
router.patch("/",userController.updatePassword)
module.exports = router