const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Sai abhiram',
    email: 'saiabhiram1928@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'test',
    email: 'test@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

module.exports = users
