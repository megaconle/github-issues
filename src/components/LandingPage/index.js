import React from 'react';
import Spinner from '../../components/shared/Spinner';
import {updateAPIToken, fetchRepos} from '../../modules/actions';
import { connect } from 'react-redux';

const LandingPage = ({onChangeAPIToken, fetchRepos, isLoadingRepos, isErrorLoadingRepos}) => {
    return (
        <div className='token-input-container'>
            <p>Enter your github API token:</p>
            <input onChange={onChangeAPIToken} type='text' />
            <button onClick={() => fetchRepos()}>Fetch repositories</button>
            {isLoadingRepos && <Spinner />}
            {isErrorLoadingRepos && <div class='error'>Error loading repos</div>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    isLoadingRepos: state.repos.isLoading,
    isErrorLoadingRepos: state.repos.isError
});

const mapDispatchToProps = dispatch => ({
    onChangeAPIToken: (e) => dispatch(updateAPIToken(e.target.value)),
    fetchRepos: () => dispatch(fetchRepos())
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);