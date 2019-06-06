import React from 'react';
import {updateAPIToken, fetchRepos} from '../../modules/actions';
import { connect } from 'react-redux';

const LandingPage = ({onChangeAPIToken, fetchRepos}) => {
    return (
        <div className='token-input-container'>
            <p>Enter your github API token:</p>
            <input onChange={onChangeAPIToken} type='text' />
            <button onClick={() => fetchRepos()}>Fetch repositories</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    onChangeAPIToken: (e) => dispatch(updateAPIToken(e.target.value)),
    fetchRepos: () => dispatch(fetchRepos())
})

export default connect(null, mapDispatchToProps)(LandingPage);