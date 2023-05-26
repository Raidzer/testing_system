import httpService from "./http.service"

export const getArticles = async (id) => {
    try {
        const { data } = await httpService.get(`/articles/theme/${id}`)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const createNewTheme = async (subject) => {
    try {
        const { data } = await httpService.put(`/themes`, {
            subject,
        })
        return data;
    } catch (error) {
        console.log(error);
    }
}

const dataService = {
    getArticles,
    createNewTheme,
}

export default dataService;