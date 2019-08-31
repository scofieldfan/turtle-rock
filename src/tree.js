function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

function travelMiddlerOrder(treeNode) {
    if (treeNode == null) {
        return;
    }
    travelMiddlerOrder(treeNode.left);
    console.log(treeNode.val);
    travelMiddlerOrder(treeNode.right);
}

var buildTree = function(preorder, inorder) {};

export { travelMiddlerOrder, buildTree };
