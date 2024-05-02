import { headers } from 'next/headers';

import {
  createExternalResponse,
} from '@/utils';

import handler from './handler';

import { EVENTS } from '@/app/_constants';

export async function POST(request) {
  // In the real repo, we ensure the user is authenticated before allowing them to send events

  const { event } = await request.json();

  const userAuthId = 'random-uuid-from-database'; // This is a placeholder for the user's Auth ID
  const ip = headers().get('x-forwarded-for') || request.socket.remoteAddress;
  const eventName = event.name;

  try {
    switch (eventName) {
      case EVENTS.CLICK_SEE_JOB:
        return handler({
          event: {
            name: eventName,
            data: {
              job_url: event.data.url,
              job_category: event.data.category,
              job_seniority: event.data.seniority,
              job_sponsorship_status: event.data.sponsorshipStatus,
              job_company: event.data.company,
            }
          },
          ip,
          distinct_id: userAuthId,
        });
      case EVENTS.CLICK_APPLY_FILTERS:
        const activeFilters = Object.keys(event.data.filters).reduce((acc, filterName) => {
          event.data.filters[filterName].forEach((value, index) => {
            acc[`${filterName}_${index + 1}`] = value.name;
          });
        
          return acc;
        }, {});        

        return handler({
          event: {
            name: eventName,
            data: { ...activeFilters }
          },
          ip,
          distinct_id: userAuthId,
        });
      case EVENTS.CLICK_COMPANIES_TO_AVOID_LINK:
        return handler({
          event: { name: eventName },
          ip,
          distinct_id: userAuthId,
        });

      case EVENTS.CLICK_MARK_JOB_AS_EXPIRED:
        return handler({
          event: { name: eventName },
          ip,
          distinct_id: userAuthId,
        });
      default:
        return createExternalResponse({ error: 'Event not found' });
    }
  } catch (e) {
    console.error(e);
    return createExternalResponse({ error: e });
  }
}