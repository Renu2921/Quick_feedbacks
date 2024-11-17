const express=require("express");
const router=express.Router();
// const Feedback=require("../model/feedback.js")

const feedbackController=require("../controllers/feedback.js");

const {isAuthorized}=require("../middleware.js")


router.get("/feedbacks",isAuthorized,feedbackController.feedbacks);
router.post("/feedbacks",isAuthorized,feedbackController.renderFeedbackForm);

module.exports=router;