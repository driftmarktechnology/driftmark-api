const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const sendMail = require('../services/mail.service');

router.post('/save', async (req, res) => {
    try {
        let user = new User(req.body);
        await user.save();

        // Send email after saving data
        sendMail(user.email, 'Data Saved Successfully', 'Your data has been saved successfully to our database.');
        
        res.send('Data saved and email sent successfully.');
    } catch (err) {
        res.status(500).send('Error saving data.');
    }
});

module.exports = router;
