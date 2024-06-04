const express = require('express')
const router = express.Router()
const checkAccess=require('../middlewares/checkAccess')
const suggestionController=require('../controllers/suggestionController');
const suggestionValidator=require('../middlewares/validators/suggestionValidator')

router.get("/",checkAccess,suggestionValidator,suggestionController.getSuggest);
router.post("/:projectId",checkAccess,suggestionValidator,suggestionController.addSuggest)
router.put("/",checkAccess,suggestionValidator,suggestionController.updateSuggest)
router.patch("/",checkAccess,suggestionController.acceptSuggest)

router.delete("/",checkAccess,suggestionController.deleteSuggest)



module.exports = router