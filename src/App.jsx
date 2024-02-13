import { useEffect, useState } from 'react'
// import './App.css'
import TrashcanService from './services/TrashcanService'
import OSMap from './components/OSMap'

function App() {
	const [trashcans, setTrashcans] = useState([])

	useEffect(() => {
		getAllTrashcans()
	}, []);

	const getAllTrashcans = () => {
		TrashcanService
			.getAll()
			.then(response => setTrashcans(response))
	}

	return (
		<>
			<div id="map">
			<OSMap/>
			</div>
			<ul>
				{trashcans.map(trashcan =>
					<li key={trashcan.id}>{trashcan.lon} {trashcan.lat}</li>)}
			</ul>
		</>
	)
}

export default App
