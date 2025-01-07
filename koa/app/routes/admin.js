const Router = require('koa-router');
const Contact = require('../models/Contact');
const { decrypt } = require('../utils/crypto');
const { adminOnlyMiddleware } = require('../middleware/auth');

const router = new Router();

router.use(adminOnlyMiddleware);

router.get('/admin/dashboard', async (ctx) => {
  if (ctx.state.user.role !== 'admin') {
    ctx.status = 403;
    ctx.body = 'Access denied';
    return;
  }

  await ctx.render('admin/dashboard', {
    user: ctx.state.user,
  });
});

router.get('/admin/contacts', async (ctx) => {
  if (ctx.state.user.role !== 'admin') {
    ctx.status = 403;
    ctx.body = 'Access denied';
    return;
  }

  try {
    const contacts = await Contact.findAll();
    const decryptedContacts = contacts.map((contact) => ({
      id: contact.id,
      name: decrypt(contact.name),
      email: decrypt(contact.email),
      dob: decrypt(contact.dob),
      ssn: decrypt(contact.ssn),
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
    }));

    await ctx.render('admin/contacts', {
      user: ctx.state.user,
      contacts: decryptedContacts,
    });
  } catch (err) {
    console.error('Error fetching contacts:', err);
    ctx.status = 500;
    ctx.body = 'Internal server error';
  }
});

module.exports = router;