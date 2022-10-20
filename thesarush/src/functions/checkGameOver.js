const checkGameOver = (board) => {
    for (let row = 0; row < board.length; row++) {
        if (board[row][0] !== null) return true;
    };

    return false;
};

export default checkGameOver;