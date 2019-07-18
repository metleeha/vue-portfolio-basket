import axios from 'axios'

export default (baseURL) => {
	return axios.create({
		baseURL: baseURL,
		withCredentials: false,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			// 'Private-Token':'YyQhY6amWnc3F4supCjH',	// gitlab
			'Private-Token':'jKzAYJGDh78mssL8Cjzj '	// ssafy.git
		}
	})
}