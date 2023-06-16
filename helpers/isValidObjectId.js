const { default: mongoose } = require("mongoose");

const isValid=async (req,res)=>{
if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send({
      message: "Invalid  id",
    });
  }
}
module.exports = isValid