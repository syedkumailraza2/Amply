import mongoose, {Schema} from "mongoose";

const UpvoteSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique:true},
    streamId: { type: Schema.Types.ObjectId, ref: "Stream", required: true, unique:true },
  });

const Upvote = mongoose.model('Upvote',UpvoteSchema)
export default Upvote
