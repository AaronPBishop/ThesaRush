// const mockData = [
//     ['e', 3],
//     ['s', 5],
//     ['c', 1],
//     ['a', 0],
//     ['c', 2],
//     ['s', 4]
// ];

const orderInput = (inputValues) => {
    const orderObj = {};
    for (let i = 0; i < inputValues.length; i++) {
        const [letter, order] = inputValues[i];

        if (orderObj[order] === undefined) orderObj[order] = letter;
    };

    const orderedString = Object.values(orderObj).toString();
    return orderedString.split(',').join('');
};

export default orderInput;