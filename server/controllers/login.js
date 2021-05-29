const { hashPassword, validatePassword } = require('../utils/password');
const User = require('../models/User');

async function register(req, res) {
    const password = await hashPassword(req.body.password);
    const email = req.body.email;

    // check if user already exists
    const userCheck = await User.findOne({ email });
    if (userCheck) return res.status(400).json({ message: 'User Already Exists' });

    // create user record
    const newUser = new User({
        email: req.body.email,
        password: password,
    });

    const savedUser = await newUser.save();
    res.json({ email: savedUser.email });
}

async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: 'invalid email or password' });

    const isPasswordValid = await validatePassword(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ message: 'invalid email or password' });

    // SUCCESS! Write user to session and write 200 response
    // create a user session - or add to session if already exists
    req.session.user = user._id;
    res.json({ email: user.email });
}

function logout(req, res) {
    req.session.user = undefined;
    res.end();
}

async function profile(req, res) {
    const { user } = req.session;
    const userDB = await User.findById(user);

    if (!userDB) return res.status(401).end();

    res.json({ email: userDB.email });
}

// TODO: Bulk handle rejected promises here
module.exports = { register, login, logout, profile };
