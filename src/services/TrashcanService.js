import axios from "axios";

const API_URL =
  "https://roskisappback-backend-garbagepeople.rahtiapp.fi/api/trashcans";

const getAll = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch(err) {
        console.error("Error fetching trashcan data", err);
    }
};

const updateTrashcanStatus = async (trashCanState) => {
    await axios.put(`${API_URL}/${trashCanState.id}`, trashCanState);
};

export default { getAll, updateTrashcanStatus };
