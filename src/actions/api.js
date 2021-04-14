import axios from "axios";

//const BASE_URL = "http://localhost:44333/api/"
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
        fetchAll: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        create: newRecord => axios.post(url, newRecord),
        update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id)
    }
}