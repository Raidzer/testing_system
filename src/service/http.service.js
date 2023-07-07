import axios from "axios";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";

const { origin } = document.location;
console.log(process.env.REACT_APP_TEST);

const http = axios.create({
    baseURL: `${origin}:8888`
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

http.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        if (error && error.response && error.response.status === 404) {
            const data = await authService.refresh();
            localStorageService.setTokens(data);
            window.location.href = '/login';
        } else if (error && error.response && error.response.status === 401) {
            const data = await authService.refresh();
            localStorageService.setTokens(data);
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch,
    http,
};
export default httpService;