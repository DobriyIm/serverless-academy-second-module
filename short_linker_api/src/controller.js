import pm from 'pretty-ms';
import config from '../config.js';
import service from './service.js';
import { checkUrl } from './utils.js';

const createShortLink = async (req, res) => {
	try {
		const { url } = req.body;

		await checkUrl(url);

		const urlTimeout = config.LINK_TIMEOUT;
		const serviceResult = await service.createShortLink(
			url,
			urlTimeout
		);

		const shortUrl = `${req.protocol}://${req.get(
			'host'
		)}/${serviceResult}`;
		const timeoutStr = pm(urlTimeout);

		const response = {
			success: true,
			data: {
				link: shortUrl,
				timeout: timeoutStr
			}
		};

		res.status(201).json(response);
	} catch (err) {
		res.status(err.status || 500).json({
			success: false,
			error: err.message
		});
	}
};

const redirect = async (req, res) => {
	try {
		const shortId = req.params[0];

		const url = await service.getFullLink(shortId);

		res.redirect(302, url);
	} catch (err) {
		res.status(err.status || 500).json({
			success: false,
			error: err.message
		});
	}
};

export default { createShortLink, redirect };
