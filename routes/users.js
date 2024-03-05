const express = require('express')
const router = express.Router()
const {registerValidator}=require('../middlewares/userValidator')
const userController=require('../controllers/userController');
// middleware that is specific to this router
/*router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})*/
// define the home page route
router.post('/login',userController.login)
// define the about route
router.post('/register',registerValidator,userController.register)

module.exports = router