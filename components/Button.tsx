import './Button.scss';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {};
export default function Button({children, className, ...rest}: ButtonProps) {
  return (
    <button className={className} {...rest}>{children}</button>
  )
}
