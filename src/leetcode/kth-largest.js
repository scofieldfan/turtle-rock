var swap = function(nums, i, j) {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
};
var partition = function(nums, start, end) {
    if (start >= end) {
        return;
    }
    let priviot = nums[end];
    let begin = start - 1;
    for (let i = start; i <= end - 1; i++) {
        if (nums[i] < priviot) {
            swap(nums, i, ++begin);
        }
    }
    swap(nums, end, ++begin);
    return begin;
};

var findKthLargest = function(nums, k) {
    function helper(nums, start, end) {
        if (start >= end) {
            return nums[start];
        }
        let index = partition(nums, start, end);
        let dest = nums.length - index;
        /*
        console.log("**************");
        console.log("start", start);
        console.log("end", end);
        console.log("index", index);
        console.log("dest", dest);
        */
        if (dest === k) {
            return nums[index];
        } else if (dest > k) {
            return helper(nums, index + 1, end);
        } else {
            return helper(nums, start, index - 1);
        }
    }
    return helper(nums, 0, nums.length - 1);
};

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5], 4));
