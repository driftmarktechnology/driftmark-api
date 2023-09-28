require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');

const app = express();

const route = express.Router();
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

app.use(bodyParser.json());

app.use('/v1', route);


// Default route
app.get('/', (req, res) => {
    res.send('Welcome to our Driftmark Technology!');
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
