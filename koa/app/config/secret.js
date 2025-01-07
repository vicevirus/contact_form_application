const crypto = require('crypto');

const secretKey = process.env.SECRET_KEY || crypto.randomBytes(32).toString('hex');

if (!process.env.SECRET_KEY) {
  console.warn(
    'No SECRET_KEY environment variable set. Using a randomly generated key. This key will not persist!'
  );
}

module.exports = secretKey;