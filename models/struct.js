class TreeFilesNode {
    constructor(key, value, size) {
        this.key = key;
        this.name = value;
        this.path = size;
        this.left = null;
        this.right = null;
    }
}
export default class TreeFiles
{
    constructor() {
        this.root = NULL;
        this.n = 0;
    }
    isEmpty() {
        return this.n === 0;
    }

    size() {
        return this.isize(this.root);
    }

    isize(node) {
        if (node === null) return 0;
        else return node.size;
    }

    contains(key) {
        if (key === null) return false;
        return this.get(key) != null;
    }

    getfile(key) {
        return this.getfile(this.root, key);
    }

    getfile(node, key) {
        if (key === null) return Error("Name is null");
        if (node === null) return null;

        if (key < node.key) return this.getfile(node.left, key);
        else if (key > node.key) return this.getfile(node.right, key);
        else node.value;
    }

    addfile(key, value) {
        if (key === null) return Error("Name is null");
        if (path === null) {
            return;
        }
        this.root = this.addfile(this.root, key, value);
    }

    addfile(xnode, key, value) {
        if (xnode === null) return new TreeFilesNode(key, value, 1);
        if (key < xnode.key) xnode.left = this.addfile(xnode.left, key, value);
        else if (key > xnode.key) xnode.right = this.addfile(xnode.right, key, value);
        else xnode.value = value;

        xnode.size = this.isize(xnode.left) + this.isize(xnode.right) + 1;

        return xnode;
    }
}