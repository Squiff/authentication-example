/** check string contains uppercase */
export function containsUppercase(testString) {
    return /[A-Z]/.test(testString);
}

/** check string contains lowercase */
export function containsLowercase(testString) {
    return /[a-z]/.test(testString);
}

/** check string contains number */
export function containsNumber(testString) {
    return /\d/.test(testString);
}

/** if invalid, returns validation text, else returns null */
export function validatePassword(password) {
    if (password.length < 8 || password.length > 20)
        return 'password should be between 8 and 20 characters';
    if (containsUppercase(password) === false)
        return 'Password does not contain an uppercase letter';
    if (containsLowercase(password) === false)
        return 'Password does not contain a lowercase letter';
    if (containsNumber(password) === false) return 'Password does not contain a number';

    return null;
}

/** Basic validation test for _@_._ format */
export function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
