
import styles from "./Button.module.scss";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: string,
  size?: string,
  children: React.ReactNode
}
export default function Button({btnType = "primary", size ="medium", children, ...rest}: ButtonProps) {
  return (
    <button className={`${styles[btnType]} ${styles[size]}`} {...rest}>{children}</button>
  );
}
