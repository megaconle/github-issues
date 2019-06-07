import React from 'react';
import { connect } from 'react-redux';
import { sortIssues } from '../../modules/actions';

const sortOptions = [
    {value: 'created,asc', text: 'Created, asc'},
    {value: 'created,desc', text: 'Created, desc'},
    {value: 'updated,asc', text: 'Updated, asc'},
    {value: 'updated,desc', text: 'Updated, desc'},
    {value: 'comments,asc', text: 'Comments, asc'},
    {value: 'comments,desc', text: 'Comments, desc'},
];

const IssueSorter = ({issueData, sortIssues}) => {
    if (issueData && issueData.issues.length) {
        return (
            <div className='sorter-container'>
                <select onChange={sortIssues} value={issueData.sort}>
                    {sortOptions.map((sortType) => (
                        <option key={sortType.value} value={sortType.value}>{sortType.text}</option>
                    ))}
                </select>
            </div>
        );
    } else {
        return null;
    }
}

const mapStateToProps = (state) => ({
    issueData: state.issues.data[state.repos.selectedRepoId]
});

const mapDispatchToProps = (dispatch) => ({
    sortIssues: (e) => dispatch(sortIssues({sortString: e.target.value}))
});

export default connect(mapStateToProps, mapDispatchToProps)(IssueSorter);
