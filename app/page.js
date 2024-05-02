'use client';

import Jobs from './_components/jobs-feed/page';

import authenticatedStyles from './_styles/authenticated.module.css';

export default function HomePage() {
  return (
    <>
      <title>Jobs - Poli</title>
      <div className={authenticatedStyles.pageContainer}>
        <Jobs />
      </div>
    </>
  );
}