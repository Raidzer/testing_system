import axios from "axios";
import config from "../config.json";
import localStorageService from "./localStorage.service";

const httpAuth = axios.create({
    baseURL: config.apiEndpoint + '/auth/',
})

const authService = {
    login: async ({ username, password }) => {
        const { data } = await httpAuth.post('signin', {
            username,
            password,
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post("refreshtoken", {
            'refresh_token': localStorageService.getRefreshKey(),
        });
        return data;
    },
    logout: async () => {
        const typeToken = localStorageService.getTypeKey();
        const accessToken = localStorageService.getAcessToken();
        const config = {
            headers: {
                'x-token': `${typeToken} ${accessToken}`,
            }
        }
        const { data } = await httpAuth.post('signout', null, config)
        localStorageService.removeTokens();
        return data;
    },
    register: async ({ fullName, username, password, role=["user"]}) => {
        const { data } = await httpAuth.post('signup', {
            username,
            password,
            role,
        })
        return data;
    }
}

export default authService;