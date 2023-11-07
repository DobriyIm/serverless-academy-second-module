export const serverConfig = {
	PORT: 3000
};

export const dbConfig = {
	connectionString: '......'
};

export const tokensConfig = {
	ACCESS_TOKEN_OPTIONS: {
		expiresIn: '1m'
	},
	REFRESH_TOKEN_OPTIONS: {
		expiresIn: 0
	},
	ACCESS_TOKEN_SECRET_KEY: 'access-secret-key',
	REFRESH_TOKEN_SECRET_KEY: 'refresh-secret-key'
};
