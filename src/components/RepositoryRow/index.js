import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { selectRepository } from '../../modules/actions';
import { isActiveRepo } from '../../modules/selectors';

const RepositoryRow = ({repository, isActiveRepo, selectRepository}) => {
	const buttonClass = classnames(
		'repository-button',
		{
			'active-repo': isActiveRepo
		}
	);

    return (
    	<div key={repository.id} className='repository-row'>
	        <button onClick={() => selectRepository(repository.id)} className={buttonClass}>
	            {repository.name}
	        </button>
	    </div>
    )
};

const mapStateToProps = (state, ownProps) => ({
	isActiveRepo: isActiveRepo(state, ownProps.repository)
})

const mapDispatchToProps = (dispatch) => ({
	selectRepository: (repoId) => dispatch(selectRepository(repoId))
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryRow);
