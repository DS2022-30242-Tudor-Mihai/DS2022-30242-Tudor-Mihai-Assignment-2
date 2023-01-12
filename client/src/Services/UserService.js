import axios from "axios";
import PORT from "./_port.js";

const NAME = '/user'

const USERS_URL = PORT + NAME ;
const FIND_BY_ID_URL = USERS_URL + "/find1/"
const FIND_BY_USERNAME_URL = USERS_URL + "/find2/"

class UserService{
    getUsers(){
        return axios.get(USERS_URL);
    }

    postUser(user){
        return axios.post(USERS_URL, user);
    }

    putUser(user){
        return axios.put(USERS_URL, user);
    }

    deleteUser(id){
        return axios.delete(USERS_URL + "/" + id);
    }

    findbyid(id){
        return axios.get(FIND_BY_ID_URL + id);
    }

    findbyusername(username){
        return axios.get(FIND_BY_USERNAME_URL + username);
    }

    addDeviceToUser(userId, deviceId){
        return axios.put(USERS_URL + "/" + userId + "/" + deviceId);
    }
}

export default new UserService();