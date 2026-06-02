const championshipData = require("./championship.data");

const seedPassword = process.env.SEED_USER_PASSWORD || "123456";

module.exports = championshipData.profiles.map((profile) => ({
  name: profile.name,
  email: profile.email,
  role: profile.role,
  password: seedPassword,
}));
