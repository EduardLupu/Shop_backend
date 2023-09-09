import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour'
});

export default rateLimiter;

