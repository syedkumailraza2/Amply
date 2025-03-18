import mongoose, {Schema} from "mongoose";

const userSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true, unique:true },
    password:{ type: String, required: true },
    streams: [{ type: Schema.Types.ObjectId, ref: "Stream" }],
    upvotes: [{ type: Schema.Types.ObjectId, ref: "Upvote" }],
})

const User = mongoose.model('User',userSchema)
export default User