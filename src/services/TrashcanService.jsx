import axios from "axios";

const API_URL = "http://roskisappback-backend-garbagepeople.rahtiapp.fi/api/trashcans"

const getAll = () => (
    axios
        .get(API_URL)
        .then(promise => promise.data)
        
)

export default { getAll }