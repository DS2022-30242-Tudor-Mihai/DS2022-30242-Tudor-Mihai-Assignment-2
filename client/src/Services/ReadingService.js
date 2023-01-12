import axios from "axios";
import PORT from "./_port.js";

const NAME = '/reading'

const READINGS_URL = PORT + NAME;
const FIND_BY_DEVICE_ID_URL = READINGS_URL + "/findAllByDeviceId/";

class ReadingService{
    getReadings(){
        return axios.get(READINGS_URL);
    }

    postReading(reading){
        return axios.post(READINGS_URL, reading);
    }

    putReading(reading){
        return axios.put(READINGS_URL, reading);
    }

    deleteReading(id){
        return axios.delete(READINGS_URL + "/" + id);
    }

    getReadingsByDeviceId(id){
        return axios.get(FIND_BY_DEVICE_ID_URL + id);
    }
}

export default new ReadingService();