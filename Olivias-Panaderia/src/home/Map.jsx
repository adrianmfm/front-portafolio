import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const fixedPosition = [-33.4330059, -70.6174793]; // Coordenadas de ejemplo (Nueva York)

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto' }}>
      <MapContainer
        center={fixedPosition}
        zoom={15}
        scrollWheelZoom={false}
        style={{
          height: '400px',
          width: '100%',
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={fixedPosition}
          icon={
            new Icon({
              iconUrl: "/imagenes/logo-olivias.jpeg", 
              iconSize: [40, 40],
            })
          }
        >
          <Popup>
            <div className="text-center">
              <h6>Olivias panadería pastelería</h6>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
