import fileService from '../services/file-service.js';

const createOne = async (req, res) => {
	try {
		const fileContent = req.body;
		const filePath = req.params[0];
		const currentUser = req.user;

		const fileData = {
			userId: currentUser.id,
			filePath: filePath,
			fileContent: fileContent
		};

		const serviceResult = await fileService.createOne(fileData);

		const response = {
			saccess: true,
			data: {
				fileId: serviceResult.id,
				userId: serviceResult.user_id,
				filePath: serviceResult.file_path
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

const getOne = async (req, res) => {
	try {
		const filePath = req.params[0];
		const currentUser = req.user;

		const fileData = {
			userId: currentUser.id,
			filePath: filePath
		};

		const serviceResult = await fileService.getOne(fileData);

		const response = {
			saccess: true,
			data: {
				fileId: serviceResult.id,
				userId: serviceResult.user_id,
				filePath: serviceResult.file_path,
				fileContent: serviceResult.file_content
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

export default { createOne, getOne };
