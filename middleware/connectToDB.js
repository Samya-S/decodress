import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("MongoDB connected already")
        return true;//
    }
    else {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("MongoDB connection began");

            const connection = mongoose.connection;

            connection.on('connected', () => {
                console.log("MongoDB connected successfully");
                return true;//
            })

            connection.on('error', (err) => {
                console.log('MongoDB connection error' + err);
                // process.exit();//
                return false;//
            })
        }
        catch (error) {
            console.error(error);
            return false;//
        }
    }
}

export default connectDB;