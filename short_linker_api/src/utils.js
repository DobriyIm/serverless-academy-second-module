import axios from 'axios';

export const checkUrl = async url => {
	try {
		await axios.head(url);
	} catch (err) {
		throw {
			status: 500,
			message: 'Incorrect url'
		};
	}
};
