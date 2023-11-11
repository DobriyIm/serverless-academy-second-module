export const serverConfig = {
	PORT: 3000
};

export const dbConfig = {
	CONNECTION_STRING: '....'
};

export const tokenConfig = {
	ACCESS_TOKEN_OPTIONS: {
		expiresIn: '1h'
	},
	REFRESH_TOKEN_OPTIONS: {
		expiresIn: 0
	},
	ACCESS_TOKEN_SECRET_KEY: 'accesssecretkey',
	REFRESH_TOKEN_SECRET_KEY: 'refreshsecretkey'
};
