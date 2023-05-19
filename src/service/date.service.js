const dateService = {
    getDate: (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month.toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${day}.${month}.${year}`
    },
    getTime: (dateString) => {
        const date = new Date(dateString);

        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${hour}:${minute}:${seconds}`
    }
}

export default dateService;