import { MapContainer, TileLayer, useMap } from "react-leaflet"
import '../App.css'

export default function OSMap() {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={10}>

            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
                
            }

            <Marker position={[40.505, -100.09]}>
                <Popup>
                    I am a pop-up!
                </Popup>
            </Marker>

        </MapContainer>
    )
}