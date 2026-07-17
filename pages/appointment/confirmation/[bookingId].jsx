import AppointmentConfirmation from '../../../src/public/pages/AppointmentConfirmation';
import PublicLayout from '../../../src/public/layout/PublicLayout';

export default function AppointmentConfirmationRoute() {
  return <PublicLayout><AppointmentConfirmation /></PublicLayout>;
}

export const getServerSideProps = () => ({
  props: {},
});
