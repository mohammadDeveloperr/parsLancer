const express = require('express')
const router = express.Router()
const checkAccess=require('../middlewares/checkAccess')
const suggestionController=require('../controllers/suggestionController');

router.get("/",suggestionController.getSuggest);
router.post("/:projectId",checkAccess,suggestionController.addSuggest)
router.put("/",checkAccess,suggestionController.updateSuggest)
router.patch("/",checkAccess,suggestionController.acceptSuggest)

router.delete("/",checkAccess,suggestionController.deleteSuggest)



module.exports = router