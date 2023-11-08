export const emailValidator = email => {
	const emailRegex =
		/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (!emailRegex.test(email))
		throw {
			status: 422,
			message: 'Email is not valid.'
		};
};

export const paswwordValidator = paswword => {
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

	if (!passwordRegex.test(paswword))
		throw {
			status: 422,
			message: 'Password is not valid.'
		};
};
