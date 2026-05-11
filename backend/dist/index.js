"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const db_1 = require("./config/db");
const renderKeepAlive_1 = require("./utils/renderKeepAlive");
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION!  Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
(0, db_1.connectDB)();
const port = process.env.PORT || 5000;
const server = app_1.app.listen(port, () => {
    console.log(`App running on port ${port}...`);
    (0, renderKeepAlive_1.startRenderKeepAlive)();
});
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION!  Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=index.js.map