import axios from "axios";
import PORT from "./_port.js";

const NAME = '/device'

const DEVICES_URL = PORT + NAME;
const FIND_BY_ID_URL = DEVICES_URL + "/find/";
const FIND_BY_USER_USERNAME_URL = DEVICES_URL + "/findAllByUseranme/";
const FIND_BY_DEVICE_ID_DATE_URL = DEVICES_URL + "/findReadings/";

class DeviceService{
    getDevices(){
        return axios.get(DEVICES_URL);
    }

    postDevice(device){
        return axios.post(DEVICES_URL, device);
    }

    putDevice(device){
        return axios.put(DEVICES_URL, device);
    }

    deleteDevice(id){
        return axios.delete(DEVICES_URL + "/" + id);
    }

    getDeviceById(id){
        return axios.get(FIND_BY_ID_URL + id);
    }

    getDevicesByUserUsername(username){
        return axios.get(FIND_BY_USER_USERNAME_URL + username);
    }

    addReadingToDevice(deviceId, readingId){
        return axios.put(DEVICES_URL + "/" + deviceId + "/" + readingId);
    }

    findReadingsByDeviceIdDate(deviceId, date){
        return axios.get(FIND_BY_DEVICE_ID_DATE_URL + deviceId + "/" + date);
    }
}

export default new DeviceService();