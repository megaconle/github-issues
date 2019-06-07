import mockAxios from 'axios';
import {
    fetchReposRequest,
    fetchReposSuccess,
    fetchReposFailure,
    updateAPIToken,
    fetchRepos,
    fetchIssues
} from '../actions';
import {
    FETCH_REPOS_SUCCESS,
    FETCH_REPOS_FAILURE,
    FETCH_REPOS_REQUEST,
    UPDATE_API_TOKEN,
    FETCH_ISSUES_SUCCESS,
    FETCH_ISSUES_FAILURE,
    FETCH_ISSUES_REQUEST
} from '../constants';

const mockRepoResponse = {
    data: [
        {
            id: 'repo1',
            owner: {
                login: 'megaconle'
            },
            name: 'repo1'
        },
        {id: 'repo2'}
    ]
};

const mockIssueResponse = {
    data: [
        {id: 'issue1'},
        {id: 'issue2'}
    ]
};

const mockState = {
    repos: {
        data: mockRepoResponse.data,
        isLoading: false,
        isError: false,
        selectedRepoId: 'repo1'
    },
    apiToken: {
        token: 'token'
    },
    issues: {
        data: {
            repo1: {
                issues: mockIssueResponse.data,
                isLoading: false,
                isError: false
            }
        }
    }
};

describe('action tests', () => {
    describe('fetchReposRequest', () => {
        it('returns the correct type', () => {
            expect(fetchReposRequest()).toEqual({type: FETCH_REPOS_REQUEST});
        });
    });

    describe('fetchReposFailure', () => {
        it('returns the correct type', () => {
            expect(fetchReposFailure()).toEqual({type: FETCH_REPOS_FAILURE});
        });
    });

    describe('fetchReposSuccess', () => {
        it('returns the correct type', () => {
            expect(fetchReposSuccess(mockRepoResponse).type).toEqual(FETCH_REPOS_SUCCESS);
        });

        it('returns the correct payload', () => {
            expect(fetchReposSuccess(mockRepoResponse).data).toEqual(mockRepoResponse);            
        });
    });

    describe('updateAPIToken', () => {
        it('returns the correct type', () => {
            expect(updateAPIToken('token').type).toEqual(UPDATE_API_TOKEN);
        });

        it('returns the correct payload', () => {
            expect(updateAPIToken('token').apiToken).toEqual('token');            
        });
    });

    describe('fetchRepos', () => {
        function getState() {
            return mockState;
        }

        const dispatch = jest.fn();

        it('dispatches FETCH_REPOS_REQUEST', async () => {
            mockAxios.mockImplementationOnce(() =>
                Promise.resolve(mockRepoResponse)
            );
            const data = await fetchRepos()(dispatch, getState);
            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({type: FETCH_REPOS_REQUEST})
            );
        });

        it('calls get on the correct url', async () => {
            mockAxios.mockImplementationOnce(() =>
                Promise.resolve(mockRepoResponse)
            );
            const data = await fetchRepos()(dispatch, getState);
            expect(mockAxios).toHaveBeenCalledWith(
                expect.objectContaining({url: 'https://api.github.com/user/repos'})
            );
        });

        it('dispatches FETCH_REPOS_SUCCESS with the correct payload', async () => {
            mockAxios.mockImplementationOnce(() =>
                Promise.resolve(mockRepoResponse)
            );
            const data = await fetchRepos()(dispatch, getState);
            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: FETCH_REPOS_SUCCESS,
                    data: mockRepoResponse.data
                })
            );
        });

        describe('on error', () => {
            it('dispatches FETCH_REPOS_FAILURE', async () => {
                mockAxios.mockImplementationOnce(() => {
                    Promise.reject()
                });
                const data = await fetchRepos()(dispatch, getState);
                expect(dispatch).toHaveBeenCalledWith(
                    expect.objectContaining({
                        type: FETCH_REPOS_FAILURE
                    })
                );
            });
        });
    });

    describe('fetchIssues', () => {
        function getState() {
            return mockState;
        }

        const dispatch = jest.fn();

        it('dispatches FETCH_ISSUES_REQUEST', async () => {
            mockAxios.mockImplementationOnce(() =>
                Promise.resolve(mockIssueResponse)
            );
            const data = await fetchIssues()(dispatch, getState);
            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({type: FETCH_ISSUES_REQUEST})
            );
        });

        it('calls get with the correct options', async () => {
            mockAxios.mockImplementationOnce(() =>
                Promise.resolve(mockIssueResponse)
            );
            const data = await fetchIssues()(dispatch, getState);
            expect(mockAxios).toHaveBeenCalledWith(
                expect.objectContaining({
                    headers: {
                        Authorization: 'token token'
                    },
                    method: 'get',
                    params: {
                        sort: 'created',
                        direction: 'desc'
                    },
                    url: 'https://api.github.com/repos/megaconle/repo1/issues'
                })
            );
        });

        it('dispatches FETCH_ISSUES_SUCCESS with the correct payload', async () => {
            mockAxios.mockImplementationOnce(() =>
                Promise.resolve(mockIssueResponse)
            );
            const data = await fetchIssues()(dispatch, getState);
            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: FETCH_ISSUES_SUCCESS,
                    issues: mockIssueResponse.data,
                    sort: 'created,desc',
                    selectedRepoId: 'repo1'
                })
            );
        });

        describe('on error', () => {
            it('dispatches FETCH_ISSUES_FAILURE', async () => {
                mockAxios.mockImplementationOnce(() => {
                    Promise.reject()
                });
                const data = await fetchIssues()(dispatch, getState);
                expect(dispatch).toHaveBeenCalledWith(
                    expect.objectContaining({
                        type: FETCH_ISSUES_FAILURE
                    })
                );
            });
        });
    });
});
