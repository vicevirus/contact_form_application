const crypto = require('crypto');
const secretKey = require('../config/secret');

const IV_LENGTH = 16;

const key = crypto.createHash('sha256').update(secretKey).digest();

// Encrypt function
const encrypt = (text) => {
    if (!text || typeof text !== 'string') {
        throw new TypeError('Invalid input for encryption');
    }

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};

// Decrypt function
const decrypt = (encryptedText) => {
    if (!encryptedText || typeof encryptedText !== 'string') {
        throw new TypeError('Invalid input for decryption');
    }

    const parts = encryptedText.split(':');
    if (parts.length !== 2) {
        console.warn(`Skipping decryption for non-encrypted input: ${encryptedText}`);
        return encryptedText;
    }

    const [ivHex, encrypted] = parts;
    const iv = Buffer.from(ivHex, 'hex');

    if (iv.length !== IV_LENGTH) {
        throw new Error('Invalid initialization vector length');
    }

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = { encrypt, decrypt };