const { hashPassword, comparePassword } = require('../utils/password');
const User = require('../models/User');
const { validateEmail, validatePassword } = require('../utils/validation');

// validate email: front end and backend
// validate password: front end and back end
async function register(req, res, next) {
    const email = req.body?.email;
    const password = req.body?.password;

    // check email and password
    if (validateEmail(email) === false)
        return res.status(400).json({ message: 'Invalid Email Address' });
    if (validatePassword(password) === false)
        return res.status(400).json({ message: 'Password requirements not met' });

    // check if user already exists (may choose not to expose this and send a generic response)
    const userCheck = await User.findOne({ email });
    if (userCheck) return res.status(400).json({ message: 'User Already Exists' });

    const hashedPassword = await hashPassword(password);

    // create user record
    try {
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        res.json({ email: savedUser.email });
    } catch (error) {
        next(error); // pass to default error handler
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: 'invalid email or password' });

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ message: 'invalid email or password' });

    // SUCCESS! add user session.
    req.session.user = user._id;
    res.json({ email: user.email });
}

function logout(req, res) {
    req.session.user = undefined;
    res.json({ success: true });
}

async function profile(req, res) {
    const { user } = req.session;
    const userDB = await User.findById(user);

    if (!userDB) return res.status(401).end();

    res.json({ email: userDB.email });
}

// TODO: Bulk handle rejected promises here
module.exports = { register, login, logout, profile };
