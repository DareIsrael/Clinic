/**
 * In-memory rate limiter for Next.js App Router API routes.
 *
 * Usage:
 *   const limiter = createRateLimiter({ windowMs: 15*60*1000, max: 5 });
 *
 *   export async function POST(request) {
 *     const ip = getClientIp(request);
 *     const check = limiter.check(ip);
 *     if (!check.allowed) {
 *       return NextResponse.json({ ... }, { status: 429 });
 *     }
 *     // ...
 *   }
 */

export function getClientIp(request) {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) return forwarded.split(',')[0].trim();
    return request.headers.get('x-real-ip') || 'unknown';
}

export function createRateLimiter({ windowMs = 15 * 60 * 1000, max = 5 } = {}) {
    const attempts = new Map();

    // Periodically clean up expired entries
    if (typeof setInterval !== 'undefined') {
        setInterval(() => {
            const now = Date.now();
            for (const [key, data] of attempts.entries()) {
                if (now - data.firstAttempt > windowMs) {
                    attempts.delete(key);
                }
            }
        }, windowMs);
    }

    return {
        /**
         * Check whether the given key is within the rate limit.
         * Each call increments the counter.
         *
         * @returns {{ allowed: boolean, remaining: number, retryAfterMinutes?: number }}
         */
        check(key) {
            const now = Date.now();

            if (!attempts.has(key)) {
                attempts.set(key, { count: 1, firstAttempt: now });
                return { allowed: true, remaining: max - 1 };
            }

            const data = attempts.get(key);

            // Window expired — reset
            if (now - data.firstAttempt > windowMs) {
                attempts.set(key, { count: 1, firstAttempt: now });
                return { allowed: true, remaining: max - 1 };
            }

            // Over limit
            if (data.count >= max) {
                const retryAfterMinutes = Math.ceil(
                    (windowMs - (now - data.firstAttempt)) / 1000 / 60
                );
                return { allowed: false, remaining: 0, retryAfterMinutes };
            }

            data.count++;
            return { allowed: true, remaining: max - data.count };
        },

        /** Reset the counter for a given key (e.g. after successful action). */
        reset(key) {
            attempts.delete(key);
        },
    };
}
