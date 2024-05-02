'use client';

import { useState } from 'react';

import Job from '../job/page';

import styles from './page.module.css';

export default function Feed() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Software Engineer',
      company: 'Facebook',
      icon: 'https://logo.clearbit.com/facebook.com',
      url: 'https://www.facebook.com/careers/jobs/1234567890/',
      addedToPlatformOn: '2021-09-01T00:00:00.000Z',
      policy: 'remote',
      sponsorshipStatus: 'yes',
      category: 'software-engineering',
      seniority: 'senior',
      companyURL: 'https://www.facebook.com/',
      seen: false
    },
    {
      id: 2,
      title: 'Software Engineer',
      company: 'Google',
      icon: 'https://logo.clearbit.com/google.com',
      url: 'https://careers.google.com/jobs/results/1234567890/',
      addedToPlatformOn: '2021-09-01T00:00:00.000Z',
      policy: 'remote',
      sponsorshipStatus: 'yes',
      category: 'software-engineering',
      seniority: 'senior',
      companyURL: 'https://www.google.com/',
      seen: false
    },
    {
      id: 3,
      title: 'Software Engineer',
      company: 'Apple',
      icon: 'https://logo.clearbit.com/apple.com',
      url: 'https://jobs.apple.com/en-gb/details/1234567890',
      addedToPlatformOn: '2021-09-01T00:00:00.000Z',
      policy: 'remote',
      sponsorshipStatus: 'yes',
      category: 'software-engineering',
      seniority: 'senior',
      companyURL: 'https://www.apple.com/',
      seen: false
    }
  ]);

  return (
    <div className={styles.feedContainer}>
      <>
        {jobs && (
          <>
            {
              jobs.map((job) => job && job.company && ( // Investigate why `job.company` is sometimes `null`
                <Job
                  key={job?.id}
                  id={job?.id}
                  title={job?.title}
                  company={job?.company}
                  icon={job?.icon}
                  url={job?.url}
                  addedToPlatformOn={job?.addedToPlatformOn}
                  policy={job?.policy}
                  sponsorshipStatus={job?.sponsorshipStatus}
                  category={job?.category}
                  seniority={job?.seniority}
                  companyURL={job?.companyURL}
                  seen={job?.seen}
                  newJobsOnly={false}
                />
              ))
            }
          </>
        )}
      </>
    </div>
  );

}