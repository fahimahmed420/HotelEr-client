import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

// Sample hotel data
const hotelLocations = [
  {
    id: 1,
    name: "Sea View Hotel",
    coords: [21.4272, 92.0058],
    image: "https://source.unsplash.com/400x200/?beach,hotel",
  },
  {
    id: 2,
    name: "Hilltop Retreat",
    coords: [22.3569, 91.7832],
    image: "https://source.unsplash.com/400x200/?hill,hotel",
  },
  {
    id: 3,
    name: "Urban Oasis",
    coords: [23.8103, 90.4125],
    image: "https://source.unsplash.com/400x200/?city,hotel",
  },
];

// Component to fit map to marker bounds
const FitBounds = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(locations.map((loc) => loc.coords));
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [locations, map]);

  return null;
};

const LocationSection = ({ darkMode }) => {
  return (
    <section
      className={`py-20 px-4 transition-colors duration-500 ${
        darkMode ? 'bg-[#1d130c]' : 'bg-amber-50'
      }`}
    >
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2
          className={`text-4xl font-bold mb-4 ${
            darkMode ? 'text-rose-300' : 'text-rose-700'
          }`}
        >
          📍 Our Hotel Locations
        </h2>
        <p className={`text-sm ${darkMode ? 'text-[#f5deb3]' : 'text-gray-700'}`}>
          Explore our hotel branches across major destinations in Bangladesh.
        </p>
      </div>

      <div className="max-w-6xl mx-auto rounded-xl overflow-hidden shadow-md">
        <MapContainer
          className="h-[500px] w-full z-10"
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url={
              darkMode
                ? 'https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png'
                : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            }
          />

          <FitBounds locations={hotelLocations} />

          {hotelLocations.map((hotel) => (
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
