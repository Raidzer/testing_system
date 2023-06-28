export const isEmpty = (array) => {
    return array.length === 0;
}


export const isMultiAnswers = (array) => {
    const newArray = array.filter((item) => item.correctAnswer === true);
    return newArray.length > 1;
}

export const haveTrueAnswer = (array) => {
    const newArray = array.filter((item) => item.correctAnswer === true);
    return newArray.length > 0;
}

const utilsArray = {
    isEmpty,
    isMultiAnswers,
    haveTrueAnswer,
}

export default utilsArray;