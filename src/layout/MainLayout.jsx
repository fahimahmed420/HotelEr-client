import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className='min-h-screen'>
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
