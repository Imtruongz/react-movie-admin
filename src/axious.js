import axios from 'axios';

const instance = axios.create({
	baseURL: `http://localhost:8080`,
	withCredentials: true,
});

instance.interceptors.response.use(
	(response) => {
		// const { data } = response
		return response.data;
	},
	(err) => {
		const status = err.response?.status || 500;
		switch (status) {
			// authentication (token related issues)
			case 401: {
				// return Promise.reject(new APIError(err.message, 409));
			}

			// forbidden (permission related issues)
			case 403: {
				// return Promise.reject(new APIError(err.message, 409));
			}

			// bad request
			case 400: {
				// return Promise.reject(new APIError(err.message, 400));
			}

			// not found
			case 404: {
				// return Promise.reject(new APIError(err.message, 404));
			}

			// conflict
			case 409: {
				// return Promise.reject(new APIError(err.message, 409));
			}

			// unprocessable
			case 422: {
				// return Promise.reject(new APIError(err.message, 422));
			}

			// generic api error (server related) unexpected
			default: {
				// return Promise.reject(new APIError(err.message, 500));
			}
		}
	}
);

export default instance;
