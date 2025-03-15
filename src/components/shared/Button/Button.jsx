// src/components/Button.jsx
import React from 'react';
import './Button.css'; // Optional: Import CSS for styling

const Button = ({ onClick, children, variant = 'default', size = 'medium' }) => {
    return (
        <button
            className={`button ${variant} ${size}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
