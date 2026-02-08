const waitlistService = require('../services/waitlistService');

exports.getWaitlistEntries = async (req, res, next) => {
    try {
        const entries = await waitlistService.getAllWaitlistEntries();
        res.json({
            status: 'success',
            message: 'Waitlist entries retrieved successfully',
            data: entries
        });
    } catch (error) {
        next(error);
    }
};

exports.createWaitlistEntry = async (req, res, next) => {
    try {
        const entry = await waitlistService.createWaitlistEntry(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Waitlist entry created successfully',
            data: entry
        });
    } catch (error) {
        next(error);
    }
};
