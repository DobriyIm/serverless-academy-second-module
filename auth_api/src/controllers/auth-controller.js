import service from '../services/auth-service.js';

const signup = async (req, res) => {
	try {
		const userData = req.body;

		const serviceResult = await service.signup(userData);

		const response = {
			success: true,
			data: {
				id: serviceResult.id,
				accesToken: serviceResult.accessToken,
				refreshToken: serviceResult.refreshToken
			}
		};

		res.status(201).json(response);
	} catch (err) {
		res.status(err.status).json({
			success: false,
			error: err.message
		});
	}
};

const signin = async (req, res) => {
	try {
		const loginData = req.body;

		const serviceResult = await service.signin(loginData);

		const response = {
			success: true,
			data: {
				id: serviceResult.id,
				accesToken: serviceResult.accessToken,
				refreshToken: serviceResult.refreshToken
			}
		};

		res.status(200).json(response);
	} catch (err) {
		res.status(err.status).json({
			success: false,
			error: err.message
		});
	}
};

export default { signin, signup };
