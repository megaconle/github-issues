import React from 'react';

const Avatar = ({url, assignee}) => {
	return (
		<div className='avatar'>
			<img src={url} alt={`${assignee} avatar`} />
		</div>
	);
}

export default Avatar;