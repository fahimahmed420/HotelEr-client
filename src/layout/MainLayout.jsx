import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BannerSection from '../components/BannerSection';
import FeaturedRooms from '../components/FeaturedRooms';
import LocationSection from '../components/LocationSection';

const MainLayout = () => {
  return (
    <>
      <div className="relative bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/2579.jpg')" }}>
        <Navbar />
        <BannerSection />
      </div>
      <FeaturedRooms/>
      <LocationSection/>
      <Footer />
    </>
  );
};

export default MainLayout;
