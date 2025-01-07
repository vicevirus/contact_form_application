const validateContactForm = ({ name, email, dob, ssn }) => {
    const errors = [];
  
    if (!name || typeof name !== 'string' || name.length < 3) {
      errors.push('Name must be at least 3 characters long.');
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push('Invalid email format.');
    }
  
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    if (!dob || !dobRegex.test(dob)) {
      errors.push('Date of Birth must be in YYYY-MM-DD format.');
    }
  
    const ssnRegex = /^\d{9}$/; // 9 digits only
    if (!ssn || !ssnRegex.test(ssn)) {
      errors.push('SSN must be exactly 9 digits.');
    }
  
    return errors;
  };
  
  module.exports = validateContactForm;
  