const findLetter = (col) => {
    for (let i = 0; i < col.length; i++) {
        if (col[i] !== null) return true;
    };
    return false;
};

const needSplice = (col) => {
    for (let i = 0; i < col.length; i++) {
        if (col[i] !== null) {
            for (let j = i; j < col.length; j++) {
                if (col[j] === null) return j;
            };
        };
    };
    return false;
};

const performSplice = (board) => {
    for (let row = 0; row < board.length; row++) {
        for (let col = board[row].length - 1; col >= 0; col--) {
            if (findLetter(board[row])) {
                if (needSplice(board[row])) {
                    const index = needSplice(board[row]);
                    board[row].splice(index, 1);
                    board[row].unshift(null);
                };
            };
        };
    };
    return board;
};

export default performSplice;