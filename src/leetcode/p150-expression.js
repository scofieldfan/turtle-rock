//https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/submissions/
var evalRPN = function(tokens) {
    let stack = [];
    for (let i = 0; i < tokens.length; i++) {
        if (
            tokens[i] === "+" ||
            tokens[i] === "-" ||
            tokens[i] === "*" ||
            tokens[i] === "/"
        ) {
            let a = stack.pop();
            let b = stack.pop();
            if (tokens[i] === "+") {
                stack.push(a + b);
            }
            if (tokens[i] === "-") {
                stack.push(b - a);
            }
            if (tokens[i] === "*") {
                stack.push(a * b);
            }
            if (tokens[i] === "/") {
                let ret = b / a;
                if (ret < 0) {
                    ret = -1 * Math.floor(Math.abs(ret));
                } else {
                    ret = Math.floor(ret);
                }
                stack.push(ret);
            }
        } else {
            stack.push(parseInt(tokens[i]));
        }
    }
    return stack.pop();
};
evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]);
