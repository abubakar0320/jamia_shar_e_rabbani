const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function seedAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB for admin seeding...');

  const defaultUsername = 'ahmad';
  const defaultPassword = '2004@2003@';

  const existingUser = await User.findOne({ username: defaultUsername });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    const user = await User.create({
      username: defaultUsername,
      password: hashedPassword,
      name: 'Muhammad Ahmad',
      role: 'Principal'
    });
    console.log(`Created default secure admin user: ${user.username} (password encrypted with bcrypt)`);
  } else {
    console.log(`Admin user '${existingUser.username}' already exists.`);
  }

  await mongoose.disconnect();
}

seedAdmin().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
