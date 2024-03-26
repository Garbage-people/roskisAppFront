import axios from "axios";

const API_URL =
    "https://roskisappback-backend-garbagepeople.rahtiapp.fi/api/trashcans";

const getAll = async () => {
    const promise = await axios.get(API_URL);
    return promise.data;
};

const updateTrashcanStatus = async (trashCanState) => {
    await axios.put(`${API_URL}/${trashCanState.id}`, trashCanState);
};

export default { getAll, updateTrashcanStatus };
