export const presESC = (event) => {
    return event.key === 'Escape' || event.keyCode === 27;
}

export const presEnter = (event) => {
    return event.key === 'Enter' || event.keyCode === 13;
}

const pressButton = {
    presESC,
    presEnter,
}

export default pressButton;