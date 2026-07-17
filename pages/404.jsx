import PublicLayout from '../src/public/layout/PublicLayout';
import { SeoHead } from '../src/next/seo';

const NotFound = () => (
  <div className="min-h-screen bg-black flex items-center justify-center px-4">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-3">Page Not Found</h1>
      <p className="text-gray-400">The page you are looking for does not exist.</p>
    </div>
  </div>
);

export default function NotFoundPage() {
  return <PublicLayout><NotFound /></PublicLayout>;
}
