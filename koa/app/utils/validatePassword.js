const validatePassword = (password) => {
    const errors = [];
  
    if (!password || typeof password !== 'string') {
      errors.push('Password is required and must be a string.');
      return errors;
    }
  
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must include at least one uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must include at least one lowercase letter.');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must include at least one number.');
    }
    if (!/[@$!%*?&#]/.test(password)) {
      errors.push('Password must include at least one special character.');
    }
  
    return errors;
  };
  
  module.exports = validatePassword;