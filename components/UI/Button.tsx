import { ButtonHTMLAttributes } from 'react';
import './Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {};
export default function Button({children, className, ...rest}: ButtonProps) {
  return (
    <button className={className} {...rest}>{children}</button>
  )
}
