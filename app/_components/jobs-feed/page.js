'use client';

import Feed from './feed/page';

import authenticatedStyles from '@/app/_styles/authenticated.module.css';

export default function Jobs() {
  return (
    <div className={authenticatedStyles.mainContentContainer}>
      <Feed />
    </div>
  );
}