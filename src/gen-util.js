function* genF(x) {
    var y = yield x + 2;
    return y;
}
const genUtil = {
    genF
};
export { genUtil };
