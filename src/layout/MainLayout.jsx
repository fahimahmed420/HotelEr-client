import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
     <div className=" bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/2579.jpg')" }}>
        <Navbar />
        <Outlet></Outlet>
        </div>
      <Footer />
    </>
  );
};

export default MainLayout;
