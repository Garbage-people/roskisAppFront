import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import '../App.css';
import { Icon } from "leaflet";

export default function OSMap({ userLat, userLon, trashcans }) {
    const trashIcon = new Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/1843/1843344.png',
        iconSize: [16, 16],
        iconAnchor: [16, 32],
        popupAnchor: [-8, -32]
    });

    return (
        <MapContainer center={[userLat, userLon]} zoom={20}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMapin tekijät</a> | © Aineistot: Helsingin kaupunki'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {trashcans.map(trashcan =>
                <Marker key={trashcan.id} position={[trashcan.lat, trashcan.lon]} icon={trashIcon}> <Popup>
                    lat: {trashcan.lat}, lon: {trashcan.lon}
                </Popup></Marker>)
            }
        </MapContainer>
    );
}
