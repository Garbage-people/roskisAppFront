import { useEffect, useState } from 'react'
// import './App.css'
import TrashcanService from './services/TrashcanService'
import OSMap from './components/OSMap'

function App() {
	const [userLat, setUserLat] = useState(null);
	const [userLon, setUserLon] = useState(null);
	const [trashcans, setTrashcans] = useState([]);

	useEffect(() => {
		getAllTrashcans();
	}, []);

	const getAllTrashcans = () => {
		TrashcanService
			.getAll()
			.then(response => setTrashcans(response))
	}

	const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    setUserLat(position.coords.latitude);
                    setUserLon(position.coords.longitude);
                },
                function (error) {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported.');
        }
    };

	return (
		<>
			<div id="map">
			<OSMap/>
			</div>
			<ul>
				{trashcans.map(trashcan =>
					<li key={trashcan.id}>{trashcan.lon} {trashcan.lat}</li>)}
			</ul>
			<button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                onClick={getLocation}
            >
                Get Location
            </button>
            <p>
                User Location: {userLat !== null && userLon !== null ? `${userLat}, ${userLon}` : 'Not available'}
            </p>
		</>
	)
}

export default App
