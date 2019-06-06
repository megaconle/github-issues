// Selectors
// Shared functions to get specific data from state

export function getSelectedRepoById(state, id) {
	const {data} = state.repos;
	return data.filter(repo => repo.id === id)[0];
}

export function getIssuesForRepoId(state, id) {
	console.log(state, id)
	return state.issues.data[id] ? state.issues.data[id].issues : [];
}

export function isActiveRepo(state, repo) {
	return state.repos.selectedRepoId === repo.id;
}


// Other helper functions
export function getDateFromString(dateString) {
	return new Date(dateString).toLocaleDateString("en-US");
}

// Adapted from https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
// Could bring in Moment, Luxon, etc but seemed unnecessary to bring in another large package for this
export function timeSince(dateString) {
    let seconds = Math.floor(((new Date().getTime()/1000) - (new Date(dateString).getTime()/1000)));
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return interval + " years ago";

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + " months ago";

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + " days ago";

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + " hours ago";

    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + " minutes ago";

    return Math.floor(seconds) + " seconds ago";
}