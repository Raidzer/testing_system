import httpService from "./http.service"

export const getArticles = async (id) => {
    try {
        const { data } = await httpService.get(`/articles/theme/${id}`)
        return data;
    } catch (error) {
        console.log(error)
    }
}

const dataService = {
    getArticles,
}

export default dataService;