import React from 'react';
import { connect } from 'react-redux';
import {selectRepository} from '../../modules/actions';

const RepositoryRow = ({repository, selectRepository}) => {
    return (
    	<div className='repository-row'>
	        <button onClick={() => selectRepository(repository.id)} className='repository-button'>
	            {repository.name}
	        </button>
	    </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
	selectRepository: (repoId) => dispatch(selectRepository(repoId))
});

export default connect(null, mapDispatchToProps)(RepositoryRow);
