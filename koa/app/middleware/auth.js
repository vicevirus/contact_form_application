const jwt = require('jsonwebtoken');
const secretKey = require('../config/secret');

// Middleware to handle authenticated routes
const authMiddleware = async (ctx, next) => {
    const token = ctx.cookies.get('auth_token');
    if (!token) {
        ctx.redirect('/login');
        return;
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        ctx.state.user = decoded;

        // Check if token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
            console.error('Token expired');
            ctx.cookies.set('auth_token', null);
            ctx.redirect('/login');
            return;
        }

        await next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            console.error('Token expired:', err);
            ctx.cookies.set('auth_token', null);
            ctx.redirect('/login');
        } else {
            console.error('JWT verification failed:', err);
            ctx.redirect('/login');
        }
    }
};

// Middleware for public routes
const publicRoutes = ['/login', '/register'];
const publicMiddleware = async (ctx, next) => {
    if (publicRoutes.includes(ctx.path)) {
        await next();
        return;
    }
    await authMiddleware(ctx, next);
};

// Middleware to redirect logged-in users accessing the root route
const redirectIfLoggedIn = async (ctx, next) => {
    if (ctx.path === '/') {
        const token = ctx.cookies.get('auth_token');
        if (token) {
            try {
                const decoded = jwt.verify(token, secretKey);

                if (decoded.role === 'admin') {
                    ctx.redirect('/admin/dashboard');
                } else {
                    ctx.redirect('/dashboard');
                }
                return;
            } catch (err) {
                if (err.name === 'TokenExpiredError') {
                    console.error('Token expired:', err);
                    ctx.cookies.set('auth_token', null);
                } else {
                    console.error('JWT verification failed:', err);
                }
            }
        }
    }
    await next();
};

// Middleware to verify token and user role
const roleMiddleware = (allowedRoles) => {
    return async (ctx, next) => {
        const token = ctx.cookies.get('auth_token');

        if (!token) {
            console.error('No token found. Redirecting to login.');
            ctx.redirect('/login');
            return;
        }

        try {
            const decoded = jwt.verify(token, secretKey);

            if (!allowedRoles.includes(decoded.role)) {
                console.error(`Unauthorized access: ${decoded.role} role tried to access restricted route`);
                ctx.redirect(decoded.role === 'admin' ? '/admin/dashboard' : '/dashboard');
                return;
            }

            ctx.state.user = decoded;
            await next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                console.error('Token expired:', err);
                ctx.cookies.set('auth_token', null);
            } else {
                console.error('JWT verification failed:', err);
            }
            ctx.redirect('/login');
        }
    };
};

// User-only middleware
const userOnlyMiddleware = roleMiddleware(['user']);

// Admin-only middleware
const adminOnlyMiddleware = roleMiddleware(['admin']);

module.exports = {
    userOnlyMiddleware,
    adminOnlyMiddleware,
    authMiddleware,
    publicMiddleware,
    redirectIfLoggedIn,
};
