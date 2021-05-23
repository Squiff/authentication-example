const mongoose = require('mongoose');

// establish mongo db connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log(`Database Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = { connectDB };
