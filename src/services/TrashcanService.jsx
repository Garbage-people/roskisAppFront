import axios from "axios";

const API_URL = "http://localhost:8080/api/trashcans"

const getAll = () => (
    axios
        .get(API_URL)
        .then(promise => promise.data)
        
)

export default { getAll }