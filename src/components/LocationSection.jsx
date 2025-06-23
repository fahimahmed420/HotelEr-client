import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const FitBounds = ({ locations }) => {
  const map = useMap();
  useEffect(() => {
    if (locations.length) {
      const bounds = L.latLngBounds(locations.map((loc) => loc.coords));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);
  return null;
};

const LocationSection = ({ darkMode }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('https://hotel-booking-server-side-ruddy.vercel.app/api/rooms')
      .then((res) => res.json())
      .then((data) => {
        const formatted = data
          .filter((room) => room.Latitude && room.Longitude) 
          .map((room) => {
           
            const lat = parseFloat(room.Latitude.toString().trim());
            const lon = parseFloat(room.Longitude.toString().trim());

            return {
              id: room._id,
              name: room.hotelName,
              coords: [lat, lon],
              image: room.gallery?.[0] || 'https://source.unsplash.com/400x200/?hotel',
            };
          })
          // Filter out hotels that failed to parse
          .filter((hotel) => !isNaN(hotel.coords[0]) && !isNaN(hotel.coords[1]));

        setLocations(formatted);
      })
      .catch((err) => console.error('Error fetching rooms:', err));
  }, []);

  return (
    <section
      className={`py-20 px-4 transition-colors ${
        darkMode ? 'bg-[#1d130c]' : 'bg-amber-50'
      }`}
    >
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2
          className={`text-4xl font-bold mb-4 ${
            darkMode ? 'text-rose-300' : 'text-orange-500'
          }`}>
           Our Hotel Locations
        </h2>
        <p className={`text-sm ${darkMode ? 'text-[#f5deb3]' : 'text-gray-700'}`}>
          Explore our hotel branches across major destinations.
        </p>
      </div>

      <div className="max-w-6xl mx-auto rounded-xl overflow-hidden shadow-md">
        <MapContainer
          className="h-[300px] w-full z-10"
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}>
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url={
              darkMode
                ? 'https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png'
                : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            }/>

          {/* Fit map to all hotel markers */}
          <FitBounds locations={locations} />

          {locations.map((hotel) => (
            <Marker key={hotel.id} position={hotel.coords}>
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold mb-1">{hotel.name}</h3>
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default LocationSection;
