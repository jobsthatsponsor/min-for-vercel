'use client';

import {
  useEffect,
  useState
} from 'react';

import Link from 'next/link';
import TextButton from '@/app/_components/text-button/page';
import Button from '@/app/_components/button/page';

import SponsorshipIndicatorYesIcon from '@/public/sponsorship-indicator-yes-icon.svg';
import TooltipIcon from '@/public/tooltip-icon.svg';

import { createRequest } from '@/utils';

import { EVENTS } from '@/app/_constants';

import styles from './page.module.css';

export default function Job({
  id,
  title,
  company,
  icon,
  addedToPlatformOn,
  url,
  policy,
  sponsorshipStatus,
  category,
  seniority,
  companyURL,
  seen
}) {
  const [makeTranslucent, setMakeTranslucent] = useState(seen);

  useEffect(() => {
    if (seen && !newJobsOnly) {
      setMakeTranslucent(true);
    }
  }, [seen])

  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-GB');
  }

  async function onClickSeeJob() {
    await createRequest({
      endpoint: '/api/analytics',
      method: 'post',
      body: {
        event: {
          name: EVENTS.CLICK_SEE_JOB,
          data: {
            url,
            category: category?.name,
            company,
            seniority: seniority?.name,
            sponsorshipStatus: sponsorshipStatus?.name
          }
        }
      }
    });
  }

  async function onClickMarkAsExpired() {
    console.log('onClickMarkAsExpired called');
    await createRequest({
      endpoint: '/api/analytics',
      method: 'post',
      body: {
        event: { name: EVENTS.CLICK_MARK_JOB_AS_EXPIRED }
      }
    });
  }

  return (
    <div className={styles.outerContainer} style={{ opacity: makeTranslucent ? '0.4' : '1' }}>
      <div className={styles.innerContainer}>
        <div className={styles.upperContainer}>
          <div className={styles.leftContainer}>
            {companyURL ? ( // We may not have a URL
              <Link
                className={styles.companyInfoContainer}
                href={companyURL}
                target="_blank"
              >
                <img src={icon} className={styles.favicon} />
                <h4>{company}</h4>
              </Link>
            ) : (
              <div className={styles.companyInfoContainer}>
                <img src={icon} className={styles.favicon} />
                <h4>{company}</h4>
              </div>
            )}

            <div className={styles.titleAndAddedToPlatformOnContainer}>
              <h2>
                {title}
              </h2>
              <div className={styles.addedToPlatformAndTooltipContainer}>
                <span>{formatDate(addedToPlatformOn)}</span>
                <img
                  src="./tooltip-icon.png"
                  alt="Tooltip icon"
                  title="This date refers to the date this job was added to the platform, not when it was published by the employer."
                  className={styles.tooltipIcon}
                />
                {/* <TooltipIcon className={styles.tooltipIcon} /> */}
              </div>
            </div>
          </div>

          <div className={styles.rightContainer}>
            <div className={`${styles.sponsorshipIndicator} ${sponsorshipStatus?.name === 'Yes' ? '' : styles.sponsorshipIndicatorHidden}`}>
              <SponsorshipIndicatorYesIcon className={styles.sponsorshipIndicatorYesIcon} />
              <span>This role is <span className={styles.sponsorshipStatusEmphasisedText}>very likely</span> to be be sponsored.</span>
            </div>
          </div>
        </div>

        <div className={styles.lowerContainer}>
          <div className={styles.policyContainer}>
            <span className={styles.policy}>{policy}</span>
          </div>

          <div className={styles.buttonContainer}>
            {/* <TextButton onClick={() => onClickMarkAsExpired(id)}>Mark as expired</TextButton> */}
            <TextButton
              href="#"
              onClick={onClickMarkAsExpired}
              target="_blank"
              userAuthenticated={true}
            >
              Mark as expired
            </TextButton>

            <Button
              href={url}
              customStyle={{ margin: '0 0 0 20px' }}
              target="_blank"
              onClick={onClickSeeJob}
            >
              See job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}