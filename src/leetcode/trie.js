class TrieNode {
    constructor() {
        this.links = new Array(26);
        this.isEnd = false;
    }
    put(c, node) {
        this.links[c.charCodeAt(0) - 97] = node;
    }
    get(c) {
        return this.links[c.charCodeAt(0) - 97];
    }
    containsKey(c) {
        // console.log("containsKey", this.links[c.charCodeAt(0) - 97]);
        return this.links[c.charCodeAt(0) - 97] !== undefined;
    }
}

/**
 * Initialize your data structure here.
 */
class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    /**
     * Inserts a word into the trie.
     * @param {string} word
     * @return {void}
     */
    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (node != null && node.containsKey(word.charAt(i))) {
                node = node.get(word.charAt(i));
            } else {
                let newNode = new TrieNode();
                node.put(word.charAt(i), newNode);
                node = newNode;
            }
        }
        node.isEnd = true;
    }
    /**
     * Returns if the word is in the trie.
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            // console.log("node", node);
            if (node != null && node.containsKey(word.charAt(i))) {
                node = node.get(word.charAt(i));
            } else {
                return false;
            }
        }
        return node.isEnd;
    }
    /**
     * Returns if there is any word in the trie that starts with the given prefix.
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix) {
        let node = this.root;
        for (let i = 0; i < prefix.length; i++) {
            if (node != null && node.containsKey(prefix.charAt(i))) {
                node = node.get(prefix.charAt(i));
            } else {
                return false;
            }
        }
        return true;
    }
}

let tries = new Trie();

tries.insert("apple");
console.log(tries.search("apple")); // 返回 true
console.log(tries.search("app")); // 返回 false
console.log(tries.startsWith("app")); // 返回 true
console.log(tries.insert("app"));
console.log(tries.search("app"));
