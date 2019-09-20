//https://leetcode-cn.com/problems/combination-sum-iii/
var combinationSum3 = function(k, n) {
    let result = [];
    function helper(start, k, n, ret) {
        if (k === 0) {
            if (n === 0) {
                result.push(ret);
            }
            return;
        }
        for (let i = start; i < 10; i++) {
            if (n - i < 0) {
                break;
            }
            let temp = ret.concat(i);
            helper(i + 1, k - 1, n - i, temp);
        }
    }
    helper(1, k, n, []);
    return result;
};
