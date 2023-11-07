const getOne = async (req, res) => {
	try {
		const currentUser = req.user;

		const response = {
			success: true,
			data: {
				id: currentUser.id,
				email: currentUser.email
			}
		};

		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export default { getOne };
