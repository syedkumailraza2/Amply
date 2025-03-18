import Stream from "../model/stream.model.js";
import User from "../model/user.model.js"
const createStream = async(req,res)=>{
try {
    const { url, userId } = req.body

    const userExist = User.findById(userId)
    if(!userExist){
        return res.status(400).json({ success: false, message: "User not exist" });
    }

    const newStream = new Stream({
        url:url,
        userId:userId
    })

    await newStream.save()

    await User.findByIdAndUpdate(userId, {
        $push: { streams: newStream._id }
      });

    res.status(200).json({success:true, message:"Stream Created Successfully",stream:newStream})

} catch (error) {
    console.log('Error while Creating Stream',error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
}
}

const getStream = async (req, res) => {
    try {
        const userId = req.params.id;  // Correctly extract userId

        console.log(`user Id: ${userId}`);
        

        // Check if user exists
        const userExist = await User.findById(userId);
        if (!userExist) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        // Fetch streams associated with userId
        const streams = await Stream.find({ userId });

        return res.status(200).json({ success: true, streams });

    } catch (error) {
        console.error("Error fetching streams:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export { createStream, getStream }