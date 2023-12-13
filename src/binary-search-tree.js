const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.rootNode === null) {
      this.rootNode = newNode;
    } else {
      this._addRecursive(this.rootNode, newNode);
    }
  }

  _addRecursive(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._addRecursive(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._addRecursive(node.right, newNode);
      }
    }
  }

  has(data) {
    return this._Search(this.rootNode, data);
  }

  _Search(node, data) {
    if (node === null) {
      return false;
    } else if (node.data === data) {
      return true;
    } else if (data < node.data) {
      return this._Search(node.left, data);
    } else if (data > node.data) {
      return this._Search(node.right, data);
    }
  }

  find(data) {
    return this._Find(this.rootNode, data);
  }

  _Find(node, data) {
    if (node === null) {
      return null;
    } else if (node.data === data) {
      return node;
    } else if (data < node.data) {
      return this._Find(node.left, data);
    } else if (data > node.data) {
      return this._Find(node.right, data);
    }
  }

  remove(data) {
    this.rootNode = this._Remove(this.rootNode, data);
  }

  _Remove(node, data) {
    if (node === null) {
      return null;
    }
    if (data < node.data) {
      node.left = this._Remove(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this._Remove(node.right, data);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      const minNode = this._findMin(node.right);
      node.data = minNode.data;
      node.right = this._Remove(node.right, minNode.data);
      return node;
    }
  }

  _findMin(node) {
    if (node.left === null) {
      return node;
    } else {
      return this._findMin(node.left);
    }
  }

  min() {
    if (this.rootNode === null) {
      return null;
    }
    let minNode = this.rootNode;
    while (minNode.left !== null) {
      minNode = minNode.left;
    }
    return minNode.data;
  }

  max() {
    if (this.rootNode === null) {
      return null;
    }
    let maxNode = this.rootNode;
    while (maxNode.right !== null) {
      maxNode = maxNode.right;
    }
    return maxNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
