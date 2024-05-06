import { memo, useEffect, useState } from "react";
import useLocation from "./hooks/useLocation";
import TrashcanService from "./services/TrashcanService";
import OSMap from "./components/OSMap";
import InfoDialog from "./components/InfoDialog";
import NewTrashcanDialog from "./components/NewTrashcanDialog";
import NotificationManager from "./components/NotificationManager";
import "./App.css";

const OSMapMemo = memo(OSMap)

function App() {
  const [trashcans, setTrashcans] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const { userPosition, isLocationEnabled } = useLocation();

  const displayNotification = (text, status, timeout) => {
    setNotificationMessage({ text, status, timeout });
  };

  //Gets all trashcan locations from the database
  const getAllTrashcans = async () => {
    const res = await TrashcanService.getAll();
    setTrashcans(res);
    if (res === null) {
      displayNotification("Tietokantaan ei saada yhteyttä", "error", 60000)
    }
  };

  // this is a cheat way of refreshing user location would possibly like to modify it later to update OSMap "center"-property back to user location
  // const refreshLocation = () => {
  //   window.location.reload();
  // };

  useEffect(() => {
    // Checking API key for debugging and developing, delete this once it works !!!
    const apiKey = import.meta.env?.VITE_API_KEY;
    if (apiKey) {
      console.log(apiKey);
    } else {
      console.log("no api key found!");
    }
    getAllTrashcans();
  }, []);

  return (
    <div id="map">
      <InfoDialog />
      <NewTrashcanDialog
        userPosition={userPosition}
        setTrashcans={setTrashcans}
        displayNotification={displayNotification}
        isAddingEnabled={trashcans !== null && isLocationEnabled === true}
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
