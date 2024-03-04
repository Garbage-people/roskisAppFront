import { useEffect, useState } from 'react';
import TrashcanService from './services/TrashcanService';
import OSMap from './components/OSMap';
import "./App.css"
import "./index.css"

function App() {
    const [userLat, setUserLat] = useState(null);
    const [userLon, setUserLon] = useState(null);
	const [trashcans, setTrashcans] = useState([]);
	const defaultLat = 60.1711;
	const defaultLon = 24.9414;
	

    const getAllTrashcans = () => {
        TrashcanService.getAll()
            .then(response => setTrashcans(response))
            .catch(error => console.error('Error fetching trashcans:', error));
    };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setUserLat(position.coords.latitude);
                    setUserLon(position.coords.longitude);
                },
                error => {
                    console.error('Error getting location:', error);
                    setUserLat(defaultLat);
                    setUserLon(defaultLon);
                }
            );
        } else {
            setUserLat(defaultLat);
            setUserLon(defaultLon);
        }
    };

    // this is a cheat way of refreshing user location would possibly like to modify it later to update OSMap "center"-property back to user location
    const refreshLocation = () => {
         window.location.reload()
    }

    useEffect(() => {
        getAllTrashcans();
        getLocation();
    }, []);

    return (
        <>
            <div id="map">
                <button 
                	className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" 
                    id='refreshButton'
                    onClick={refreshLocation}>
                    refresh
                    </button>
                {userLat !== null && userLon !== null &&
                    <OSMap trashcans={trashcans} userLat={userLat} userLon={userLon} />
                }
            </div>
        </>
    );
}

export default App;
