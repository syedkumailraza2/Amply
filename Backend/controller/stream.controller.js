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
    res.status(200).json({success:true, message:"Stream Created Successfully",stream:newStream})

} catch (error) {
    console.log('Error while Creating Stream',error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
}
}

export { createStream }