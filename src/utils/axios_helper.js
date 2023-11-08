import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post["Content-Type"] = 'application/json';


export const getAuthToken = () => {
    return window.localStorage.getItem("token");
}

export const setAuthToken = (token) => {
    window.localStorage.setItem("token", token);
}

export const request = async (method, url, data) => {
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== 'null') {
        headers = { "Authorization": `Bearer ${getAuthToken()}`, "Access-Control-Allow-Credentials": true };
    }
    const response = await axios({
        method: method,
        headers: headers,
        url: url,
        data: data
    })
    console.log(response);
    return response;

}