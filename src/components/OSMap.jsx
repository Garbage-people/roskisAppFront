import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import '../App.css';

export default function OSMap({ userLat, userLon, trashcans }) {
    return (
        <MapContainer center={[userLat, userLon]} zoom={20}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {trashcans.map(trashcan =>
                <Marker position={[trashcan.lat, trashcan.lon]}> <Popup>
                    lat: {trashcan.lat}, lon: {trashcan.lon}
                </Popup></Marker>)
            }
        </MapContainer>
    );
}
