const array = {

    flush(num = []) {
        for (let i = 0; i < num.length; i++) {
            let index = Math.floor(Math.random() * (num.length - 1));
            let temp = num[i];
            num[i] = num[index];
            num[index] = temp;
        }
    },
    threeSum(nums = [], target) {
        if (nums.length === 0) {
            return;
        }
        nums.sort((a, b) => a - b);

        for (let j = 1; j <= nums.length - 2; j++) {
            let i = 0, k = nums.length - 1;
            let min = nums[i] + nums[j] + nums[j + 1];
            let max = nums[j - 1] + nums[j] + nums[k];
            if (target >= min && target <= max) {

                while (i < j && j < k) {
                    let curr = nums[i] + nums[j] + nums[k];
                    if (curr === target) {

                        let ret = [nums[i], nums[j], nums[k]];
                        console.log("ret nums:", ret);
                        return ret;
                    } else if (curr < target) {
                        i++;
                    } else if (curr > target) {
                        k--;
                    }
                }

            }
        }
        return [];

    }
}
export {
    array
};
