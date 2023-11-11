import authService from '../services/auth-service.js';

const signUp = async (req, res) => {
	try {
		const userData = req.body;

		const serviceResult = await authService.signUp(userData);

		const response = {
			success: true,
			data: {
				id: serviceResult.id,
				accessToken: serviceResult.accessToken,
				refreshToken: serviceResult.refreshToken
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

const signIn = async (req, res) => {
	try {
		const loginData = req.body;

		const serviceResult = await authService.signIn(loginData);

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
		res.status(err.status || 500).json({
			success: false,
			error: err.message
		});
	}
};

export default { signUp, signIn };
