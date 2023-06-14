import styles from "./Card.module.scss";

type CardType = {
  children: React.ReactNode;
  type: string;
  role?: string;
  className?: string;
};
export default function Card({ children, role, type, className }: CardType): JSX.Element {
  return (
    <div className={`${styles[type]} ${role && styles[role]} ${className ? className : ""}`}>
      {children}
    </div>
  );
}
