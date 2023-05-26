import httpService from "./http.service"

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