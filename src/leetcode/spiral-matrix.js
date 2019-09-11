var spiralOrder = function(matrix) {
    let result = [];
    let flag = [];
    for (let i = 0; i < matrix.length; i++) {
        flag[i] = [];
        for (let j = 0; j < matrix[i].length; j++) {
            flag[i][j] = 0;
        }
    }
    let dr = [0, 1, 0, -1];
    let dc = [1, 0, -1, 0];
    let row = matrix.length,
        column = matrix[0].length;
    let r = 0,
        c = 0,
        i = 0,
        k = 0;
    for (i = 0; i < row * column; i++) {
        flag[r][c] = 1;
        result.push(matrix[r][c]);
        let newR = r + dr[k];
        let newC = c + dc[k];
        if (
            newR >= 0 &&
            newR < row &&
            newC >= 0 &&
            newC < column &&
            !flag[newR][newC]
        ) {
            r = newR;
            c = newC;
        } else {
            k++;
            k = k % 4;
            r += dr[k];
            c += dc[k];
        }
    }
    return result;
};
let ary = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
spiralOrder(ary);

//旋转矩阵 https://leetcode-cn.com/problems/spiral-matrix/
