import React from 'react';
import './App.css';
import LandingPage from '../components/LandingPage';
import {updateAPIToken, fetchRepos} from '../modules/actions';
import { connect } from 'react-redux';

function App(props) {
  return (
    <div className="App">
      <LandingPage fetchRepos={fetchRepos} onChangeAPIToken={props.onChangeAPIToken} />

      <pre>
      	{	
      		JSON.stringify(props)
      	}
      </pre>
    </div>
  );
}

const mapStateToProps = (state) => {
	return state;
}

const mapDispatchToProps = dispatch => ({
 onChangeAPIToken: (e) => dispatch(updateAPIToken(e.target.value)),
 fetchRepos: dispatch(fetchRepos())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
