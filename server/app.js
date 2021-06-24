const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./db');
const login = require('./routes/login');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

// set environment variables
dotenv.config();

// Session config
const mongoStore = MongoStore.create({
    mongoUrl: process.env.DB_CONN,
    collectionName: 'sessions',
});

const session = expressSession({
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    store: mongoStore,
    resave: false,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
});

app.use(session);

// Authentication middleware
function isAuthenticated(req, res, next) {
    const { user } = req.session;
    if (!user) return res.status(401).json({ message: 'login required' });

    next();
}

// Middlewares
app.use(express.json());

// app.use((req, res, next) => {
//     console.log(req.method, req.url);
//     if (req.body) console.log(req.body);
//     // if (req.headers['cookie']) console.log(req.headers['cookie']);
//     next();
// });

// Routes
app.use('/api', login);

app.use('/api/protected', isAuthenticated, (req, res) => {
    res.json({ message: 'successfully accessed protected route' });
});

// Startup
const port = process.env.PORT || 5000;

connectDB(); // connect to DB

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
