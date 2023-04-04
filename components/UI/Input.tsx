import styles from './Input.module.scss';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {}
export default function Input({className, ...rest}: InputProps) {
  return (
    <input 
      className={`${styles.input} ${className}`}
      {...rest}
    />
  )
}
