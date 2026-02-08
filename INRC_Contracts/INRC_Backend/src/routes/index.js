const express = require('express');
const userController = require('../controllers/userController');
const waitlistController = require('../controllers/waitlistController');

const router = express.Router();

// User routes
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);

// Waitlist routes
router.get('/waitlist', waitlistController.getWaitlistEntries);
router.post('/waitlist', waitlistController.createWaitlistEntry);

module.exports = router;
