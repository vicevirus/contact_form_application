const Router = require('koa-router');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const secretKey = require('../config/secret');
const validatePassword = require('../utils/validatePassword');

const router = new Router();

router.get('/login', async (ctx) => {
  await ctx.render('auth/login');
});

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;

  if (!email || !password) {
    await ctx.render('auth/login', { error: 'Email and password are required.' });
    return;
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (user && (await argon2.verify(user.password, password))) {
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });

      ctx.cookies.set('auth_token', token, {
        httpOnly: true,
        maxAge: 3600000,
      });

      if (user.role === 'admin') {
        ctx.redirect('/admin/dashboard');
      } else {
        ctx.redirect('/dashboard');
      }
    } else {
      await ctx.render('auth/login', { error: 'Invalid email or password.' });
    }
  } catch (err) {
    console.error('Login error:', err);
    await ctx.render('auth/login', { error: 'Internal server error.' });
  }
});

router.get('/register', async (ctx) => {
  await ctx.render('auth/register');
});

router.post('/register', async (ctx) => {
  const { username, email, password } = ctx.request.body;

  if (!username || !email || !password) {
    await ctx.render('auth/register', {
      error: ['All fields are required.'],
      formData: { username, email },
    });
    return;
  }

  const passwordErrors = validatePassword(password);
  if (passwordErrors.length > 0) {
    await ctx.render('auth/register', {
      error: passwordErrors,
      formData: { username, email },
    });
    return;
  }

  try {
    const hashedPassword = await argon2.hash(password);

    const newUser = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, role: newUser.role },
      secretKey,
      { expiresIn: '1h' }
    );

    ctx.cookies.set('auth_token', token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    ctx.redirect('/dashboard');
  } catch (err) {
    console.error('Error registering user:', err);

    await ctx.render('auth/register', {
      error: ['An error occurred while registering. Please try again later.'],
      formData: { username, email },
    });
  }
});

router.get('/logout', async (ctx) => {
  ctx.cookies.set('auth_token', null);
  ctx.redirect('/login');
});

module.exports = router;