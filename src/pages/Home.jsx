import React from 'react';
import BannerSection from '../components/BannerSection';
import FeaturedRooms from '../components/FeaturedRooms';
import SpecialOffers from '../components/SpecialOffers';
import Restaurant from '../components/Restaurant';
import Amenities from '../components/Amenities';
import UserReviews from '../components/UserReviews';
import LocationSection from '../components/LocationSection';

const Home = () => {
    return (
        <>
            <BannerSection />
            <FeaturedRooms />
            <SpecialOffers />
            <Restaurant />
            <Amenities />
            <UserReviews />
            <LocationSection />
        </>
    );
};

export default Home;