import { rejects } from 'assert';
import csv from 'csv-parser';
import * as fs from 'fs';
import ip from 'ip';
import { resolve } from 'path';
import { dbFileConfig } from '../config.js';

const getCountryByIp = async clientIp => {
	try {
		if (!clientIp)
			throw {
				status: 404,
				message: `Failed to get IP`
			};

		const decimalClientIp = ip.toLong(clientIp);

		const readStream = fs
			.createReadStream(dbFileConfig.PATH)
			.pipe(csv(['start', 'end', 'a2', 'country']));

		const result = new Promise((resolve, reject) => {
			readStream
				.on('data', row => {
					if (
						decimalClientIp >= row.start &&
						decimalClientIp <= row.end
					) {
						resolve({
							country: row.country,
							a2: row.a2,
							start: ip.fromLong(row.start),
							end: ip.fromLong(row.end)
						});
					}
				})
				.on('error', err => {
					reject({
						message:
							'Error while reading the CSV file: ' + err.message
					});
				})
				.on('end', () => {
					reject({
						message: 'Something went wrong, please try again later.'
					});
				});
		});

		return result;
	} catch (err) {
		throw {
			error: err.message
		};
	}
};

export default { getCountryByIp };
