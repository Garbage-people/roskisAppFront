import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import '../App.css';
import { Icon } from "leaflet";
import { useState } from "react";

export default function OSMap({ userLat, userLon, trashcans }) {
    const [trashCanState, setTrashCanState] = useState({});

    const trashIcon = new Icon({
        iconUrl: 'src//resources//trashbinSlimFGreenGreyEmpty128.png',
        iconSize: [40, 40],
        iconAnchor: [16, 32],
        popupAnchor: [4, -32]
    });

    const handleButtonClick = (id, status) => {
        const date = new Date().toISOString();
        setTrashCanState({ id, status, date });
    };

    return (
        <MapContainer center={[userLat, userLon]} zoom={17} minZoom={17} dragging={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMapin tekijät</a> | © Aineistot: Helsingin kaupunki'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {trashcans.map(trashcan =>
                <Marker key={trashcan.id} position={[trashcan.lat, trashcan.lon]} icon={trashIcon}>
                    <Popup>
                        lat: {trashcan.lat}, lon: {trashcan.lon}
                        <div style={{ display: "flex", justifyContent: "center", margin: "0", padding: "0" }}>
                            <button onClick={() => handleButtonClick(trashcan.id, 0)}><img src="src//resources//trashbinSlimFGreenGreyEmpty128.png" alt="Trashbin" width="40px" height="40px "></img></button>
                            <button onClick={() => handleButtonClick(trashcan.id, 1)}><img src="src//resources//trashbinSlimMunsellPinkFull128.png" alt="Trashbin" width="40px" height="40px"></img></button>
                            <button onClick={() => handleButtonClick(trashcan.id, 2)}><img src="src//resources//trashbinSlimBlackGreyOOS128.png" alt="Trashbin" width="40px" height="40px"></img></button>
                        </div>
                    </Popup>
                </Marker>)
            }
            <Marker position={[userLat, userLon]} />
        </MapContainer >

    );
}
