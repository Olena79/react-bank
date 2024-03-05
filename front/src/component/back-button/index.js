import React from 'react';
import './index.css';

export default function Component() {
    const handleClick = () => {
        return window.history.back();
    };

    return (
        <div onClick={handleClick} className={`back_button`}></div>
    );
}



