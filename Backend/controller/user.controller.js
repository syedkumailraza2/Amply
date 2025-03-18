import User from "../model/user.model.js"
import bcrypt from "bcrypt"

const signup = async(req,res)=>{
    try {
        const { name, email, password } = req.body
        if(!name){
            return res.status(400).json({ success: false, message: "Name is Required" });
        }
        if(!email){
            return res.status(400).json({ success: false, message: "Email is Required" });
        }
    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ success: false, message: "Email already in use" });
        }
    
        const hashedPassword = await bcrypt.hash(password,10)
    
        const newUser = new User ({
            name,
            email,
            password:hashedPassword
        })
    
        const savedUser = await newUser.save();
    
        res.status(200).json({success:true, message:"User Created Successfully",user:savedUser})
        
    } catch (error) {
        console.log('Error while Signup',error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        
    }
}

const login = async(req,res)=>{
    try {
        const { email, password } = req.body

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          return res.status(400).json({ success: false, message: "User not exist" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid credentials" });
        }

        res.status(200).json({success:true, message:"User Logged In Successfully",user:existingUser})

    } catch (error) {
        console.log('Error while Login',error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        
    }
}

export { signup, login }