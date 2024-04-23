import { useEffect, useRef, useState } from "react";
import TrashcanService from "./services/TrashcanService";
import OSMap from "./components/OSMap";
import ConfirmDialog from "./components/ConfirmDialog";
import "./App.css";
import "./index.css";
import InfoDialog from "./components/InfoDialog";


function App() {
  const [userPosition, setUserPosition] = useState({ lat: null, lon: null });
  const defaultPosition = { lat: 60.1711, lon: 24.9414 };
  const [trashcans, setTrashcans] = useState([]);
  const [isLocationEnabled, setLocationEnabled] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const infoDialogRef = useRef(null);

  const getAllTrashcans = async () => {
    try {
      const res = await TrashcanService.getAll();
      setTrashcans(res);
    } catch (err) {
      console.error("Error fetching trashcans", err);
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
    try {
      if (isLocationEnabled) {
        const newTrashcan = {
          lat: userPosition.lat,
          lon: userPosition.lon,
        };
        await TrashcanService.addTrashcan(newTrashcan);
        const updatedTrashcans = await TrashcanService.getAll();
        setTrashcans(updatedTrashcans);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
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
    <>
      <div id="map">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          id="infoButton"
          onClick={toggleInfoDialog}
        >
          ℹ️
        </button>
        <InfoDialog toggleInfoDialog={toggleInfoDialog} infoDialogRef={infoDialogRef} />

        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          id="refreshButton"
          onClick={refreshLocation}
        >
          PÄIVITÄ
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          id="addButton"
          onClick={handleOpenDialog}
          disabled={!isLocationEnabled}
        >
          +
        </button>

        <ConfirmDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDialog}
        />

        {userPosition.lat !== null && userPosition.lon !== null && (
          <OSMap
            trashcans={trashcans}
            userPosition={userPosition}
            setTrashcans={setTrashcans}
          />
        )}
      </div>
    </>
  );
}

export default App;
