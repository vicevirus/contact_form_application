const Router = require('koa-router');
const Contact = require('../models/Contact');
const router = new Router();
const validateContactForm = require('../utils/validateContactForm');
const { userOnlyMiddleware } = require('../middleware/auth');

router.use(userOnlyMiddleware);

router.get('/dashboard', async (ctx) => {
  await ctx.render('user/dashboard', {
    user: ctx.state.user,
  });
});

router.get('/contact-form', async (ctx) => {
  await ctx.render('user/contact-form', {
    user: ctx.state.user,
  });
});

router.post('/contact-form', async (ctx) => {
  const { name, email, dob, ssn } = ctx.request.body;

  const errors = validateContactForm({ name, email, dob, ssn });
  if (errors.length > 0) {
    await ctx.render('user/contact-form', {
      user: ctx.state.user,
      error: errors.join('<br>'),
    });
    return;
  }

  try {
    await Contact.create({ name, email, dob, ssn });

    await ctx.render('user/dashboard', {
      user: ctx.state.user,
      success: 'Contact form successfully submitted!',
    });
  } catch (err) {
    console.error('Error saving contact:', err);
    await ctx.render('user/contact-form', {
      user: ctx.state.user,
      error: 'Failed to save contact. Please try again later.',
    });
  }
});


module.exports = router;
