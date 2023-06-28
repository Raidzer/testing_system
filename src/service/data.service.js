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
        const { data } = await httpService.get(`/tickets/theme/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getDataQuestion = async ({ idQuestion, idTheme }) => {
    try {
        const { data } = await httpService.get(`/tickets/${idQuestion}`);
        return data;
    } catch (error) {
        console.log(error)
    }
}
const dataService = {
    getArticles,
    getQuestions,
    getDataQuestion,
}

export default dataService;