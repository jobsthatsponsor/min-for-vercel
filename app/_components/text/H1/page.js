'use client';

import styles from './page.module.css';

export default function H1({ children, className, style }) {
  return (
    <h1 className={`${styles.h1} ${className ? className : ''}`} style={style}>{children}</h1>
  );
}