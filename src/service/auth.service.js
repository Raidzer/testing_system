import axios from "axios";
import config from "../config.json";
import localStorageService from "./localStorage.service";

const httpAuth = axios.create({
    baseURL: config.apiEndpoint + '/auth/',
})

const authService = {
    login: async ({ login, password }) => {
        const { data } = await httpAuth.post('signin', {
            'username': login,
            'password': password,
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post("refreshtoken", {
            'refresh_token': localStorageService.getRefreshKey()
        });
        return data;
    },
}

export default authService;