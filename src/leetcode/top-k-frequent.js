//https://leetcode-cn.com/problems/top-k-frequent-elements/
var topKFrequent = function(nums, k) {
    let map = {};
    let result = [];
    for (let i = 0; i < nums.length; i++) {
        if (!map[nums[i]]) {
            map[nums[i]] = 1;
        } else {
            map[nums[i]]++;
        }
    }
    var objArrays = Object.keys(map).map(function(key) {
        return { key: key, value: map[key] };
    });
    objArrays.sort((a, b) => b.value - a.value);
    for (let i = 0; i < k; i++) {
        result.push(objArrays[i].key);
    }
    return result;
};
