import { useEffect, useState } from 'react'
import './App.css'
import TrashcanService from './services/TrashcanService'

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
			<ul>
				{trashcans.map(trashcan =>
					<li key={trashcan.id}>{trashcan.lon} {trashcan.lat}</li>)}
			</ul>
		</>
	)
}

export default App
