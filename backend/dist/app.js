"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const AppError_1 = require("./utils/AppError");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const opportunityRoutes_1 = __importDefault(require("./routes/opportunityRoutes"));
const applicationRoutes_1 = __importDefault(require("./routes/applicationRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, helmet_1.default)());
// CORS configuration - allow requests from frontend
const allowedOrigins = [
    'https://rightpool.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
].filter(Boolean); // Remove any undefined values
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        // Check if origin is in allowed list
        if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use(express_1.default.json());
// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'SkillMatch API is running!',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            auth: '/api/auth',
            opportunities: '/api/opportunities',
            applications: '/api/applications',
            dashboard: '/api/dashboard'
        },
        timestamp: new Date().toISOString()
    });
});
// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'skillmatch-backend'
    });
});
app.use('/api/auth', authRoutes_1.default);
app.use('/api/opportunities', opportunityRoutes_1.default);
app.use('/api/applications', applicationRoutes_1.default);
app.use('/api/dashboard', dashboardRoutes_1.default);
app.all('*', (req, res, next) => {
    next(new AppError_1.AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorMiddleware_1.globalErrorHandler);
//# sourceMappingURL=app.js.map