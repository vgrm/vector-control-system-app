import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "https://localhost:5001/api/"

export const ENDPIONTS = {
    ARC: 'Arc',
    LINE: 'Line',
    MATCH: 'Match',
    PROJECTDATA: 'ProjectData',
    PROJECTSET: 'ProjectSet',
    USER: 'User'
}

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + endpoint + '/';

    return {
        fetchAll: () => axios.get(url, { headers: authHeader() }),
        fetchProjects: id => axios.get(url, { params: { id }, headers: authHeader() }),
        fetchAllParams: id => axios.get(url, { params: { id }, headers: authHeader() }),
        fetchById: id => axios.get(url + id, { headers: authHeader() }),
        fetchByUsername: username => axios.get(url + username, { headers: authHeader() }),
        create: data => axios.post(url, data, { headers: authHeader() }),
        update: (id, data) => axios.put(url + id, data, { headers: authHeader() }),
        delete: id => axios.delete(url + id, { headers: authHeader() }),
        patch: (id, data) => axios.patch(url + id, data, { headers: authHeader() }),
    }
}