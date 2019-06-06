import React from 'react';
import { connect } from 'react-redux';
import IssueRow from '../IssueRow';
import Spinner from '../shared/Spinner';
import {getIssuesForRepoId} from '../../modules/selectors';

const Issues = ({isLoadingIssues, issues}) => {
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
    )
}

const mapStateToProps = (state) => ({
    isLoadingIssues: state.issues.isLoading,
    issues: getIssuesForRepoId(state, state.repos.selectedRepoId)
});

export default connect(mapStateToProps)(Issues);