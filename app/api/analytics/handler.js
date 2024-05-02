import Mixpanel from 'mixpanel';

import { createExternalResponse } from '@/utils';

export default function handler({ event: { name, data = {} }, ip, distinct_id }) {
  const message = `\`${name}\` event recorded`;
  
  const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN, { // There is no token in this repo
    geolocate: true,
    host: 'api-eu.mixpanel.com',
  });
  
  mixpanel.track(name, {
    distinct_id,
    ip,
    ...data,
  });
  
  console.log(message);
  return createExternalResponse({ data: message });
}