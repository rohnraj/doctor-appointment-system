import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  onClick?: (e:any) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" |"smallGreenBtn" | "smallWhiteBtn" | "largeGreenBtn" | "largeBrownBtn" | "mainPageButton" | "tinyGreenBtn" | "tinyWhiteBtn" | "cardButton" | "cardButtonGreen" | "slotGreenBtn" | "smallcardButtonGreen" | "googleBtn"; 
  disabled?: boolean;
  icon?:string
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  icon=''
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <span className={styles.iconSize}>{icon ? <img src={icon} alt={''}/> : ''}</span> 
      {text}
    </button>
  );
};

export default Button;
