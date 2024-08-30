import localStorageService from "./localStorage.service";
import httpService from "./http.service";
import axios from "axios";
import configFile from "../config.json";

const { origin } = document.location;


const http = axios.create({
    baseURL: `${origin}:8888`
})


/* const http = axios.create({
    baseURL: configFile.apiEndpoint
})
 */

const authService = {
    login: async ({ username, password }) => {
        localStorageService.removeTokens();
        try {
            const { data } = await httpService.post('/auth/signin', {
                username,
                password,
            });
            return data;
        } catch (error) {
            if (error.response.status === 401) {
                throw new Error("Неверное имя пользователя или пароль");
            }
        }

    },
    refresh: async () => {

        try {
            const { data } = await http.post("/auth/refreshtoken", {
                'refresh_token': localStorageService.getRefreshKey(),
            });
            return data;
        } catch (error) {
            console.log("Ошибка обновления токена, сессия закрыта")
            localStorageService.removeTokens();
            window.location.href = '/';
        }

    },
    logout: async () => {
        const typeToken = localStorageService.getTypeKey();
        const accessToken = localStorageService.getAcessToken();
        const config = {
            headers: {
                'x-token': `${typeToken} ${accessToken}`,
            }
        }
        const { data } = await httpService.post('/auth/signout', null, config)
        localStorageService.removeTokens();
        return data;
    },
    register: async ({ firstName, lastName, username, password, roles = ["user"] }) => {
        try {
            const { data } = await httpService.post('/auth/signup', {
                "first_name": firstName,
                "last_name": lastName,
                username,
                password,
                roles,
            })
            return data;
        } catch (error) {
            if (error.response.status === 400) {
                throw new Error("Пользователь с таким именем уже существует");
            }
        }
    }
}

export default authService;