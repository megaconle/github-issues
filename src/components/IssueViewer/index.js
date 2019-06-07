import React from 'react';
import { connect } from 'react-redux';
import Column from '../Column';
import RepositoryRow from '../RepositoryRow';
import Issues from '../Issues';

export const IssueViewer = (props) => {
    return (
        <div className='issue-viewer-container'>
            <Column>
                {props.repositories.map((repository) => (
                    <RepositoryRow key={repository.id} repository={repository} />
                ))}
            </Column>

            <Column>
                <Issues />
            </Column>
        </div>
    )
}

export const mapStateToProps = (state) => ({
    repositories: state.repos.data
});

export default connect(mapStateToProps)(IssueViewer);