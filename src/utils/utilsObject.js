export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

const utilsObject = {
    deepClone,
}

export default utilsObject;