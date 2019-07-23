import axios from 'axios'
var token = require('../../ignore/ssafylabAPI.json')

export default (baseURL) => {
	return axios.create({
		baseURL: baseURL,
		withCredentials: false,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Private-Token':token.ssafylabPrivateToken	// ssafy.git
		}
	})
}