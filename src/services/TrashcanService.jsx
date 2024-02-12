import axios from "axios";

const API_URL = "/api/trashcans"

const getAll = () => (
    axios
        .get(API_URL)
        .then(promise => promise.data)
        
)

export default { getAll }