import mockAxios from 'axios';
import {
    fetchReposRequest,
    fetchReposSuccess,
    fetchReposFailure,
    updateAPIToken,
    fetchRepos
} from '../actions';
import {
    FETCH_REPOS_SUCCESS,
    FETCH_REPOS_FAILURE,
    FETCH_REPOS_REQUEST,
    UPDATE_API_TOKEN
} from '../constants';

const mockRepoResponse = {
    data: [
        {
            id: 'repo1'
        },
        {
            id: 'repo2'
        }
    ]
};

const mockState = {
    repos: {
        data: mockRepoResponse.data,
        isLoading: false,
        isError: false
    },
    apiToken: {
        token: 'token'
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


        mockAxios.mockImplementationOnce(() =>
            Promise.resolve(mockRepoResponse)
        );

        it('dispatches FETCH_REPOS_REQUEST', async () => {
            const data = await fetchRepos()(dispatch, getState);
            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({type: FETCH_REPOS_REQUEST})
            );
        });

        it('calls get on the correct url', async () => {
            const data = await fetchRepos()(dispatch, getState);
            expect(mockAxios).toHaveBeenCalledWith(
                expect.objectContaining({url: 'https://api.github.com/user/repos'})
            );
        });

        it('dispatches FETCH_REPOS_SUCCESS with the correct payload', async () => {
            const data = await fetchRepos()(dispatch, getState);
            expect(dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: FETCH_REPOS_SUCCESS,
                    data: mockRepoResponse.data
                })
            );
        });

        describe('on error', () => {
            mockAxios.mockImplementationOnce(() => {
                Promise.reject()
            });

            it('dispatches FETCH_REPOS_FAILURE', async () => {
                const data = await fetchRepos()(dispatch, getState);
                expect(dispatch).toHaveBeenCalledWith(
                    expect.objectContaining({
                        type: FETCH_REPOS_FAILURE
                    })
                );
            });
        })
    });
});
