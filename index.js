const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const app = express();

dotenv.config();



app.use(express.json());
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Server is connected to DB");
    }
    catch (err) {
        console.log("Server is not connected to DB", err.message);
    }
}
connectDB();

app.get("/", (req, res) => {
    res.send("Hello, World! nono");
});

app.use(express.json());
app.use("/user", userRoutes);

const port = process.env.PORT || 5005;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
