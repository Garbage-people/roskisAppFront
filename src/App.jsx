import { useEffect, useState } from "react";
import TrashcanService from "./services/TrashcanService";
import OSMap from "./components/OSMap";
import ConfirmDialog from "./components/ConfirmDialog";
import "./App.css";
import "./index.css";

function App() {
  const [userPosition, setUserPosition] = useState({ lat: null, lon: null });
  const defaultPosition = { lat: 60.1711, lon: 24.9414 };
  const [trashcans, setTrashcans] = useState([]);
  const [isLocationEnabled, setLocationEnabled] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

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
    if (isLocationEnabled) {
      const newTrashcan = {
        lat: userPosition.lat,
        lon: userPosition.lon,
      };
      const res = await TrashcanService.addTrashcan(newTrashcan);
      console.log(res.response.status);
      // Todo: if status 200 or 400 -> do stuff

      const updatedTrashcans = await TrashcanService.getAll();
      setTrashcans(updatedTrashcans);
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

  const modal = document.querySelector("#modal");
  const openModal = document.querySelector("#openModal");
  const closeModal = document.querySelector("#closeModal");

  if (modal) {
    openModal && openModal.addEventListener("click", () => modal.showModal());
    closeModal && closeModal.addEventListener("click", () => modal.close());
  }

  return (
    <>
      <div id="map">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          id="openModal"
        >
          <img
            src="images/inffoIkoni.png"
            alt="Trashbin"
            width="50px"
            height="50px "
          ></img>
        </button>

        <dialog id="modal" className="dialog">
          <button id="closeModal" className="dialog-close-btn">
            X
          </button>
          <img
            src="images/RoskisVihreä.png"
            alt="Trashbin"
            width="100px"
            height="100px "
          ></img>
          <p>Tämä kuvake tarkoittaa roskiksen olevan käytössä</p>

          <img
            src="images/RoskisPunainen.png"
            alt="Trashbin"
            width="100px"
            height="100px "
          ></img>
          <p>Tämä kuvake tarkoittaa roskiksen olevan täynnä</p>

          <img
            src="images/RoskisRuksi.png"
            alt="Trashbin"
            width="100px"
            height="100px "
          ></img>
          <p>Tämä kuva tarkoittaa rikkinäistä roskista</p>
        </dialog>

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
          <img
            src="images/RoskisLisääUusi.png"
            alt="Trashbin"
            width="50px"
            height="50px "
          ></img>
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
