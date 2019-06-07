import React from 'react';
import './App.css';
import LandingPage from '../components/LandingPage';
import IssueViewer from '../components/IssueViewer';
import AppHeader from '../components/AppHeader';
import { connect } from 'react-redux';

function App(props) {
    const content = props.showLandingPage ? <LandingPage /> : <IssueViewer />;
    return (
        <div className="App">
            <AppHeader />
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
