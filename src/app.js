require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
// const userRoutes = require('./routes/user.routes');
const {ContactUs, contactUsValidationSchema} = require('./models/contactus.model');
const cors = require('cors');

const app = express();

const route = express.Router();
const port = process.env.PORT || 3001;

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

app.use(express.json());
app.use(cors());


app.post('/send', (req,res) =>{
    const { error } = contactUsValidationSchema.validate(req.body);

    if(error){
        console.log('Validation Error:', error);
        const errorDetails = error.details.map((err)=>{
            return{
                message: err.message,
                field: err.path[0],
            }
        });
        return res.status(400).json({error: errorDetails});
    }

    const {name, email, subject, message} = req.body;
    ContactUs.create({
        name: name,
        email: email,
        subject: subject,
        message: message
    })
    .then(result => {
        console.log("Message saved successfully:", result);
        res.json(result)
    })
    .catch(err => {
        console.error("Error saving message:", err);
        res.status(500).json(err);
    })
})


// app.use('/user', userRoutes);


app.listen(3001, () => {
    console.log(`Server listening on port 3001`);
});
