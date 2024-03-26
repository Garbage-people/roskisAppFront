import { useEffect, useState } from "react";
import TrashcanService from "./services/TrashcanService";
import OSMap from "./components/OSMap";
import "./App.css";
import "./index.css";

function App() {
  const [userPosition, setUserPosition] = useState({ lat: null, lon: null });
  const defaultPosition = { lat: 60.1711, lon: 24.9414 };
  const [trashcans, setTrashcans] = useState([]);

  const getAllTrashcans = async () => {
    try {
      const res = await TrashcanService.getAll();
      setTrashcans(res);
    } catch (err) {
      console.error("Error fetching trashcans", err);
    };
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setUserPosition(defaultPosition);
        }
      );
    } else {
      setUserPosition(defaultPosition);
    }
  };

  // this is a cheat way of refreshing user location would possibly like to modify it later to update OSMap "center"-property back to user location
  const refreshLocation = () => {
    window.location.reload();
  };

  useEffect(() => {
    getAllTrashcans();
    getLocation();
  }, []);

  return (
    <>
      <div id="map">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          id="refreshButton"
          onClick={refreshLocation}
        >
          refresh
        </button>
        {userPosition.lat !== null && userPosition.lon !== null && (
          <OSMap trashcans={trashcans} userPosition={userPosition} />
        )}
      </div>
    </>
  );
}

export default App;
