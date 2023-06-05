function isEmptyString(str) {
    if (!str) return true;
    return str.trim().length === 0;
}

const utilsString = {
    isEmptyString,
}

export default utilsString;