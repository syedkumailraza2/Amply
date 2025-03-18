import Stream from "../model/stream.model.js"
import Upvote from "../model/upvote.model.js"
import User from "../model/user.model.js"

const createUpvote = async (req,res)=>{
    try {
        const { userId, streamId } = req.body
        
        const userExist = User.findById(userId)
        const streamExist = Stream.findById(streamId)
        if(!userExist){
            return res.status(400).json({ success: false, message: "User not exist" });
        }
        if(!streamExist){
            return res.status(400).json({ success: false, message: "Stream not exist" });
        }

        const newUpvote = new Upvote({
            userId:userId,
            streamId:streamId
        })

        await newUpvote.save()

        await Stream.findByIdAndUpdate(streamId, {
                $push: { upvotes: newUpvote._id }
              });

              await User.findByIdAndUpdate(userId, {
                $push: { upvotes: newUpvote._id }
              });
        res.status(200).json({success:true, message:"upvote Added Successfully",upvote:newUpvote})

    } catch (error) {
        console.log('Error while creating upvote',error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteUpvote = async (req,res)=>{
   try {
     const upvoteId = req.params.id
     const upvoteExist = Upvote.findById(upvoteId)
     if(!upvoteExist){
         return res.status(400).json({ success: false, message: "upvote not exist" });
     }
     await Upvote.deleteOne({"_id": upvoteId})
     res.status(200).json({success:true, message:"upvote Added Successfully"})

   } catch (error) {
    console.log('Error while deleting upvote',error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
   }
}

export { createUpvote, deleteUpvote }