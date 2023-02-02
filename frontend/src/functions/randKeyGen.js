const randKeyGen = (randKeys) => {
    const randKey = Math.floor(Math.random() * 9999999999);

    if (!randKeys.includes(randKey)) return randKey;
    if (randKeys.includes(randKey)) return randKeyGen(randKeys);
};

export default randKeyGen;