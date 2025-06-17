import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <>
     <div className=" bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/2579.jpg')" }}>
        <Navbar />
        <Outlet></Outlet>
        </div>
       <Toaster position="top-right" toastOptions={{ style: { zIndex: 9999 } }} />
      <Footer />
    </>
  );
};

export default MainLayout;
