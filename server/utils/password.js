const bcrypt = require('bcrypt');

// note: bcrypt stores the salt along with the hash
// output: [[bcrypt version]][[SALT ROUNDS]][[SALT]][[HASH]]
// OUTPUT: $2b$10$3euPcmQFCiblsZeEu5s7p.9OVHgeHWFDk9nhMqZ0m/3pd/lhwZgES

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(submittedPassword, hash) {
    return await bcrypt.compare(submittedPassword, hash);
}

module.exports = {
    hashPassword,
    comparePassword,
};
