export default function AdminIndex() {
  return null;
}

export const getServerSideProps = () => ({
  redirect: {
    destination: '/admin/login',
    permanent: false,
  },
});
