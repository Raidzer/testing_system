import axios from "axios";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";

const http = axios.create({
    baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getExpiresKey();
        const refreshToken = localStorageService.getRefreshKey();
        const isExpired = refreshToken && expiresDate < Date.now();

        if (isExpired) {
            const data = await authService.refresh();
            localStorageService.setTokens(data);
        }

        const accessToken = localStorageService.getAcessToken();
        const typeToken = localStorageService.getTypeKey();

        if (accessToken) {
            config.headers = {
                ...config.headers,
                'x-token': `${typeToken} ${accessToken}`
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch,
    http,
};
export default httpService;