import express from "express";
import cors, { CorsOptions } from "cors"
import dotenv from "dotenv";
import userRoutes from "./infrastructure/routes/user.routes";
import authRoutes from "./infrastructure/routes/auth.routes";

dotenv.config();
const app = express();
app.use(express.json());
const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use([userRoutes, authRoutes]);

import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
})

app.use(limiter)

export default app;