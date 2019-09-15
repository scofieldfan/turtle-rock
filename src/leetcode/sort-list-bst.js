// https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/submissions/

var findMiddle = function(head) {
    let prev = null,
        slow = head,
        fast = head;
    while (fast != null && fast.next != null) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    if (prev != null) {
        prev.next = null;
    }
    return slow;
};
var sortedListToBST = function(head) {
    if (head === null) {
        return null;
    }

    let middle = findMiddle(head);

    let root = new TreeNode(middle.val);
    if (head === middle) {
        return root;
    }
    root.left = sortedListToBST(head);
    root.right = sortedListToBST(middle.next);
    return root;
};
