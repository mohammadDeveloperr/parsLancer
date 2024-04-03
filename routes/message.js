const express = require('express')
const router = express.Router()
const messageValidator=require('../middlewares/messageValidator')
const checkAccess=require('../middlewares/checkAccess')
const messageController=require('../controllers/messasgeController');

router.get("/",checkAccess,messageController.getMessage);
router.post("/:suggestId",checkAccess,messageValidator,messageController.addMessage)
router.put("/:id",checkAccess,messageValidator,messageController.updateMessage)
router.delete("/:id",checkAccess,messageController.deleteMessage)

module.exports = router