const userModel = require('../models/userModel');

exports.getAllUsers = async () => {
  return await userModel.getAllUsers();
};

exports.createUser = async (userData) => {
  return await userModel.createUser(userData);
};
