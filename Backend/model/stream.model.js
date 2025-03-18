import mongoose, {Schema} from "mongoose";

const StreamSchema = new mongoose.Schema({
    url: { type: String, required: true },
    active: { type: Boolean, default: true },
    upvotes: [{ type: Schema.Types.ObjectId, ref: "Upvote" }],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  });

const Stream = mongoose.model("Stream", StreamSchema);
export default Stream