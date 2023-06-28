import httpService from "./http.service"

export const getArticles = async (id) => {
    try {
        const { data } = await httpService.get(`/articles/theme/${id}`)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getQuestions = async (id) => {
    try {
        const {data} = await httpService.get(`/tickets/theme/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}
const dataService = {
    getArticles,
    getQuestions,
}

export default dataService;