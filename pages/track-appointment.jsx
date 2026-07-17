import TrackAppointment from '../src/public/pages/TrackAppointment';
import PublicLayout from '../src/public/layout/PublicLayout';
import { SeoHead } from '../src/next/seo';
import { pageSeo } from '../src/next/seo';

export default function TrackAppointmentRoute() {
  return <PublicLayout><SeoHead seo={pageSeo.trackAppointment} /><TrackAppointment /></PublicLayout>;
}
