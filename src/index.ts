import express from "express";
import { Database } from "@infrastructure/config/Database";
import userRoutes from "@presentation/routes/userRoutes";
import dotenv from "dotenv";
import contactRoutes from "@presentation/routes/contactRoutes";

dotenv.config();

Database.getConnection();
console.log("Iniciando banco de dados");

const app = express();
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", contactRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Application is running on port ${PORT}`));
