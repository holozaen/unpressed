require('dotenv').config()

module.exports = {
  User: [
    {
      name: process.env.APP_ADMIN_NAME,
      state: 'active',
      isAdmin: true,
      email: process.env.APP_ADMIN_EMAIL,
      password: process.env.APP_ADMIN_PASSWORD
    }
  ]
}
