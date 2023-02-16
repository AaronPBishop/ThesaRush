export const hasLightningTile = (board, tileValues, totalVals) => {
    for (let i = 0; i < totalVals; i++) {
        const [col, row] = tileValues[i];
        if (board[col][row] !== null) {
            if (typeof (board[col][row].properties === 'object') && (board[col][row].properties.lightning)) return true;
        };
    };
};