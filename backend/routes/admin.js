const express = require('express')
const router = express.Router()
const adminValidator=require('../middlewares/validators/adminValidator')
const adminController=require('../controllers/adminController');

router.get("/users/",adminController.getUser);
router.put("/users/",adminValidator,adminController.updateUser)
router.delete("/users/",adminController.deleteUser)


module.exports = router