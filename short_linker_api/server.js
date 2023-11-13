import config from './config.js';
import db from './dbClient.js';
import app from './src/app.js';

const PORT = config.SERVER_PORT || 3000;

db.connect()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`'ShortLinker API' listening on port ${PORT}`);
		});
	})
	.catch(err => {
		console.log(err);
	});
