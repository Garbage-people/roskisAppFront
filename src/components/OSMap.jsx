import { MapContainer, TileLayer } from "react-leaflet";
import '../App.css';

export default function OSMap({ userLat, userLon }) {
    return (
        <MapContainer center={[userLat, userLon]} zoom={20}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}
