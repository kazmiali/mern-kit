const express = require('express');
const connectDB = require('./config/db');
const enforce = require('express-sslify');
const compression = require('compression');
const path = require('path');

const app = express();

connectDB();

app.use(express.json({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(compression());
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
