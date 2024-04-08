import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
// import { useEffect, useState } from "react";
import TrashcanService from "../services/TrashcanService";
import "../App.css";

export default function OSMap({ userPosition, trashcans }) {

  const emptyIcon = new Icon({
    iconUrl: "images/RoskisVihreä.png",
    iconSize: [70, 70],
    iconAnchor: [16, 32],
    popupAnchor: [4, -32],
  });

  const fullIcon = new Icon({
    iconUrl: "images/RoskisPunainen.png",
    iconSize: [70, 70],
    iconAnchor: [16, 32],
    popupAnchor: [4, -32],
  });

  const brokenIcon = new Icon({
    iconUrl: "images/RoskisRuksi.png",
    iconSize: [70, 70],
    iconAnchor: [16, 32],
    popupAnchor: [4, -32],
  });

  const hereIcon = new Icon({
    iconUrl: "images/HereMarker128HotPink.png",
    iconSize: [70, 70],
    iconAnchor: [16, 32],
  });

  const trashcanIcons = [emptyIcon, fullIcon, brokenIcon]

  const getTrashcanIcon = (status) => (
    status.at(0) === ""
      ? emptyIcon
      : trashcanIcons.at(Number(status.at(0)))
  );

  const getLastUpdatedDate = (status) => (
    status.at(1) === ""
      ? "never"
      : new Date(Date.parse(status.at(1))).toLocaleString("fi-FI")
  )

  const updateTrashcanState = async (id, status, lat, lon) => {
    const date = new Date().toISOString();
    const updatedTrashCanState = {
      id,
      status: [status, date],
      lat,
      lon,
    };
    try {
      await TrashcanService.updateTrashcanStatus(
        updatedTrashCanState
      );
    } catch (err) {
      console.err(err);
    }
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

      <Marker zIndexOffset={true} icon={hereIcon} position={[userPosition.lat, userPosition.lon]} />

      {trashcans.map((trashcan) => (
        <Marker
          key={trashcan.id}
          position={[trashcan.lat, trashcan.lon]}
          icon={getTrashcanIcon(trashcan.status)}
        >
          <Popup>
            lat: {trashcan.lat}, lon: {trashcan.lon},
            viimeisin päivitys: {getLastUpdatedDate(trashcan.status)}
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
    </MapContainer>
  );
}
