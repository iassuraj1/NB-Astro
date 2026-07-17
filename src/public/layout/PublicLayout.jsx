import React from 'react';

// import Footer from '../components/public/layout/Footer';
import Header from './Header.';
import Footer from './Footer';

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#001A1A]">
      {/* Public Header - Visible on all public pages */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-36">
        {children}
      </main>
      
      {/* Public Footer - Visible on all public pages */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
