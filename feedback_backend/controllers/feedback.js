const Feedback = require("../model/feedback");

module.exports.feedbacks = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const skip = (page - 1) * limit;

    const totalFeedbacks = await Feedback.countDocuments();

    // console.log("logged in user deatails------", req.user);
    const feedbacks = await Feedback.find()
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });
    res.json({
      message:"All employees",
      feedbacks,
      success: true,
      pagination:{
        totalFeedbacks:totalFeedbacks,
        currentPage:page,
        totalPages:Math.ceil(totalFeedbacks / limit),
        pageSize:limit,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports.renderFeedbackForm = async (req, res) => {
  try {
    const { title, description, rating } = req.body;
    console.log(req.body);
    const newFeedback = new Feedback({
      title,
      description,
      rating,
    });
    res
      .status(200)
      .json({ message: "feedback submitted successfully", success: true });
    await newFeedback.save();
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
