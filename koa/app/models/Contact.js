const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { encrypt, decrypt } = require('../utils/crypto');
const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dob: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ssn: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Contact.addHook('beforeCreate', (contact) => {
  if (contact.name) contact.name = encrypt(contact.name);
  if (contact.email) contact.email = encrypt(contact.email); 
  if (contact.dob) contact.dob = encrypt(contact.dob); 
  if (contact.ssn) contact.ssn = encrypt(contact.ssn);
});

Contact.addHook('beforeUpdate', (contact) => {
  if (contact.changed('name')) contact.name = encrypt(contact.name);
  if (contact.changed('email')) contact.email = encrypt(contact.email);
  if (contact.changed('dob')) contact.dob = encrypt(contact.dob);
  if (contact.changed('ssn')) contact.ssn = encrypt(contact.ssn);
});

Contact.addHook('afterFind', (result) => {
    if (!result) return;

    const decryptFields = (contact) => {
        if (contact.name && contact.name.includes(':')) {
            contact.name = decrypt(contact.name);
        }
        if (contact.email && contact.email.includes(':')) {
            contact.email = decrypt(contact.email);
        }
        if (contact.dob && contact.dob.includes(':')) {
            contact.dob = decrypt(contact.dob);
        }
        if (contact.ssn && contact.ssn.includes(':')) {
            contact.ssn = decrypt(contact.ssn);
        }
    };

    if (Array.isArray(result)) {
        result.forEach((contact) => decryptFields(contact));
    } else {
        decryptFields(result);
    }
});

module.exports = Contact;