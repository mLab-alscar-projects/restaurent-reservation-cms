import dotenv from "dotenv";

// MIDDLEWARES
import express from "express";
import cors from "cors";
// import router from "./Routes/api.js";

// DB
import connectDB from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 7000;

dotenv.config();
app.use(cors());
app.use(express.json());
// app.use("/api/v1", router);

// Global error handler
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: "An unexpected error occurred!" });
// });

connectDB();

app.listen(PORT, () => console.log(`Server started on PORT  ${PORT}`));