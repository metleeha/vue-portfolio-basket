import Api from '@/services/Api'

const BASE_URL = 'https://lab.ssafy.com/api/v4'
const TEST_URL = 'https://gitlab.com/api/v4'

export default {
	getRepos(projectID) {
		// return Api(TEST_URL).get(`/users/hackurity01/projects`)
		return Api(BASE_URL).get(`/projects/${projectID}`)
	},
	getCommits(fullName, count) {
		return Api(BASE_URL).get(`/projects/${fullName}/repository/commits?per_page=100&page=${count}`)
	},
	getMembers(projectID) {
		return Api(BASE_URL).get(`/projects/${projectID}/members`)
	}
}