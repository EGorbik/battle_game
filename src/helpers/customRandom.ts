export const getRandomValueFromInterval = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

export const generateTwoRandomNumbersFromInterval = (min, max) => {
    let first = Math.round(Math.random() * (max - min) + min);
    let second = Math.round(Math.random() * (max - min) + min);
    if(second === first) {
        second !== max ? second += 1 : second -= 1;
    }
    return [ first, second ]
}