import { serverConfig } from './config.js';
import app from './src/app.js';
import db from './src/dbClient.js';

const PORT = serverConfig.PORT || 3000;

db.connect()
	.then(() => {
		app.listen(PORT, () => {
			console.log(
				`'Jsonbase clone' server listening on port ${PORT}`
			);
		});
	})
	.catch(err => {
		console.log(err);
	});
