import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { tokenConfig } from '../../config.js';
import db from '../dbClient.js';
import userService from './user-service.js';

const signUp = async userData => {
	try {
		const createdUser = await userService.createOne(userData);

		const payload = {
			sub: createdUser.id,
			email: createdUser.email
		};

		const accessToken = await jwt.sign(
			payload,
			tokenConfig.ACCESS_TOKEN_SECRET_KEYl,
			tokenConfig.ACCESS_TOKEN_OPTIONS
		);

		const refreshToken = await jwt.sign(
			payload,
			tokenConfig.REFRESH_TOKEN_SECRET_KEY,
			tokenConfig.REFRESH_TOKEN_OPTIONS
		);

		return { id: createdUser.id, accessToken, refreshToken };
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

const signIn = async userData => {
	try {
		const { email, password } = userData;

		const foundUser = (
			await db.query('SELECT * FROM "Users" WHERE email = $1', [
				email
			])
		).rows[0];

		if (!foundUser) {
			throw {
				status: 404,
				message: `User with email ${email} not found.`
			};
		}

		const savedPassword = foundUser.password;

		if (!(await bcrypt.compare(password, savedPassword))) {
			throw {
				status: 400,
				message: 'Incorrect password'
			};
		}

		const payload = {
			sub: foundUser.id,
			email: foundUser.email
		};

		const accessToken = await jwt.sign(
			payload,
			tokenConfig.ACCESS_TOKEN_SECRET_KEY,
			tokenConfig.ACCESS_TOKEN_OPTIONS
		);

		const refreshToken = await jwt.sign(
			payload,
			tokenConfig.REFRESH_TOKEN_SECRET_KEY,
			tokenConfig.REFRESH_TOKEN_OPTIONS
		);

		return {
			id: foundUser.id,
			accessToken,
			refreshToken
		};
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

const authenticate = async authHeader => {
	try {
		if (!authHeader) {
			throw {
				status: 401,
				message: 'Authorization header not provided'
			};
		}

		const tokenParts = authHeader.split(' ');
		if (tokenParts[0] != 'Bearer') {
			throw {
				status: 401,
				message: "Authorization scheme 'Bearer' required"
			};
		}

		const token = tokenParts[1];
		if (!token) {
			throw { status: 401, message: 'Token not provided' };
		}

		const { sub: id } = await jwt.verify(
			token,
			tokenConfig.ACCESS_TOKEN_SECRET_KEY
		);

		const foundUser = (
			await db.query('SELECT * FROM "Users" WHERE id = $1', [id])
		).rows[0];

		if (!foundUser) {
			throw {
				status: 404,
				message: `User with id '${id}' not found`
			};
		}

		return foundUser;
	} catch (err) {
		throw {
			status: err.status ?? 500,
			message: err.message ?? err
		};
	}
};

export default { signUp, signIn, authenticate };
