import httpService from "./http.service"

export const createNewTheme = async (subject, id) => {
    try {
        const { data } = await httpService.put(`/themes`, {
            subject,
            id,
        })
        return data;
    } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
            throw new Error("Произошла ошибка при создании темы, имя уже занято")
        }
    }
}

export const deleteTheme = async (id, subject) => {
    try {
        const { data } = await httpService.delete(`/themes`, {
            data: {
                id,
            }
        })
        return data;
    } catch (error) {
        console.log(error)
    }
}

const adminService = {
    createNewTheme,
    deleteTheme,
}

export default adminService;