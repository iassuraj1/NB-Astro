import AppointmentForm from '../../../../src/public/pages/AppointmentForm';
import PublicLayout from '../../../../src/public/layout/PublicLayout';

export default function ConsultationBookRoute() {
  return <PublicLayout><AppointmentForm /></PublicLayout>;
}

export const getServerSideProps = () => ({
  props: {},
});
