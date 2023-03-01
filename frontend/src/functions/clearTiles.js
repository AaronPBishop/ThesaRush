import randKeyGen from "./randKeyGen.js";
import getNeighbors from "./getNeighbors.js";

import sfx1 from '../impactMining_000.ogg';
import sfx2 from '../impactMining_001.ogg';

const lightningSfx = new Audio(sfx1);
const useLifeSfx = new Audio(sfx2);

export const hasLightningTile = (board, tileValues, totalVals) => {
    for (let i = 0; i < totalVals; i++) {
        const [col, row] = tileValues[i];
        if (board[col][row] !== null) {
            if (typeof (board[col][row].properties === 'object') && (board[col][row].properties.lightning)) return true;
        };
    };

    return false;
};

export const clearBottomRows = (totalVals, board, clearedTiles, randKeys) => {
    let tilesCleared = 0;
    
    for (let i = 0; i < board.length; i++) {
        const currColumn = board[i];

        if (currColumn[currColumn.length - 1] !== null) {
            currColumn[currColumn.length - 1] = null;
            tilesCleared += 1;

            if (totalVals >= 10 && currColumn[currColumn.length - 2] !== null) {
                currColumn[currColumn.length - 2] = null;
                tilesCleared += 1;

                clearedTiles.push([i, currColumn.length - 2]);
            };

            if (totalVals >= 12 && currColumn[currColumn.length - 3] !== null) {
                currColumn[currColumn.length - 3] = null;
                tilesCleared += 1;

                clearedTiles.push([i, currColumn.length - 3]);
            };

            clearedTiles.push([i, currColumn.length - 1]);
            
            for (let j = currColumn.length - 1; j > 0; j--) {
                if (currColumn[j] !== null && currColumn[j] !== undefined) {
                    if (currColumn[j].type === 'initial' || currColumn[j].type === 'new') {
                        currColumn[j].type = 'rearranged';

                        const newRandKey = randKeyGen(randKeys);

                        currColumn[j].randKey = newRandKey;
                        randKeys.push(newRandKey);

                        continue;
                    };

                    if (currColumn[j].type === 'rearranged') {
                        const newRandKey = randKeyGen(randKeys);

                        currColumn[j].randKey = newRandKey;
                        randKeys.push(newRandKey);

                        continue;
                    };
                };
            };
        };
    };

    return {
        board: board,
        clearedTiles: clearedTiles,
        tilesCleared: tilesCleared,
        randKeys: randKeys
    };
};

export const clearColumnsFunc = (board) => {
    useLifeSfx.play();
    
    const clearedTiles = [];

    for (let row = 0; row < board.length; row++) {
        if (board[row][3] === null) {
            let counter = 0;

            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col] !== null && counter < 3) {
                    board[row][col] = null;

                    clearedTiles.push([row, col]);
                    counter++;
                };
            };

            continue;
        };

        if (board[row][2] !== null || board[row][3] !== null) {
            for (let col = 0; col < board[row].length; col++) {
                board[row][col] = null;

                clearedTiles.push([row, col]);
            };
        };
    };

    return { board: board, clearedTiles: clearedTiles };
};

const clearTilesFunc = (totalVals, values, board, clearedTiles, randKeys) => {
    let tilesCleared = 0;
    let stoneCrusher = 0;
    let bombardier = 0;
    let voidMaster = 0;
    let fulminator = 0;
    let usedLightning = false;

    for (let i = 0; i < totalVals; i++) {
        const [col, row] = values[i];

        if (board[col][row] !== null) {
            if (board[col][row].properties === 'bomb') {
                bombardier += 1;

                const neighbors = getNeighbors(board, values[i]);

                for (let i = 0; i < neighbors.length; i++) {
                    const [neighborCol, neighborRow] = neighbors[i];

                    board[neighborCol][neighborRow] = null;
                    clearedTiles.push([neighborCol, neighborRow]);
                    tilesCleared += 1;

                    for (let j = board[neighborCol].length - 1; j > 0; j--) {
                        if (board[neighborCol][neighborRow] !== null && (board[neighborCol][neighborRow].type === 'initial' || board[neighborCol][neighborRow].type === 'new')) {
                            board[neighborCol][neighborRow].type = 'rearranged';

                            const newRandKey = randKeyGen(randKeys);
                            
                            board[neighborCol][neighborRow].randKey = newRandKey;
                            randKeys.push(newRandKey);

                            continue;
                        };

                        if (board[neighborCol][neighborRow] !== null && (board[neighborCol][neighborRow].type === 'rearranged')) {
                            const newRandKey = randKeyGen(randKeys);
                            
                            board[neighborCol][neighborRow].randKey = newRandKey;
                            randKeys.push(newRandKey);

                            continue;
                        };
                    };
                };
            };

            if (typeof (board[col][row].properties === 'object') && (board[col][row].properties.lightning)) {
                lightningSfx.play();

                fulminator += 1;
                usedLightning = true;

                for (let innerRow = 0; innerRow < board.length; innerRow++) {
                    let counter = 0;
                
                    for (let innerCol = 0; innerCol < board[innerRow].length; innerCol++) {
                        if (board[innerRow][innerCol] !== null && counter < board[col][row].properties.strength) {
                            if (!board[innerRow][innerCol].properties.lightning) board[innerRow][innerCol] = null;
                        
                            clearedTiles.push([innerRow, innerCol]);
                            tilesCleared += 1;
                            counter++;
                        };
                    };
                };
            };

            if (typeof board[col][row].properties === 'object' && (board[col][row].properties.stone) && board[col][row].properties.stone > 1) {
                board[col][row].properties.stone -= 1;
            } else {
                if (board[col][row].properties.stone) stoneCrusher += 1;
                if (typeof board[col][row].properties === 'object' && (board[col][row].properties.void)) voidMaster += 1;

                board[col][row] = null;
                tilesCleared += 1;

                for (let j = board[col].length; j > 0; j--) {
                    if (j < row) {
                        if (board[col][j] !== null && board[col][j] !== undefined) {
                            if (board[col][j].type === 'initial' || board[col][j].type === 'new') {
                                board[col][j].type = 'rearranged';

                                const newRandKey = randKeyGen(randKeys);
                            
                                board[col][j].randKey = newRandKey;
                                randKeys.push(newRandKey);

                                continue;
                            };

                            if (board[col][j].type === 'rearranged') {
                                const newRandKey = randKeyGen(randKeys);
                            
                                board[col][j].randKey = newRandKey;
                                randKeys.push(newRandKey);

                                continue;
                            };
                        };
                    };
                };
            };
        };
    };

    return {
        board: board,
        clearedTiles: clearedTiles,
        tilesCleared: tilesCleared,
        randKeys: randKeys,
        stoneCrusher: stoneCrusher,
        bombardier: bombardier,
        voidMaster: voidMaster,
        fulminator: fulminator,
        usedLightning: usedLightning
    }; 
};

export default clearTilesFunc;