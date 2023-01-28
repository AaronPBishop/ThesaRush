const randKeyGen = (randKeys) => {
    const randKey = Math.floor(Math.random() * 100000000);

    if (!randKeys.includes(randKey)) return randKey;
    if (randKeys.includes(randKey)) return randKeyGen(randKeys);
};

export default randKeyGen;