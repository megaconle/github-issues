import React from 'react';
import './App.css';
import LandingPage from '../components/LandingPage';
import { connect } from 'react-redux';

function App(props) {
    const content = props.showLandingPage ? <LandingPage /> : null;
    return (
        <div className="App">
            {content}
        </div>
  );
}

const mapStateToProps = (state) => {
    return {
        showLandingPage: !state.repos.isDataLoaded
    };
}

export default connect(mapStateToProps)(App);
