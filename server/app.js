const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.all('*', (req, res) => {
    res.send('RUNNING');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
