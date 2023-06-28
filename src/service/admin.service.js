import httpService from "./http.service"

export const createTheme = async ({ title, id }) => {
    try {
        const { data } = await httpService.put(`/themes`, {
            title,
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

export const updateTitleTheme = async ({ title, id }) => {
    try {
        const { data } = await httpService.put(`/themes`, {
            title,
            id,
        })
        return data;
    } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
            throw new Error("Произошла ошибка при изменении имени темы, имя уже занято")
        }
    }
}

export const deleteTheme = async ({ id }) => {
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

export const createArticle = async ({ title, id, idTheme, description }) => {
    try {
        const { data } = await httpService.post(`/articles/theme/${idTheme}`, {
            title,
        })
        return data;
    } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
            throw new Error("Произошла ошибка при создании главы, имя уже занято");
        }
    }
}

export const updateTitleArticle = async ({ title, id, idTheme, description }) => {
    try {
        const { data } = await httpService.patch(`/articles/theme/${idTheme}`, {
            title,
            id,
        });
        return data;
    } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
            throw new Error("Произошла ошибка при создании главы, имя уже занято");
        }
    }
}

export const updateArticle = async ({ title, id, idTheme, description }) => {
    try {
        const { data } = await httpService.put(`/articles/theme/${idTheme}`, {
            title,
            id,
            description,
        });
        return data;
    } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
            throw new Error("Произошла ошибка при создании главы, имя уже занято");
        }
    }
}

export const deleteArticle = async ({ title, id, idTheme, description }) => {
    try {
        const { data } = await httpService.delete(`/articles/theme/${idTheme}`, {
            data: {
                id,
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const createQuestion = async ({ title, idTheme }) => {
    try {
        const { data } = await httpService.put(`/tickets`, {
            title,
            'theme_id': idTheme
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateQuestion = async ({ id, title, idTheme }) => {
    console.log(id, title)
    try {
        const { data } = await httpService.put(`/tickets`, {
            id,
            title,
            'theme_id': idTheme,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

const adminService = {
    createTheme,
    updateTitleTheme,
    deleteTheme,
    createArticle,
    deleteArticle,
    updateTitleArticle,
    updateArticle,
    createQuestion,
}

export default adminService;