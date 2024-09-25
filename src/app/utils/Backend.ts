import axios, { AxiosInstance } from "axios";
import { endpoints } from "../helpers/constants";

const axiosInstance:AxiosInstance =  axios.create({
    baseURL: 'https://openlibrary.org',
    headers: {
	  'Content-Type': 'application/json',
    }
  });
/**
 * @description Backend class to handle all the backend calls using the FetchHelper
 */
export default class Backend {
	/**
	 * @description Being used in useEffect to prevent request from being executed twice in case state update trigerring. Also cancels request when user leaves the page.
	 * @param endpoint - The endpoint to call
	 * @param method - The method to use
	 * @param body - The body to send, for POST and PATCH (MUST BE Present or empty object {})
	 * @param backend - The axios instande to use
	 * @returns a promise and a cancel function
	 */
	private static cancellableRequest(backend: AxiosInstance, endpoint: string, method: string, body: object = {}) {
		const token = axios.CancelToken.source();

		if (method === "GET") {
			return {
				promise: backend.get(endpoint, { cancelToken: token.token }),
				cancel: token.cancel
			};
		}
		else { //added the option for POST and PATCH, they are not used but could be useful in the future
			const fetchMethod = method === "POST" ? backend.post : backend.patch;

			return {
				promise: fetchMethod(endpoint, body, { cancelToken: token.token }),
				cancel: token.cancel
			};
		}
	}

		/**
	 * @description - Get books by passing a parameter and a value to the API
	 * @param parameterKey - The key to pass as a search parameter
	 * @param parameterValue - The value to search for
	 */
		static getBooks(parameterKey: string, parameterValue: string) {
			return this.cancellableRequest(axiosInstance, `${endpoints.searchBooks}?${parameterKey}=${parameterValue}&limit=10`, "GET");
		}

		


}
