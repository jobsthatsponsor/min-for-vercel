'use client';

import styles from './page.module.css';

export default function P({ children, className, style }) {
  return (
    <p className={`${styles.p} ${className ? className : ''}`} style={style}>{children}</p>
  );
}