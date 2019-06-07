import React from 'react';
import IssueSorter from './IssueSorter';

const AppHeader = () => {
    return (
        <div className='header'>
            <div>
                <h1>Github Issues Viewer</h1>
            </div>
            <IssueSorter />
        </div>
    )
}

export default AppHeader;