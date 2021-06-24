function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

/** Check password requirements:
 * between 8 - 20 characters
 * at least one uppercase letter,
 * at least one lowercase letter
 * at least one number
 */
function validatePassword(password) {
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/.test(password);
}

module.exports = {
    validateEmail,
    validatePassword,
};
