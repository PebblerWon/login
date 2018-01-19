export default function delay(miniseconds) {
	return new Promise((resolve, reject) => {
		try {
			setTimeout(() => {
				resolve(true);
			}, miniseconds);
		} catch (e) {
			reject(false);
		}

	})
}