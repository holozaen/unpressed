const { PasswordAuthStrategy } = require('@keystonejs/auth-password');

module.exports = {
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'email', // default: 'email'
    secretField: 'password', // default: 'password'
  },
};
