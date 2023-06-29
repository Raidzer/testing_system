export const pressESC = (event) => {
    return event.key === 'Escape' || event.keyCode === 27
}

const pressButton = {
    pressESC,
}

export default pressButton;