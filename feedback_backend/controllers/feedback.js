const Feedback=require("../model/feedback");


module.exports.feedbacks=async (req, res) => {
    try {
      console.log("logged in user deatails------", req.user);
      const feedbacks = await Feedback.find();
      res.json({feedbacks,success:true});
    } catch (error) {
      res.status(500).json({ message: error.message, success:false });
    }
  };

  module.exports.renderFeedbackForm=async (req, res) => {
    try {
      const { title, description, rating } = req.body;
      console.log(req.body);
      const newFeedback = new Feedback({
        title,
        description,
        rating,
      });
      res.status(200).json({message:"feedback submitted successfully", success:true});
      await newFeedback.save();
    } catch (error) {
      res.status(500).json({ message: error.message, success:false });
    }
  };
  