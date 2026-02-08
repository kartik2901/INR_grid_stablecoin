const db = require('../utils/db');

exports.getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};

exports.createUser = async (userData) => {
  const [result] = await db.query('INSERT INTO users SET ?', userData);
  return { id: result.insertId, ...userData };
};
