import React from 'react';
import PropTypes from 'prop-types';

export default function PlusIcon(props) {
    const { handleClick } = props;
    return (
        <div onClick={handleClick}>
            <svg className="octicon octicon-plus" viewBox="0 0 12 16" version="1.1" width="12" height="16" fill="#fff" aria-hidden="true">
                <path fillRule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"></path>
            </svg>
        </div>
    );
}

PlusIcon.defaultProps = {
    handleClick: () => { },
};

PlusIcon.propTypes = {
    handleClick: PropTypes.func,
};