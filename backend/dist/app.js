"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_1 = __importDefault(require("./routes/auth"));
const trips_1 = __importDefault(require("./routes/trips"));
const cities_1 = __importDefault(require("./routes/cities"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const public_1 = __importDefault(require("./routes/public"));
// Initialize express app
const app = (0, express_1.default)();
// Security middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
// Rate Limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);
// Logging
app.use((0, morgan_1.default)("dev"));
// Body parser
app.use(express_1.default.json());
// Routes
app.use("/api/auth", auth_1.default);
app.use("/api/trips", trips_1.default);
app.use("/api/cities", cities_1.default);
app.use("/api/dashboard", dashboard_1.default);
app.use("/api/public", public_1.default);
// Basic root route
app.get("/", (req, res) => {
    res.send("Welcome to the GlobleTrotter/Tripora API! The server is running successfully.");
});
// Basic health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});
// Centralized error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
});
exports.default = app;
