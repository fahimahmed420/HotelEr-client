import React, { useEffect, useState } from 'react';
import BannerSection from '../components/BannerSection';
import FeaturedRooms from '../components/FeaturedRooms';
import SpecialOffers from '../components/SpecialOffers';
import Restaurant from '../components/Restaurant';
import Amenities from '../components/Amenities';
import UserReviews from '../components/UserReviews';
import LocationSection from '../components/LocationSection';
import OfferPopup from '../components/OfferPopup';

const Home = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetch('https://hotel-booking-server-side-ruddy.vercel.app/api/reviews')
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching reviews:', err);
                setLoading(false);
            });

        const hasSeenPopup = localStorage.getItem('hasSeenOfferPopup');
        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setShowPopup(true);
                localStorage.setItem('hasSeenOfferPopup', 'true');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    if (loading) return <p className="py-10 text-center">Loading reviews...</p>;

    return (
        <>
            {showPopup && <OfferPopup onClose={() => setShowPopup(false)} />}
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
