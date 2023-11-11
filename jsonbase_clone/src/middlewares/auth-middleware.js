import authService from '../services/auth-service.js';

const authenticate = async (req, res, next) => {
	try {
		req.user = await authService.authenticate(
			req.get('Authorization')
		);

		next();
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export default { authenticate };
