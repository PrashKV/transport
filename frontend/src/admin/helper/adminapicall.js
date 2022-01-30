import { API } from "../../backend";

export const createRecord = (userId, token, date) => {
    return fetch(`${API}/record/addrecord/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(date),
    })
        .then((response) => {
            return response.json();
        })
        .catch((e) => console.log(e));
};



export const getEveryRecordID = (userId, token) => {
    return fetch(`${API}/records/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((e) => console.log(e));
}

export const getOneRecord = (recordId, userId, token) => {
    return fetch(`${API}/records/${recordId}/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((e) => console.log(e));
}
export const createBus = (userId, token, bus) => {
  
    return fetch(`${API}/bus/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",

            Authorization: `Bearer ${token}`,
        },
        body: bus,
    })
        .then((response) => {
            return response.json();
        })
        .catch((e) => console.log(e));
};

//get details of all buses
export const getAllBus = () => {
    return fetch(`${API}/bus/getbuses`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((e) => console.log(e));
};

export const getBus = (busId) => {
    return fetch(`${API}/bus/${busId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((e) => console.log(e));
};

//delete a bus

export const deleteBus = (busId, userId, token) => {
    return fetch(`${API}/bus/${busId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((e) => console.log(e));
};

//update a bus
export const updateBus = (busId, userId, token, bus) => {
    return fetch(`${API}/bus/update/${busId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: bus,
    })
        .then((response) => {
            return response.json();
        })
        .catch((e) => console.log(e));
};

//TICKETS

export const getEveryTicket = (userId, token) => {
    return fetch(`${API}/tickets/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((e) => console.log(e));
};
