import { memo, useEffect, useRef, useState } from "react";
import TrashcanService from "./services/TrashcanService";
import OSMap from "./components/OSMap";
import InfoDialog from "./components/InfoDialog";
import NewTrashcanDialog from "./components/NewTrashcanDialog";
import NotificationManager from "./components/NotificationManager";
import "./App.css";

const OSMapMemo = memo(OSMap)

function App() {
  const [userPosition, setUserPosition] = useState({ lat: null, lon: null });
  const defaultPositionRef = useRef({ lat: 60.1711, lon: 24.9414 });
  const [trashcans, setTrashcans] = useState([]);
  const [isLocationEnabled, setLocationEnabled] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null);

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
          setUserPosition(defaultPositionRef.current);
          setLocationEnabled(false);
        }
      );
    } else {
      setUserPosition(defaultPositionRef.current);
      setLocationEnabled(false);
    }
  };

  // this is a cheat way of refreshing user location would possibly like to modify it later to update OSMap "center"-property back to user location
  // const refreshLocation = () => {
  //   window.location.reload();
  // };

  useEffect(() => {
    // Checking API key for debugging and developing, delete this once it works !!!
    const apiKeyFromEnv = import.meta.env.VITE_API_KEY;
    if (apiKeyFromEnv) {
      console.log(apiKeyFromEnv);
    }
    getAllTrashcans();

    getLocation();

  }, []);

  return (
    <div id="map">
      <InfoDialog />
      <NewTrashcanDialog
        userPosition={userPosition}
        setTrashcans={setTrashcans}
        displayNotification={displayNotification}
        isLocationEnabled={isLocationEnabled}
      />
      <NotificationManager
        message={notificationMessage}
        setMessage={setNotificationMessage}
      />
      {/* If trashcan data is not available, the whole app crashes. Maybe an alternative empty map without markers? */}
      {userPosition.lat !== null && userPosition.lon !== null && (
        <OSMapMemo
          trashcans={trashcans}
          userPosition={userPosition}
          setTrashcans={setTrashcans}
        />
      )}
    </div>
  );
}

export default App;
