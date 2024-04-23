import { useEffect, useRef, useState } from "react";
import TrashcanService from "./services/TrashcanService";
import OSMap from "./components/OSMap";
import ConfirmDialog from "./components/ConfirmDialog";
import NotificationManager from "./components/Notification";
import "./App.css";
import InfoDialog from "./components/InfoDialog";

function App() {
  const [userPosition, setUserPosition] = useState({ lat: null, lon: null });
  const defaultPosition = { lat: 60.1711, lon: 24.9414 };
  const [trashcans, setTrashcans] = useState([]);
  const [isLocationEnabled, setLocationEnabled] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const infoDialogRef = useRef(null);

  const displayNotification = (text, status, timeout) => {
    setNotificationMessage({ text, status, timeout });
  };

  const getAllTrashcans = async () => {
    try {
      const res = await TrashcanService.getAll();
      setTrashcans(res);
    } catch (err) {
      console.error("Error fetching trashcans", err);
      displayNotification("Tietokantaan ei saada yhteyttä", "error", 60000);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setLocationEnabled(true);
        },
        (error) => {
          console.error("Error getting location:", error);
          setUserPosition(defaultPosition);
          setLocationEnabled(false);
        }
      );
    } else {
      setUserPosition(defaultPosition);
      setLocationEnabled(false);
    }
  };

  // this is a cheat way of refreshing user location would possibly like to modify it later to update OSMap "center"-property back to user location
  const refreshLocation = () => {
    window.location.reload();
  };

  const addTrashcan = async () => {
    if (isLocationEnabled) {
      const newTrashcan = {
        lat: userPosition.lat,
        lon: userPosition.lon,
      };
      const res = await TrashcanService.addTrashcan(newTrashcan);
      if (res.status === 200) {
        const updatedTrashcans = await TrashcanService.getAll();
        setTrashcans(updatedTrashcans);
        displayNotification("Roskiksen lisäys onnistui!", "success", 5000);
      } else if (res.response.status === 400) {
        displayNotification(
          "Roskiksen lisääminen ei onnistunut.",
          "error",
          5000
        );
      } else if (res.response.status === 418) {
        displayNotification(
          "Roskiksen lisäys epäonnistui, liian lähellä toista roskista.",
          "error",
          5000
        );
      }
    }
  };

  useEffect(() => {

    // Checking API key for debugging and developing, delete this once it works !!!
    const apiKey = import.meta.env?.VITE_API_KEY;
    if (apiKey) {
      console.log(apiKey);
    } else {
      console.log("no api key found!");
    }

    getAllTrashcans();
    getLocation();
  }, []);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDialog = () => {
    addTrashcan();
    setDialogOpen(false);
  };

  const toggleInfoDialog = () => {
    const infoDialog = infoDialogRef.current;
    infoDialog.open
      ? infoDialog.close()
      : infoDialog.showModal()
  };

  return (
      <div id="map">
        <button id="infoButton">
          <img
            src="images/inffoIkoni.png"
            alt="Trashbin"
            width="60px"
            height="60px"
            onClick={toggleInfoDialog}
          ></img>
        </button>

        <InfoDialog toggleInfoDialog={toggleInfoDialog} infoDialogRef={infoDialogRef} />

        <button
          id="addButton"
          onClick={handleOpenDialog}
          disabled={!isLocationEnabled}
        >
          <img
            src="images/RoskisLisäysUusi.png"
            alt="Trashbin"
            width="85px"
            height="85px"
          ></img>
        </button>

        <ConfirmDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDialog}
        />

        <NotificationManager
          message={notificationMessage}
          setMessage={setNotificationMessage}
        />

        {userPosition.lat !== null && userPosition.lon !== null && (
          <OSMap
            trashcans={trashcans}
            userPosition={userPosition}
            setTrashcans={setTrashcans}
          />
        )}
      </div>
  );
}

export default App;
