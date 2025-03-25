import express from "express";
import cors, { CorsOptions } from "cors"
import dotenv from "dotenv";
import userRoutes from "./infrastructure/routes/user.routes";
import authRoutes from "./infrastructure/routes/auth.routes";
import orderRoutes from "./infrastructure/routes/order.routes";

dotenv.config();
const app = express();
app.use(express.json());
const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use([userRoutes, authRoutes, orderRoutes]);

export default app;