import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import TrashcanService from "../services/TrashcanService";
import "../App.css";
import getDaysDifference from "../utils/scripts/getDaysDifference";
import MarkerClusterGroup from 'react-leaflet-cluster';

const StatusButton = ({ updateTrashcanState, trashcan, status, iconUrl }) => (
  <button
    id="statusButton"
    onClick={() =>
      updateTrashcanState(trashcan.id, status, trashcan.lat, trashcan.lon)
    }
  >
    <img src={iconUrl} alt="Trashbin" width="100px" height="100px "></img>
  </button>
);

export default function OSMap({ userPosition, trashcans, setTrashcans }) {

  //Different types of icons shown on the map (all trashcan icons and the user location pointer)
  const emptyIcon = new Icon({
    iconUrl: "images/RoskisVihreä.png",
    iconSize: [70, 70],
    iconAnchor: [16, 32],
    popupAnchor: [19, -16],
  });

  const fullIcon = new Icon({
    iconUrl: "images/RoskisPunainen.png",
    iconSize: [70, 70],
    iconAnchor: [16, 32],
    popupAnchor: [19, -16],
  });

  const brokenIcon = new Icon({
    iconUrl: "images/RoskisRuksi.png",
    iconSize: [70, 70],
    iconAnchor: [16, 32],
    popupAnchor: [19, -16],
  });

  const hereIcon = new Icon({
    iconUrl: "images/Nuppineula.png",
    iconSize: [80, 80],
    iconAnchor: [16, 32],
  });

  const trashcanIcons = [emptyIcon, fullIcon, brokenIcon];

  const getTrashcanIcon = (status) => {
    // TODO: test if the defaulting works with old updates

    // With no status update icon defaults to empty.
    if (status.at(1) === "") {
      return emptyIcon;
    }

    // If the status update is few days old it gets ignored and defaults to default state.
    if (getDaysDifference(new Date(Date.parse(status.at(1))), new Date()) > 2) {
      return emptyIcon;
    } else {
      return trashcanIcons.at(Number(status.at(0)));
    }
  };

  const getLastUpdatedDate = (status) =>
    status.at(1) === ""
      ? "ei tietoa"
      : new Date(Date.parse(status.at(1))).toLocaleString("fi-FI");

  const updateTrashcanState = async (id, status, lat, lon) => {
    const date = new Date().toISOString();
    const updatedTrashCanState = {
      id,
      status: [status, date],
      lat,
      lon,
    };
    try {
      await TrashcanService.updateTrashcanStatus(updatedTrashCanState);

      // after updating trashcan status, fetch updated trashcans and set them to trashcans state
      const updatedTrashcans = await TrashcanService.getAll();
      setTrashcans(updatedTrashcans);
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

      <Marker
        zIndexOffset={true}
        icon={hereIcon}
        position={[userPosition.lat, userPosition.lon]}
      />

      <MarkerClusterGroup chunkedLoading>
        {trashcans.map((trashcan) => (
          <Marker
            zIndexOffset={false}
            key={trashcan.id}
            position={[trashcan.lat, trashcan.lon]}
            icon={getTrashcanIcon(trashcan.status)}
          >
            <Popup closeButton={false}>
              <div style={{ textAlign: "center" }}>
                {/* lat: {trashcan.lat}, lon: {trashcan.lon},  */}
                Viimeisin päivitys: {getLastUpdatedDate(trashcan.status)}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0",
                  padding: "0",
                }}
              >
                <StatusButton
                  updateTrashcanState={updateTrashcanState}
                  trashcan={trashcan}
                  status={0}
                  iconUrl="images/RoskisVihreä.png"
                />
                <StatusButton
                  updateTrashcanState={updateTrashcanState}
                  trashcan={trashcan}
                  status={1}
                  iconUrl="images/RoskisPunainen.png"
                />
                <StatusButton
                  updateTrashcanState={updateTrashcanState}
                  trashcan={trashcan}
                  status={2}
                  iconUrl="images/RoskisRuksi.png"
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
