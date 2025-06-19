import React, { useEffect, useState } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch data from MongoDB API (you should replace the URL below with your actual endpoint)
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error('Error fetching reviews:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-200"
            style={{
              background: 'linear-gradient(135deg, #e0f7fa 0%, #f1f8ff 100%)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.975c.3.921-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.783.57-1.838-.197-1.538-1.118l1.287-3.975a1 1 0 00-.364-1.118L2.049 9.402c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.975z" />
                  </svg>
                ))}
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fantastic Collaboration</h3>
            <p className="text-gray-700 mb-4">{review.message}</p>
            <div className="flex items-center">
              <img
                src={review.avatar || `https://i.pravatar.cc/40?img=${idx + 10}`}
                alt={review.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p className="font-medium text-sm">{review.name}</p>
                <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
