import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export default function Input({className, ...rest}: InputProps) {
  return (
    <input 
      className={`${styles.input} ${className}`}
      {...rest}
    />
  )
}
