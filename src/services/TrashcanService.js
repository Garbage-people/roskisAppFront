import axios from "axios";

const API_URL =
  "https://roskisappback-backend-garbagepeople.rahtiapp.fi/api/trashcans";
//  "http://localhost:8080/api/trashcans";

const getAll = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch(err) {
        console.error("Error fetching trashcan data", err);
    };
};

const updateTrashcanStatus = async (trashCanState) => {
    try {
       const res = await axios.put(`${API_URL}/${trashCanState.id}`, trashCanState);
    } catch(err) {
        console.error("Error updating trashcan status", err);
    };
};

const addTrashcan = async (newTrashcan) => {
    try {
        const res = await axios.post(`${API_URL}`, newTrashcan);
        console.log(res.data)
    } catch(err) {
        console.error("Error adding a trashcan", err)
    }
}

export default { getAll, updateTrashcanStatus, addTrashcan };
