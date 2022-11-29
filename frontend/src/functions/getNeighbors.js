const getNeighbors = (board, bombTile) => {
    const [col, row] = bombTile;
    const neighbors = [
        [col - 1, row],
        [col + 1, row],
        [col, row - 1],
        [col, row + 1],
        [col - 1, row - 1],
        [col + 1, row - 1],
        [col + 1, row + 1],
        [col - 1, row + 1]
    ];

    return neighbors.filter(neighbor => {
        const [innerCol, innerRow] = neighbor;
        
        return (board[innerCol] && board[innerCol][innerRow]);
    });
};

export default getNeighbors;