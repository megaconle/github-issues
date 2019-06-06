import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Spinner = () => {
	return (
		<div>
			<FontAwesomeIcon icon={faSpinner} />
			Loading...
		</div>
	);
};

export default Spinner;
