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