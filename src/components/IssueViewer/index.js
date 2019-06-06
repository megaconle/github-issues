import React from 'react';
import { connect } from 'react-redux';
import Column from '../Column';
import RepositoryRow from '../RepositoryRow';
import Issues from '../Issues';

const IssueViewer = (props) => {
    return (
        <div className='issue-viewer-container'>
            <Column>
                {props.repositories.map((repository) => (
                    <RepositoryRow repository={repository} />
                ))}
            </Column>

            <Column>
                <Issues />
            </Column>
        </div>
    )
}

const mapStateToProps = (state) => ({
    repositories: state.repos.data
});

export default connect(mapStateToProps)(IssueViewer);