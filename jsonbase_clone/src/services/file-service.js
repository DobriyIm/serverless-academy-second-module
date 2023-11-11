import db from '../dbClient.js';

const createOne = async fileData => {
	try {
		const { userId, filePath, fileContent } = fileData;

		const foundUser = await db.query(
			'SELECT * FROM "Users" WHERE id = $1',
			[userId]
		);

		if (!foundUser) {
			throw {
				status: 404,
				message: `User with id ${userId} not found.`
			};
		}

		const existingFile = await db.query(
			'SELECT * FROM "Files" WHERE user_id = $1 AND file_path = $2',
			[userId, filePath]
		);

		if (existingFile.rowCount !== 0) {
			throw {
				status: 409,
				message: `A file already exists in the path '${filePath}'`
			};
		}

		const result = await db.query(
			'INSERT INTO "Files" (user_id, file_path, file_content) VALUES ($1, $2, $3) RETURNING *',
			[userId, filePath, fileContent]
		);

		return result.rows[0];
	} catch (err) {
		console.error('file-service ERROR:', err);

		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

const getOne = async fileData => {
	try {
		const { userId, filePath } = fileData;

		const result = await db.query(
			'SELECT * FROM "Files" WHERE user_id = $1 AND file_path = $2',
			[userId, filePath]
		);

		if (result.rows.length === 0) {
			throw {
				status: 404,
				message: 'File not found.'
			};
		}

		return result.rows[0];
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

export default { createOne, getOne };
