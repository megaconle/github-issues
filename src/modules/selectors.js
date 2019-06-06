export function getSelectedRepoById(repos, id) {
	return repos.filter(repo => repo.id === id)[0];
}