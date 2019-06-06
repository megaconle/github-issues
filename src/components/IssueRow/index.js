import React from 'react';
import IssueHeader from './IssueHeader';
import {getDateFromString, timeSince} from '../../modules/selectors'

const IssueRow = ({issue}) => {
    return (
        <div className='issue-row'>
            <IssueHeader assignee={issue.assignee} title={issue.title} />
            <p>Created: {getDateFromString(issue.created_at)}</p>
            <p>Last updated: {timeSince(issue.updated_at)}</p>
        </div>
    )
};

export default IssueRow;
