"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    // Always log errors for debugging
    console.error('Error Details:', {
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode,
        path: req.path,
        method: req.method,
        query: req.query,
    });
    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
    else {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
        else {
            res.status(500).json({
                status: 'error',
                message: 'Something went very wrong!',
            });
        }
    }
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=errorMiddleware.js.map