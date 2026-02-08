const app = require('./app');
const config = require('./config/config');
const logger = require('./utils/logger');
const sequelize = require('./utils/sequelize');

const startServer = async () => {
	try {
		await sequelize.sync({ force: true });
		logger.info('Database synchronized');
		app.listen(config.port, () => {
			logger.info(`Server is running on port ${config.port}`);
		});
	} catch (error) {
		logger.error('Unable to connect to the database:', error);
	}
};

startServer();
