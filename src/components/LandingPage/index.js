import React from 'react';

const LandingPage = ({onChangeAPIToken, fetchRepos}) => {
	return (
		<div>
			<p>Enter your github API token:</p>
			<input onChange={onChangeAPIToken} type='text' />
			<button onClick={fetchRepos}>Fetch repositories</button>
		</div>
	)
}

export default LandingPage;