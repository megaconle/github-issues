import React from 'react';
import { connect } from 'react-redux';
import IssueRow from '../IssueRow';
import Spinner from '../shared/Spinner';
import {getIssuesForRepoId} from '../../modules/selectors';

const Issues = ({isLoadingIssues, issues, isErrorLoadingIssues}) => {
    if (isErrorLoadingIssues) {
        return (
            <div class='error'>Error loading issues</div>
        );
    }
    return (
        <div className='issues-container'>
            {
                isLoadingIssues ?
                    <Spinner />
                :
                    issues.map((issue) => (
                        <IssueRow key={issue.id} issue={issue} />
                    ))
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    isLoadingIssues: state.issues.isLoading,
    isErrorLoadingIssues: state.issues.isError,
    issues: getIssuesForRepoId(state, state.repos.selectedRepoId)
});

export default connect(mapStateToProps)(Issues);