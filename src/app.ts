import express from "express";
import cors, { CorsOptions } from "cors"
import dotenv from "dotenv";
import userRoutes from "./infrastructure/routes/user.routes";
import authRoutes from "./infrastructure/routes/auth.routes";
import orderRoutes from "./infrastructure/routes/order.routes";
import { errorHandler } from "./infrastructure/middleware/errorHandler.middleware";
import helmet, { HelmetOptions } from 'helmet';
import { rateLimit } from 'express-rate-limit'
const xss = require("xss-clean"); // Evita el error de TypeScript

dotenv.config();
const app = express();

app.use(express.json());
const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
})

const helmetOptions: HelmetOptions = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://trusted.cdn.com"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
    referrerPolicy: { policy: "no-referrer" },
    frameguard: { action: "deny" },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    noSniff: true,
    xssFilter: true,
}

app.use(cors(corsOptions));
app.use([userRoutes, authRoutes, orderRoutes]);
app.use(errorHandler);
app.use(helmet(helmetOptions));
app.use(xss());
app.use(limiter)

export default app;