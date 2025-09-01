'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


export default function MapDisplay({ center, zoom, locations }) {
  if (!center || !locations) return null;

  return (
    <MapContainer center={[center.lat, center.lng]} zoom={zoom} scrollWheelZoom={false} style={{ height: '250px', width: '100%', borderRadius: '8px', marginTop: '12px', zIndex: 0 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc, index) => (
        <Marker key={index} position={[loc.lat, loc.lng]}>
          <Popup>
            <div className="font-bold">{loc.title}</div>
            {loc.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}