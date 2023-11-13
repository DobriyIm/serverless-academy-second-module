import uid from 'short-unique-id';
import db from '../dbClient.js';

const uidGenerator = new uid();

const createShortLink = async (link, timeout) => {
	try {
		const shortId = uidGenerator.rnd();

		await db.setEx(shortId, timeout, link);

		return shortId;
	} catch (err) {
		console.log(err);
	}
};

const getFullLink = async shortId => {
	try {
		const link = await db.get(shortId);
		if (!link) {
			throw {
				status: 404,
				message: `Link '${shortId}' not found.`
			};
		}

		return link;
	} catch (err) {
		console.log(err);
	}
};

export default { createShortLink, getFullLink };
