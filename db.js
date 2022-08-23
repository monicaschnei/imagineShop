import mongoose from "mongoose";

const url= process.env.MONGODB_URL
console.log(url)

mongoose.connect(url);

export default mongoose;