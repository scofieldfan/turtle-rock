
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

var buildTree = function (preorder, inorder) {
    let inmap = {};
    for (let i = 0; i < inorder.length; i++) {
        inmap[inorder[i]] = i;
    }
    function helper(pleft, pright, inleft, inright) {
        if (pleft > pright || inleft > inright) {
            return null;
        }
        if (pleft < 0 || pright > preorder.length - 1) {
            return null;
        }
        if (inleft < 0 || inright > inorder.length - 1) {
            return null;
        }


        let node = new TreeNode(preorder[pleft]);
        let inorderIndex = inmap[preorder[pleft]];
        let preoderIndex = Math.floor(pleft + 1);
        for (let i = pleft + 1; i <= pright; i++) {
            if (inmap[preorder[i]] > inorderIndex) {
                preoderIndex = i;
                break;
            }
        }
        if ((inorderIndex >= pleft && inorderIndex <= pright) && (preoderIndex >= inleft && preoderIndex <= inright)) {

            node.left = helper(pleft, preoderIndex - 1, inleft, inorderIndex - 1);
            node.right = helper(preoderIndex, pright, inorderIndex + 1, inright);

        }
        console.log("pleft:", pleft);
        console.log("pright:", pright);
        console.log("inleft:", inleft);
        console.log("inright:", inright);
        console.log("inorderIndex:", inorderIndex);
        console.log("preoderIndex:", preoderIndex);


        return node;
    }
    return helper(0, preorder.length - 1, 0, inorder.length - 1);
};

export {
    travelMiddlerOrder,
    buildTree
}