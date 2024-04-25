const express = require('express')
const router = express.Router()
const captchaController=require('../controllers/captchaController');

router.get("/",captchaController.getCaptcha);
router.post("/",captchaController.varifyCaptcha)


module.exports = router