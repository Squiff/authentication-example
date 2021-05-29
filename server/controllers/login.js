const { hashPassword, validatePassword } = require('../utils/password');
const User = require('../models/User');

// TODO: Add password requirements
async function register(req, res) {
    const password = await hashPassword(req.body.password);
    const email = req.body.email;

    // does user exist
    const u = await User.findOne({ email });

    if (u) return res.status(400).json({ message: 'User Already Exists' });

    const newUser = new User({
        email: req.body.email,
        password: password,
    });

    await newUser.save();

    res.json({ success: true });
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
