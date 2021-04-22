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

//let headers = { "Content-type": "application/json"}
export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + endpoint + '/';
    
    //let headers = { "Content-type": "multipart/form-data"}
    
    return {
        fetchAll: () => axios.get(url),
        fetchProjects: id => axios.get(url,{params: {id}}),
        fetchById: id => axios.get(url + id),
        create: newRecord => axios.post(url, newRecord),
        update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id),
        patch: (id, updatedRecord) => axios.patch(url + id, updatedRecord),
    }
}