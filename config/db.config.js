const mongoose = require("mongoose")

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("connect to DB"))
        .catch((error) => console.log(error))
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports = connectDB