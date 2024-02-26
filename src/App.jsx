// App.jsx
import { useEffect, useState } from 'react';
import TrashcanService from './services/TrashcanService';
import OSMap from './components/OSMap';

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

    useEffect(() => {
        getAllTrashcans();
        getLocation();
    }, []);

    return (
        <>
            <div id="map">
                {userLat !== null && userLon !== null &&
                    <OSMap trashcans={trashcans} userLat={userLat} userLon={userLon} />
                }
            </div>

			{/* list of the trashcan locations for early iteration, to be replaced with map markers */}
            <ul>
                {trashcans.map(trashcan =>
                    <li key={trashcan.id}>{trashcan.lon} {trashcan.lat}</li>
                )}
            </ul>
        </>
    );
}

export default App;
