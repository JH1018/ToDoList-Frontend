import React from 'react'
import styles from "../assets/styles/button.module.css"

const Button = ({ children, onClick, disabled }) => {
    return (
        <button 
            className={styles.button}
            onClick={onClick} 
            disabled={disabled}
        >
            {children}
        </button>
    );
};
 
export default Button;