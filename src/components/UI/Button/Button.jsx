import React from "react";
import styles from "./Button.module.css";
import { GoSync } from "react-icons/go";

function Button(props) {
    return (
        <button 
        className={`${styles["btn"]} ${styles[props.classname]}`} 
        onClick={props.onClick} disabled={props.isLoading}
        type={props.type}
        >
            {props.isLoading ? <GoSync className="animate-spin"></GoSync> : props.children}
        </button>
    )
}

export default Button;