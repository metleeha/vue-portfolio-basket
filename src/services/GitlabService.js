import Api from '@/services/Api'

const BASE_URL = 'https://lab.ssafy.com/api/v4'
const TEST_URL = 'https://gitlab.com/api/v4'

export default {
	getRepos(projectID) {
		// return Api(TEST_URL).get(`/users/hackurity01/projects`)
		return Api(BASE_URL).get(`/projects/${projectID}`)
	},
	getCommits(fullName) {
		let d = new Date()
		d.setMonth(d.getMonth()-1)

		return Api(BASE_URL).get(`/projects/${fullName}/repository/commits?since=${d.toISOString()}&per_page=9999&ref_name=dev&page=1`)
	},
	getMembers(projectID) {
		return Api(BASE_URL).get(`/projects/${projectID}/members`)
	}
}