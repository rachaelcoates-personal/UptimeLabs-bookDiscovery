import React from "react";
import styles from "./styles.module.scss";

interface InputProps {
  id: string;
  value: string;
  onChange: (e: any) => void;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
}

export default function Input({ 
  id, value, onChange, disabled, 
  type = 'text',
  placeholder,
}: InputProps) {

  return (
    <div className={`${styles.input}`}>
      <input
        id={id}
        className={`${styles.inputField}`}
        type={type}
        name={id}
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}