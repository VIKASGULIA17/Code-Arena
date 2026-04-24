/**
 * BST Tree Engine — Pure-logic engine.
 * Precomputes an immutable timeline of snapshots for traversals, insert, search.
 *
 * Node states: default | visiting | visited | found | inserting | current
 */

// ── Node-state constants ───────────────────────────────────────────
export const TREE_STATE = {
  DEFAULT: "default",
  VISITING: "visiting",
  VISITED: "visited",
  FOUND: "found",
  INSERTING: "inserting",
  CURRENT: "current",
};

// ── Algorithm metadata ─────────────────────────────────────────────
export const TREE_ALGORITHMS = {
  inorder: {
    name: "Inorder Traversal",
    complexity: "O(n)",
    space: "O(h)",
    description: "Left → Root → Right. Yields sorted order in a BST.",
    timeExplanation: "Visits every node exactly once.",
    spaceExplanation: "Call stack goes as deep as the height of the tree (h).",
    color: "#6366f1",
    needsInput: false,
  },
  preorder: {
    name: "Preorder Traversal",
    complexity: "O(n)",
    space: "O(h)",
    description: "Root → Left → Right. Useful for tree serialization / copying.",
    timeExplanation: "Visits every node exactly once.",
    spaceExplanation: "Call stack goes as deep as the height of the tree (h).",
    color: "#10b981",
    needsInput: false,
  },
  postorder: {
    name: "Postorder Traversal",
    complexity: "O(n)",
    space: "O(h)",
    description: "Left → Right → Root. Used for safe deletion of subtrees.",
    timeExplanation: "Visits every node exactly once.",
    spaceExplanation: "Call stack goes as deep as the height of the tree (h).",
    color: "#f59e0b",
    needsInput: false,
  },
  levelorder: {
    name: "Level-Order (BFS)",
    complexity: "O(n)",
    space: "O(n)",
    description: "Breadth-first, level by level. Explores all nodes at depth d before d+1.",
    timeExplanation: "Visits every node exactly once.",
    spaceExplanation: "The queue can hold up to n/2 nodes at the leaf level of a full binary tree.",
    color: "#ec4899",
    needsInput: false,
  },
  insert: {
    name: "BST Insert",
    complexity: "O(log n)",
    space: "O(1)",
    description: "Navigates the BST to find the correct leaf position and inserts a new node.",
    timeExplanation: "Traverses down the tree's height to find the insertion point.",
    spaceExplanation: "Iterative insert requires no extra space. (Recursive takes O(h) stack space).",
    color: "#0ea5e9",
    needsInput: true,
  },
  search: {
    name: "BST Search",
    complexity: "O(log n)",
    space: "O(1)",
    description: "Binary search down the tree — go left if smaller, right if larger.",
    timeExplanation: "Traverses down the tree's height, discarding half the remaining search space at each step.",
    spaceExplanation: "Iterative search uses constant space.",
    color: "#a855f7",
    needsInput: true,
  },
};

// ── Internal BST node ──────────────────────────────────────────────
function makeNode(value, id) {
  return {
    id,
    value,
    left: null,
    right: null,
    state: TREE_STATE.DEFAULT,
  };
}

function insertBST(root, value, idCounter) {
  if (!root) return { node: makeNode(value, idCounter.next++), inserted: true };
  if (value < root.value) {
    const result = insertBST(root.left, value, idCounter);
    root.left = result.node;
    return { node: root, inserted: result.inserted };
  } else if (value > root.value) {
    const result = insertBST(root.right, value, idCounter);
    root.right = result.node;
    return { node: root, inserted: result.inserted };
  }
  return { node: root, inserted: false }; // duplicate
}

// ── Compute layout positions ───────────────────────────────────────
function layoutBST(root) {
  if (!root) return { positions: {}, edges: [] };

  const positions = {};
  const edges = [];

  function assignPos(node, x, y, spread) {
    if (!node) return;
    positions[node.id] = { x, y };

    if (node.left) {
      edges.push({ from: node.id, to: node.left.id });
      assignPos(node.left, x - spread, y + 80, spread * 0.55);
    }
    if (node.right) {
      edges.push({ from: node.id, to: node.right.id });
      assignPos(node.right, x + spread, y + 80, spread * 0.55);
    }
  }

  assignPos(root, 400, 50, 160);
  return { positions, edges };
}

// ── Flatten BST to node array ──────────────────────────────────────
function flattenTree(root) {
  const arr = [];
  function walk(node) {
    if (!node) return;
    arr.push(node);
    walk(node.left);
    walk(node.right);
  }
  walk(root);
  return arr;
}

// ── Clone entire BST deeply ────────────────────────────────────────
function cloneTree(node) {
  if (!node) return null;
  return {
    ...node,
    left: cloneTree(node.left),
    right: cloneTree(node.right),
  };
}

// ── Snapshot helper ────────────────────────────────────────────────
function makeSnapshot(root, activeId, description, traversalOrder, highlightEdge) {
  const clone = cloneTree(root);
  const flat = flattenTree(clone);
  const { positions, edges } = layoutBST(clone);

  const nodes = flat.map((n) => ({
    id: n.id,
    value: n.value,
    state: n.state,
    x: positions[n.id]?.x || 0,
    y: positions[n.id]?.y || 0,
  }));

  return {
    nodes,
    edges,
    activeNodeId: activeId,
    traversalOrder: [...traversalOrder],
    description: description || "",
    highlightEdge: highlightEdge || null,
  };
}

// ── Set state on a specific node in the BST ────────────────────────
function setNodeState(root, id, state) {
  if (!root) return;
  if (root.id === id) {
    root.state = state;
    return;
  }
  setNodeState(root.left, id, state);
  setNodeState(root.right, id, state);
}

function resetAllStates(root) {
  if (!root) return;
  root.state = TREE_STATE.DEFAULT;
  resetAllStates(root.left);
  resetAllStates(root.right);
}

// ── Engine class ───────────────────────────────────────────────────
export class TreeEngine {
  constructor() {
    this.algorithm = "inorder";
    this.inputValue = null;
    this.timeline = [];
    this._root = null;
    this._idCounter = { next: 0 };
  }

  setAlgorithm(name) {
    this.algorithm = name;
  }

  setInputValue(v) {
    this.inputValue = v;
  }

  /** Build a default BST with nice values */
  _buildDefaultTree() {
    this._idCounter = { next: 0 };
    this._root = null;
    const values = [50, 30, 70, 20, 40, 60, 80, 15, 25, 35, 45];
    for (const v of values) {
      const result = insertBST(this._root, v, this._idCounter);
      this._root = result.node;
    }
  }

  /**
   * Precompute the full timeline of snapshots.
   */
  precompute() {
    this.timeline = [];
    this._buildDefaultTree();

    // Initial snapshot
    this.timeline.push(
      makeSnapshot(this._root, null, "BST ready. Press Play to start.", [], null)
    );

    const traversalOrder = [];

    switch (this.algorithm) {
      case "inorder":
        this._inorder(this._root, traversalOrder);
        break;
      case "preorder":
        this._preorder(this._root, traversalOrder);
        break;
      case "postorder":
        this._postorder(this._root, traversalOrder);
        break;
      case "levelorder":
        this._levelorder(this._root, traversalOrder);
        break;
      case "insert":
        if (this.inputValue !== null) {
          this._insert(this.inputValue, traversalOrder);
        }
        break;
      case "search":
        if (this.inputValue !== null) {
          this._search(this._root, this.inputValue, traversalOrder);
        }
        break;
      default:
        break;
    }

    // Final snapshot
    resetAllStates(this._root);
    // Mark all visited/traversed nodes
    for (const n of flattenTree(this._root)) {
      n.state = TREE_STATE.VISITED;
    }
    this.timeline.push(
      makeSnapshot(
        this._root,
        null,
        `${TREE_ALGORITHMS[this.algorithm].name} complete.${traversalOrder.length > 0 ? ` Order: [${traversalOrder.join(", ")}]` : ""}`,
        traversalOrder,
        null
      )
    );

    return this.timeline;
  }

  // ── Inorder ─────────────────────────────────────────────────────
  _inorder(node, order) {
    if (!node) return;

    this._inorder(node.left, order);

    // Visiting
    setNodeState(this._root, node.id, TREE_STATE.VISITING);
    this.timeline.push(
      makeSnapshot(this._root, node.id, `Visiting node ${node.value} (inorder)`, order, null)
    );

    order.push(node.value);

    // Visited
    setNodeState(this._root, node.id, TREE_STATE.VISITED);
    this.timeline.push(
      makeSnapshot(this._root, node.id, `Node ${node.value} visited. Order: [${order.join(", ")}]`, order, null)
    );

    this._inorder(node.right, order);
  }

  // ── Preorder ────────────────────────────────────────────────────
  _preorder(node, order) {
    if (!node) return;

    setNodeState(this._root, node.id, TREE_STATE.VISITING);
    this.timeline.push(
      makeSnapshot(this._root, node.id, `Visiting node ${node.value} (preorder: root first)`, order, null)
    );

    order.push(node.value);

    setNodeState(this._root, node.id, TREE_STATE.VISITED);
    this.timeline.push(
      makeSnapshot(this._root, node.id, `Node ${node.value} visited. Order: [${order.join(", ")}]`, order, null)
    );

    this._preorder(node.left, order);
    this._preorder(node.right, order);
  }

  // ── Postorder ───────────────────────────────────────────────────
  _postorder(node, order) {
    if (!node) return;

    this._postorder(node.left, order);
    this._postorder(node.right, order);

    setNodeState(this._root, node.id, TREE_STATE.VISITING);
    this.timeline.push(
      makeSnapshot(this._root, node.id, `Visiting node ${node.value} (postorder: children first)`, order, null)
    );

    order.push(node.value);

    setNodeState(this._root, node.id, TREE_STATE.VISITED);
    this.timeline.push(
      makeSnapshot(this._root, node.id, `Node ${node.value} visited. Order: [${order.join(", ")}]`, order, null)
    );
  }

  // ── Level-order (BFS) ───────────────────────────────────────────
  _levelorder(root, order) {
    if (!root) return;
    const queue = [root];

    while (queue.length > 0) {
      const node = queue.shift();

      setNodeState(this._root, node.id, TREE_STATE.VISITING);
      this.timeline.push(
        makeSnapshot(this._root, node.id, `BFS: visiting node ${node.value}`, order, null)
      );

      order.push(node.value);

      setNodeState(this._root, node.id, TREE_STATE.VISITED);
      this.timeline.push(
        makeSnapshot(this._root, node.id, `Node ${node.value} visited. Order: [${order.join(", ")}]`, order, null)
      );

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  // ── BST Insert ──────────────────────────────────────────────────
  _insert(value, order) {
    const _walk = (node, parentId) => {
      if (!node) {
        // Insert here
        const result = insertBST(this._root, value, this._idCounter);
        this._root = result.node;

        // Find the new node
        const newNode = flattenTree(this._root).find((n) => n.value === value);
        if (newNode) {
          setNodeState(this._root, newNode.id, TREE_STATE.FOUND);
          this.timeline.push(
            makeSnapshot(
              this._root,
              newNode.id,
              `Inserted ${value} at this position!`,
              order,
              parentId !== null ? { from: parentId, to: newNode.id } : null
            )
          );
        }
        return;
      }

      // Visiting node during search
      setNodeState(this._root, node.id, TREE_STATE.VISITING);
      this.timeline.push(
        makeSnapshot(
          this._root,
          node.id,
          `Comparing ${value} with ${node.value}…`,
          order,
          null
        )
      );

      setNodeState(this._root, node.id, TREE_STATE.VISITED);

      if (value < node.value) {
        this.timeline.push(
          makeSnapshot(
            this._root,
            node.id,
            `${value} < ${node.value} → go left`,
            order,
            node.left ? { from: node.id, to: node.left.id } : null
          )
        );
        _walk(node.left, node.id);
      } else if (value > node.value) {
        this.timeline.push(
          makeSnapshot(
            this._root,
            node.id,
            `${value} > ${node.value} → go right`,
            order,
            node.right ? { from: node.id, to: node.right.id } : null
          )
        );
        _walk(node.right, node.id);
      } else {
        this.timeline.push(
          makeSnapshot(
            this._root,
            node.id,
            `${value} already exists in the tree!`,
            order,
            null
          )
        );
      }
    };

    _walk(this._root, null);
  }

  // ── BST Search ──────────────────────────────────────────────────
  _search(node, value, order) {
    if (!node) {
      this.timeline.push(
        makeSnapshot(this._root, null, `${value} not found in the tree.`, order, null)
      );
      return;
    }

    setNodeState(this._root, node.id, TREE_STATE.VISITING);
    this.timeline.push(
      makeSnapshot(
        this._root,
        node.id,
        `Comparing ${value} with ${node.value}…`,
        order,
        null
      )
    );

    if (node.value === value) {
      setNodeState(this._root, node.id, TREE_STATE.FOUND);
      this.timeline.push(
        makeSnapshot(this._root, node.id, `Found ${value}!`, order, null)
      );
      return;
    }

    setNodeState(this._root, node.id, TREE_STATE.VISITED);

    if (value < node.value) {
      this.timeline.push(
        makeSnapshot(
          this._root,
          node.id,
          `${value} < ${node.value} → search left subtree`,
          order,
          node.left ? { from: node.id, to: node.left.id } : null
        )
      );
      this._search(node.left, value, order);
    } else {
      this.timeline.push(
        makeSnapshot(
          this._root,
          node.id,
          `${value} > ${node.value} → search right subtree`,
          order,
          node.right ? { from: node.id, to: node.right.id } : null
        )
      );
      this._search(node.right, value, order);
    }
  }
}
