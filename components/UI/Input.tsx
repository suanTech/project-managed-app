import { InputHTMLAttributes } from 'react';
import './Input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export default function Input({className, ...rest}: InputProps) {
  return (
    <input 
      className={`input ${className}`}
      {...rest}
    />
  )
}
