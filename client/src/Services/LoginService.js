import axios from "axios";
import PORT from "./_port.js";

const AUTHENTICATE_URL = PORT + '/authenticate';

class LoginService{
    authenticate(jwtrequest){
        return axios.post(AUTHENTICATE_URL, jwtrequest);
    }
}

export default new LoginService();