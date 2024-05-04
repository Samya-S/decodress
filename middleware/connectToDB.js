import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("MongoDB connected already")
    }
    else {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("MongoDB connection began");

            const connection = mongoose.connection;

            connection.on('connected', () => {
                console.log("MongoDB connected successfully");
            })

            connection.on('error', (err) => {
                console.log('MongoDB connection error' + err);
                process.exit();
            })
        }
        catch (error) {
            console.error(error);
        }
    }
}

export default connectDB;