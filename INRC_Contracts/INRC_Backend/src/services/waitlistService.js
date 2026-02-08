const Waitlist = require('../models/waitlistModel');

exports.getAllWaitlistEntries = async () => {
    return await Waitlist.findAll();
};

exports.createWaitlistEntry = async (entryData) => {
    return await Waitlist.create(entryData);
};
