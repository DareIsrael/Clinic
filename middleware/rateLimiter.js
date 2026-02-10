/**
 * Rate Limiting Middleware
 * Prevents brute force attacks on authentication endpoints
 */

import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for login attempts
 * Limits: 3 attempts per 15 minutes per IP address
 */
export const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Limit each IP to 3 login attempts per windowMs
    message: {
        success: false,
        message: 'Too many login attempts. Please try again later.',
        retryAfter: '15 minutes'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skipSuccessfulRequests: true, // Don't count successful login attempts
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'Too many login attempts from this IP. Please try again later.',
            retryAfter: Math.ceil(req.rateLimit.resetTime / 1000 / 60) + ' minutes'
        });
    }
});

/**
 * General API rate limiter
 * Limits: 100 requests per 15 minutes per IP address
 */
export const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests from this IP. Please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'Too many requests. Please slow down and try again later.'
        });
    }
});

/**
 * Strict rate limiter for appointment booking
 * Limits: 5 bookings per hour per IP address
 */
export const bookingRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 bookings per hour
    message: {
        success: false,
        message: 'Too many booking attempts. Please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'You have exceeded the maximum number of booking attempts. Please try again in 1 hour.'
        });
    }
});
