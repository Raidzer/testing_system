export const isEmpty = (array) => {
    return array.length === 0;
}

export const isEqual = (array1, array2) => {
    let isEqual = true;
    if (array1.length === array2.length) {
        for (let i = 0; i < array1.length; i++) {
            if (JSON.stringify(array1[i]) !== JSON.stringify(array2[i])) {
                isEqual = false;
                break;
            }
        }
    } else {
        isEqual = false;
    }
    return isEqual;
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
    isEqual,
}

export default utilsArray;