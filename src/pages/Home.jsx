import React, { useEffect, useState } from 'react';
import BannerSection from '../components/BannerSection';
import FeaturedRooms from '../components/FeaturedRooms';
import SpecialOffers from '../components/SpecialOffers';
import Restaurant from '../components/Restaurant';
import Amenities from '../components/Amenities';
import UserReviews from '../components/UserReviews';
import LocationSection from '../components/LocationSection';



const Home = () => {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/reviews')
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching reviews:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="py-10 text-center">Loading reviews...</p>;

    return (
        <>
            <BannerSection />
            <FeaturedRooms />
            <SpecialOffers />
            <Restaurant />
            <Amenities />
            <UserReviews darkMode={false} reviews={reviews} />
            <LocationSection />
        </>
    );
};

export default Home;