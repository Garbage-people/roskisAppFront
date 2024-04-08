import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useState } from "react";
import TrashcanService from "../services/TrashcanService";
import "../App.css";

export default function OSMap({ userPosition, trashcans }) {
  const [trashCanState, setTrashCanState] = useState({});

  const trashIcon = new Icon({
    iconUrl: "images/RoskisVihreä.png",
    iconSize: [60, 60],
    iconAnchor: [16, 32],
    popupAnchor: [4, -32],
  });

  const hereIcon = new Icon({
    iconUrl: "images/HereMarker128HotPink.png",
    iconSize: [40, 40],
    iconAnchor: [16, 32],
  });

  const updateTrashcanState = (id, status, lat, lon) => {
    const date = new Date().toISOString();
    const updatedTrashCanState = {
      id,
      status: [status, date],
      lat,
      lon,
    };
    setTrashCanState(updatedTrashCanState);
    TrashcanService.updateTrashcanStatus(updatedTrashCanState);
  };

  return (
    <MapContainer
      center={[userPosition.lat, userPosition.lon]}
      zoom={17}
      minZoom={17}
      dragging={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMapin tekijät</a> | © Aineistot: Helsingin kaupunki'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {trashcans.map((trashcan) => (
        <Marker
          key={trashcan.id}
          position={[trashcan.lat, trashcan.lon]}
          icon={trashIcon}
        >
          <Popup>
            lat: {trashcan.lat}, lon: {trashcan.lon}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0",
                padding: "0",
              }}
            >
              <button
                onClick={() =>
                  updateTrashcanState(
                    trashcan.id,
                    0,
                    trashcan.lat,
                    trashcan.lon
                  )
                }
              >
                <img
                  src="images/RoskisVihreä.png"
                  alt="Trashbin"
                  width="100px"
                  height="100px "
                ></img>
              </button>
              <button
                onClick={() =>
                  updateTrashcanState(
                    trashcan.id,
                    1,
                    trashcan.lat,
                    trashcan.lon
                  )
                }
              >
                <img
                  src="images/RoskisKeltainen.png"
                  alt="Trashbin"
                  width="100px"
                  height="100px"
                ></img>
              </button>
              <button
                onClick={() =>
                  updateTrashcanState(
                    trashcan.id,
                    2,
                    trashcan.lat,
                    trashcan.lon
                  )
                }
              >
                <img
                  src="images/RoskisPunainen.png"
                  alt="Trashbin"
                  width="100px"
                  height="100px"
                ></img>
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
      <Marker icon={hereIcon} position={[userPosition.lat, userPosition.lon]} />
    </MapContainer>
  );
}
