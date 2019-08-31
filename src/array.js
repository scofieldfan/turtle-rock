const flatten = function(ary) {
    let result = [];
    if (Object.prototype.toString.call(ary).slice(8, -1) === "Array") {
        ary.forEach(item => {
            if (Object.prototype.toString.call(item).slice(8, -1) === "Array") {
                result = result.concat(flatten(item));
            } else {
                result.push(item);
            }
        });
    } else {
        result.push(ary);
    }
    return result;
};
const flush = function(num = []) {
    for (let i = 0; i < num.length; i++) {
        let index = Math.floor(Math.random() * (num.length - 1));
        let temp = num[i];
        num[i] = num[index];
        num[index] = temp;
    }
};
const binarySearch = function(ary, target) {
    if (!Array.isArray(ary)) {
        throw new TypeError("arg1 is not a array");
    }
    let start = 0,
        end = ary.length - 1;
    while (start <= end) {
        let mid = Math.floor(start + (end - start) / 2);
        if (ary[mid] === target) {
            return mid;
        } else if (ary[mid] < target) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return -1;
};
const quickSort = function(ary = [], start = 0, end = ary.length - 1) {
    if (!Array.isArray(ary)) {
        throw new TypeError("arg1 is not a array");
    }
    if (start >= end || isNaN(start) || isNaN(end)) {
        return;
    }
    let index = partition(start, end);
    quickSort(ary, start, index - 1);
    quickSort(ary, index + 1, end);
    function partition(left, right) {
        let priviot = ary[right];
        let k = left - 1;
        for (let i = left; i <= right - 1; i++) {
            if (ary[i] <= priviot) {
                swap(++k, i);
            }
        }
        swap(++k, right);
        return k;
    }
    function swap(i, j) {
        let temp = ary[i];
        ary[i] = ary[j];
        ary[j] = temp;
    }
};
const twoSum = function(arys, target) {
    if (!Array.isArray(arys)) {
        throw new TypeError("arg1 is not a array");
    }
    const map = new Map();
    for (let i = 0; i < arys.length; i++) {
        let num = target - arys[i];
        if (map.get(num) !== undefined) {
            return [map.get(num), i];
        }
        map.set(arys[i], i);
    }
    return [];
};
const array = {
    flatten,
    binarySearch,
    flush,
    quickSort,
    twoSum
};
export { array };
