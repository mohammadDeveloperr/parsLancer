const express = require('express')
const router = express.Router()
const adminValidator=require('../middlewares/adminValidator')
const checkAccess=require('../middlewares/checkAccess')
const adminController=require('../controllers/adminController');

router.get("/users/",adminController.getUser);
router.put("/users/",adminValidator,adminController.updateUser)
router.delete("/users/",adminValidator,adminController.deleteUser)


module.exports = router