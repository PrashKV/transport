import { API } from "../../backend";

export const createRecord = (userId, token, date) => {
    console.log(date);
    console.log(API)
    return fetch(`${API}/record/addrecord/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(date),
    })
        .then(response => {
            return response.json()
        })
        .catch(e=>console.log(e));
};
