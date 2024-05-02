import { Inter } from 'next/font/google';
import Link from 'next/link';

import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function TextButton({ href, children, onClick, formAction, className, customStyles, target, userAuthenticated }) {
  return (onClick && (onClick && !href)) || formAction ? ( // If `onClick` is provided, and `href` is not provided, or if `formAction` is provided
    <button
      className={`${inter.className} ${styles.button} ${className}`}
      onClick={onClick}
      formAction={formAction}
      style={userAuthenticated ? { ...customStyles, fontSize: '0.9rem' } : customStyles}
      target={target}
    >
      {children}
    </button>
  ) : (
    <Link
      className={`${inter.className} ${styles.a} ${className}`}
      href={href}
      onClick={onClick}
      style={userAuthenticated ? { ...customStyles, fontSize: '0.9rem'} : customStyles}
      target={target}
    >
      {children}
    </Link>
  );
}