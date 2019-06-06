import React from 'react';
import { connect } from 'react-redux';
import Column from '../Column';
import RepositoryRow from '../RepositoryRow';

const IssueViewer = (props) => {
    return (
        <div className='issue-viewer-container'>
            <Column>
                {props.repositories.map((repository) => (
                    <RepositoryRow repository={repository} />
                ))}
            </Column>

            <Column>
                issues
            </Column>
        </div>
    )
}

const mapStateToProps = (state) => ({
    repositories: state.repos.data
});

export default connect(mapStateToProps)(IssueViewer);