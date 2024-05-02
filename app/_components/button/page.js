import { Inter } from 'next/font/google';
import Link from 'next/link';

import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Button({
  children,
  href,
  onClick,
  secondary,
  tertiary,
  customStyle,
  disabled,
  target,
}) {
  let buttonType;
  switch (true) {
    case secondary:
      buttonType = 'secondary';
      break;
    case tertiary:
      buttonType = 'tertiary';
      break;
    default:
      buttonType = 'primary';
  }

  return !href ? (
    <button
      onClick={onClick}
      className={!disabled ? `${inter.className} ${styles.button} ${styles[buttonType]}` : `${inter.className} ${styles.button} ${styles[buttonType]} ${styles.disabled}`}
      style={customStyle}
      disabled={disabled}
    >
      {children}
    </button>
  ) : (
    <Link
      href={href}
      className={!disabled ? `${inter.className} ${styles.button} ${styles[buttonType]}` : `${inter.className} ${styles.button} ${styles[buttonType]} ${styles.disabled}`}
      style={customStyle}
      onClick={onClick}
      target={target}
    >
      {children}
    </Link>
  );
}