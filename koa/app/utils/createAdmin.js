// this is only for dev purposes. security-wise this seems unnecessary and could be dangerous.
const argon2 = require('argon2');
const User = require('../models/User');
const crypto = require('crypto');

const generateRandomPassword = (length = 12) => {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
};

const createAdmin = async (username, email) => {
  const password = generateRandomPassword();
  try {
    const hashedPassword = await argon2.hash(password);

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      await existingUser.update({
        username,
        password: hashedPassword,
        role: 'admin',
      });

      console.log('Admin user updated successfully:');
    } else {
      await User.create({
        username,
        email,
        password: hashedPassword,
        role: 'admin',
      });

      console.log('Admin user created successfully:');
    }

    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  } catch (error) {
    console.error('Error creating/updating admin user:', error);
  }
};

(async () => {
  await createAdmin('admin', 'admin@example.com');
})();
