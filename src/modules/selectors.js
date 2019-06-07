// Selectors
// Shared functions to get specific data from state

/**
 * Get full repository data that matches given id out of state
 * @param {object} state - The full application state
 * @param {str} id - Id of repository
 * @return {obj} Repository data
 */
export function getSelectedRepoById(state, id) {
    const {data} = state.repos;
    return data.filter(repo => repo.id === id)[0];
}

/**
 * Get array of issues for repository
 * @param {object} state - The full application state
 * @param {str} id - Id of repository
 * @return {array} Issues that belong to the repository
 */
export function getIssuesForRepoId(state, id) {
    console.log(state, id)
    return state.issues.data[id] ? state.issues.data[id].issues : [];
}

/**
 * Does this repo id match the selected repo id in state?
 * @param {object} state - The full application state
 * @param {object} repo - Repository to match id to
 * @return {bool} If repository id matches selected repository id
 */
export function isActiveRepo(state, repo) {
    return state.repos.selectedRepoId === repo.id;
}

/**
 * Have we already loaded issues for the currently selected repo in state?
 * @param {object} state - The full application state
 * @return {bool} If issues have already been loaded for the repo
 */
export function areIssuesLoadedForSelectedRepo(state) {
    const {
        issues,
        repos
    } = state;
    return issues[repos.selectedRepoId] && issues[repos.selectedRepoId].isDataLoaded;
}
