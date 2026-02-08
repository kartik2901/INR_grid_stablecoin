const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

app.use(cors());


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Server is healthy' });
});

// Routes
app.use('/api', routes);

// Error Handling Middleware
app.use(errorHandler);

// Logger for uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection:', reason);
});

module.exports = app;
