import { API } from "../../backend";

export const createTicket = (userId, token, info) => {
    return fetch(`${API}/ticket/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(info),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const getUserTickets = (userId, token) => {
    return fetch(`${API}/tickets/user/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};



export const updateProfile = (userId, token, user) => {
    
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-type":"application/json"
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            return response.json();
        })
        .catch((e) => console.log(e));
};


export const getOneUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
}