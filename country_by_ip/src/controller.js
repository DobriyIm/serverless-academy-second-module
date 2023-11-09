import service from './service.js';

const getCountryByIp = async (req, res) => {
	try {
		const clientIp =
			req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		const result = await service.getCountryByIp(clientIp);

		const response = {
			'Client IP': clientIp,
			'Country A2 code': result.a2,
			Country: result.country,
			'IP range': {
				start: result.start,
				end: result.end
			}
		};

		res.status(201).json(response);
	} catch (err) {
		res.status(err.status || 500).json({
			error: err.message
		});
	}
};

export default { getCountryByIp };
