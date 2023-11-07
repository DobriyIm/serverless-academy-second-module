import bcrypt from 'bcrypt';
import db from '../dbClient.js';

const createOne = async userData => {
	try {
		const { email } = userData;

		const existingUser = await db.query(
			`SELECT * FROM "Users" WHERE email = $1`,
			[email]
		);

		if (existingUser.rowCount !== 0) {
			throw {
				status: 409,
				message: `User with email '${email}' already exists`
			};
		}

		const hashedPassword = await bcrypt.hash(userData.password, 10);

		const result = await db.query(
			`INSERT INTO "Users" (email, password) VALUES ($1, $2) RETURNING *`,
			[userData.email, hashedPassword]
		);

		return result.rows[0];
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

export default { createOne };
