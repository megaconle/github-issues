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

export function areIssuesLoadedForSelectedRepo(state) {
    const {
        issues,
        repos
    } = state;
    return issues[repos.selectedRepoId] && issues[repos.selectedRepoId].isDataLoaded;
}
