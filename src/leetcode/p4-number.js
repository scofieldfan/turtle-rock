//https://leetcode-cn.com/problems/median-of-two-sorted-arrays/
var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }
    let temp = nums1.length + nums2.length;
    let k = Math.floor((temp + 1) / 2);
    let left = 0,
        right = nums1.length;

    while (left <= right) {
        let m1 = Math.floor(left + (right - left) / 2);
        let m2 = k - m1;
        if (m1 < right && nums1[m1] < nums2[m2 - 1]) {
            left = m1 + 1;
        } else if (m1 > left && nums1[m1 - 1] > nums2[m2]) {
            right = m1 - 1;
        } else {
            let maxLeft = 0;
            if (m1 === 0) {
                maxLeft = nums2[m2 - 1];
            } else if (m2 == 0) {
                maxLeft = nums1[m1 - 1];
            } else {
                maxLeft = Math.max(nums1[m1 - 1], nums2[m2 - 1]);
            }
            if (temp % 2 === 1) {
                return maxLeft;
            }
            let minRight = 0;
            if (m1 === nums1.length) {
                minRight = nums2[m2];
            } else if (m2 === nums2.length) {
                minRight = nums1[m1];
            } else {
                minRight = Math.min(nums2[m2], nums1[m1]);
            }
            return (maxLeft + minRight) / 2.0;
        }
    }
    return 0;
};
