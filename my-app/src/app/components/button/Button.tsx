import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" |"smallGreenBtn" | "smallWhiteBtn" | "largeGreenBtn" | "largeBrownBtn" | "mainPageButton" | "tinyGreenBtn" | "tinyWhiteBtn" | "cardButton" | "cardButtonGreen" | "slotGreenBtn" | "smallcardButtonGreen"; 
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
