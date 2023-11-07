import { serverConfig } from './config.js';
import app from './src/app.js';
import db from './src/dbClient.js';

const PORT = serverConfig.PORT || 3000;

try {
	app.listen(PORT, () => {
		console.log(`API is listening on port ${PORT}`);
		db.connect();
	});
} catch (err) {
	console.log(err);
}
