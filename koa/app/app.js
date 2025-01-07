const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const views = require('@ladjs/koa-views');
const path = require('path');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const { publicMiddleware, redirectIfLoggedIn } = require('./middleware/auth');
const helmet = require('koa-helmet');

const app = new Koa();

app.use(bodyParser());


app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "cdn.jsdelivr.net"],
      styleSrc: ["'self'", "cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:"],
      fontSrc: ["'self'", "cdn.jsdelivr.net"],
    },
  })
);

app.use(
  views(path.join(__dirname, 'views'), {
    extension: 'ejs',
  })
);

// middleware tings
app.use(redirectIfLoggedIn);
app.use(publicMiddleware);

// routes
app.use(authRoutes.routes());
app.use(userRoutes.routes());
app.use(adminRoutes.routes());

sequelize.sync()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on http://0.0.0.0:3000');
});