import React from 'react';
import Avatar from './Avatar';

const IssueHeader = ({assignee, title}) => {
	return (
        <div className='issue-header'>
        	{
        		assignee ?
            		<Avatar url={assignee.avatar_url} assignee={assignee.login} />
            	:
            		<div className='avatar'/>
            }
            <p><strong>{title}</strong></p>
        </div>
	)
};

export default IssueHeader;