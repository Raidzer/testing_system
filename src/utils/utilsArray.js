
export const isEmpty = (array) => {
    return array.length === 0;
}


export const isMultiAnswers = (array) => {
    const newArray = array.filter((item) => item.correctAnswer === true);
    return newArray.length > 1;
}

const utilsArray = {
    isEmpty,
    isMultiAnswers,
}

export default utilsArray;