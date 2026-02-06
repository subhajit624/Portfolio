import express from "express";
import dotenv from "dotenv";
dotenv.config({});
import cors from "cors";
import connectDB from "./db/connect.js";
import contactRoutes from "./routes/contactRoutes.js";
import skillRoutes from "./routes/skillsRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

const app = express();

app.use(cors({
  origin: `${process.env.FRONTEND_URL}`
}));

app.use(express.json());

//routes
app.use('/api/contact', contactRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certificates', certificateRoutes);

// const PORT = process.env.PORT || 5000;

connectDB();

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

export default app;   // use for versel