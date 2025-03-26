import express from "express";
import cors, { CorsOptions } from "cors"
import dotenv from "dotenv";
import userRoutes from "./infrastructure/routes/user.routes";
import authRoutes from "./infrastructure/routes/auth.routes";
import helmet from 'helmet';
const xss = require("xss-clean"); // Evita el error de TypeScript

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
app.use(helmet({
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
}));
app.use(xss());


export default app;