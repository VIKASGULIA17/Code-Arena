/**
 * Recursion Engine — Pure-logic execution engine.
 * Precomputes an immutable timeline of snapshots for playback.
 *
 * Node states: pending | active | computing | base_case | returning | resolved | memoized
 */

// ── Node-state constants ──────────────────────────────────────────────
export const STATE = {
  PENDING: "pending",
  ACTIVE: "active",
  COMPUTING: "computing",
  BASE_CASE: "base_case",
  RETURNING: "returning",
  RESOLVED: "resolved",
  MEMOIZED: "memoized",
};

// ── Algorithm metadata ─────────────────────────────────────────────────
export const ALGORITHMS = {
  fibonacci: {
    name: "Fibonacci",
    complexity: "O(2ⁿ)",
    space: "O(n)",
    description: "F(n) = F(n-1) + F(n-2). Classic exponential tree recursion.",
    timeExplanation: "Explores all possible branches, leading to a binary tree of execution with height n.",
    spaceExplanation: "The call stack goes n levels deep.",
    maxInput: 8,
    color: "#6366f1",
  },
  fibonacci_memo: {
    name: "Fibonacci (Memoized)",
    complexity: "O(n)",
    space: "O(n)",
    description:
      "Same recurrence but with a memo table — cache hits bypass execution entirely.",
    timeExplanation: "Each of the n subproblems is computed exactly once due to caching.",
    spaceExplanation: "Requires O(n) space for the call stack and O(n) for the memoization table.",
    maxInput: 10,
    color: "#a855f7",
  },
  factorial: {
    name: "Factorial",
    complexity: "O(n)",
    space: "O(n)",
    description: "n! = n × (n-1)!. Demonstrates linear (tail-like) recursion.",
    timeExplanation: "Makes exactly n recursive calls.",
    spaceExplanation: "The call stack goes n levels deep before resolving.",
    maxInput: 10,
    color: "#ec4899",
  },
};

// ── Snapshot helper ────────────────────────────────────────────────────
function cloneSnapshot(snap) {
  return {
    nodes: snap.nodes.map((n) => ({ ...n })),
    edges: [...snap.edges],
    callStack: snap.callStack.map((f) => ({ ...f })),
    activeNodeId: snap.activeNodeId,
    returningEdge: snap.returningEdge
      ? { ...snap.returningEdge }
      : null,
    memoTable: { ...snap.memoTable },
    description: snap.description || "",
  };
}

// ── Tree-layout helper (assigns x/y to nodes) ─────────────────────────
function layoutTree(nodes, edges) {
  if (nodes.length === 0) return;

  // Build adjacency from edges (parent → children)
  const childrenMap = {};
  const hasParent = new Set();
  for (const e of edges) {
    if (!childrenMap[e.from]) childrenMap[e.from] = [];
    childrenMap[e.from].push(e.to);
    hasParent.add(e.to);
  }

  // Find root(s)
  const roots = nodes.filter((n) => !hasParent.has(n.id)).map((n) => n.id);
  const root = roots[0] ?? nodes[0].id;

  const nodeMap = {};
  for (const n of nodes) nodeMap[n.id] = n;

  // First pass: compute subtree widths
  const widths = {};
  function computeWidth(id) {
    const kids = childrenMap[id] || [];
    if (kids.length === 0) {
      widths[id] = 1;
      return 1;
    }
    let w = 0;
    for (const kid of kids) w += computeWidth(kid);
    widths[id] = Math.max(w, 1);
    return widths[id];
  }
  computeWidth(root);

  // Second pass: assign positions
  const NODE_W = 80;
  const NODE_H = 90;
  function assignPosition(id, depth, leftOffset) {
    const node = nodeMap[id];
    if (!node) return;
    const kids = childrenMap[id] || [];
    const totalW = widths[id];
    node.y = depth * NODE_H + 60;

    if (kids.length === 0) {
      node.x = (leftOffset + totalW / 2) * NODE_W;
    } else {
      let offset = leftOffset;
      for (const kid of kids) {
        assignPosition(kid, depth + 1, offset);
        offset += widths[kid];
      }
      // Center parent above children
      const firstChild = nodeMap[kids[0]];
      const lastChild = nodeMap[kids[kids.length - 1]];
      node.x = (firstChild.x + lastChild.x) / 2;
    }
  }
  assignPosition(root, 0, 0);
}

// ── Engine class ───────────────────────────────────────────────────────
export class RecursionEngine {
  constructor() {
    this.algorithm = "fibonacci";
    this.input = 5;
    this.timeline = []; // array of snapshots
  }

  setAlgorithm(name) {
    this.algorithm = name;
  }

  setInput(n) {
    this.input = n;
  }

  /**
   * Precompute the full timeline of snapshots.
   * Returns the timeline array.
   */
  precompute() {
    this.timeline = [];
    const ctx = {
      nodes: [],
      edges: [],
      callStack: [],
      activeNodeId: null,
      returningEdge: null,
      memoTable: {},
      nextId: 0,
      description: "",
    };

    switch (this.algorithm) {
      case "fibonacci":
        this._fibonacci(ctx, this.input, null);
        break;
      case "fibonacci_memo":
        this._fibonacciMemo(ctx, this.input, null, {});
        break;
      case "factorial":
        this._factorial(ctx, this.input, null);
        break;
      default:
        break;
    }

    // Final snapshot: everything resolved
    ctx.activeNodeId = null;
    ctx.returningEdge = null;
    ctx.callStack = [];
    ctx.description = "Execution complete.";
    this._snap(ctx);

    // Layout all nodes once
    for (const snap of this.timeline) {
      layoutTree(snap.nodes, snap.edges);
    }

    return this.timeline;
  }

  _snap(ctx) {
    this.timeline.push(cloneSnapshot(ctx));
  }

  // ── Fibonacci (naive) ───────────────────────────────────────────────
  _fibonacci(ctx, n, parentId) {
    const id = ctx.nextId++;
    const node = {
      id,
      label: `fib(${n})`,
      args: { n },
      state: STATE.PENDING,
      returnValue: null,
      x: 0,
      y: 0,
    };
    ctx.nodes.push(node);
    if (parentId !== null) {
      ctx.edges.push({ from: parentId, to: id });
    }

    // Push to call stack
    ctx.callStack.push({
      id,
      name: `fib(${n})`,
      args: { n },
      state: "active",
      returnValue: null,
    });

    // Snapshot: node created, pending → active
    node.state = STATE.ACTIVE;
    ctx.activeNodeId = id;
    ctx.returningEdge = null;
    ctx.description = `Calling fib(${n})`;
    this._snap(ctx);

    // Computing
    node.state = STATE.COMPUTING;
    ctx.description = `Computing fib(${n})…`;
    this._snap(ctx);

    if (n <= 1) {
      // Base case
      node.state = STATE.BASE_CASE;
      node.returnValue = n;
      ctx.description = `Base case: fib(${n}) = ${n}`;
      this._snap(ctx);

      // Return
      node.state = STATE.RESOLVED;
      ctx.callStack = ctx.callStack.filter((f) => f.id !== id);
      if (parentId !== null) {
        ctx.returningEdge = { from: id, to: parentId, value: n };
      }
      ctx.description = `Returning ${n} from fib(${n})`;
      this._snap(ctx);

      return n;
    }

    // Recurse left
    const left = this._fibonacci(ctx, n - 1, id);

    // Recurse right
    const right = this._fibonacci(ctx, n - 2, id);

    // Combine
    const result = left + right;
    node.state = STATE.RETURNING;
    node.returnValue = result;
    ctx.activeNodeId = id;
    ctx.returningEdge = null;
    ctx.description = `fib(${n}) = fib(${n - 1}) + fib(${n - 2}) = ${left} + ${right} = ${result}`;

    // Update call-stack frame
    const frame = ctx.callStack.find((f) => f.id === id);
    if (frame) {
      frame.returnValue = result;
      frame.state = "returning";
    }
    this._snap(ctx);

    // Resolved
    node.state = STATE.RESOLVED;
    ctx.callStack = ctx.callStack.filter((f) => f.id !== id);
    if (parentId !== null) {
      ctx.returningEdge = { from: id, to: parentId, value: result };
    }
    ctx.description = `Returning ${result} from fib(${n})`;
    this._snap(ctx);

    return result;
  }

  // ── Fibonacci (memoized) ────────────────────────────────────────────
  _fibonacciMemo(ctx, n, parentId, memo) {
    const id = ctx.nextId++;
    const node = {
      id,
      label: `fib(${n})`,
      args: { n },
      state: STATE.PENDING,
      returnValue: null,
      x: 0,
      y: 0,
    };
    ctx.nodes.push(node);
    if (parentId !== null) {
      ctx.edges.push({ from: parentId, to: id });
    }

    ctx.callStack.push({
      id,
      name: `fib(${n})`,
      args: { n },
      state: "active",
      returnValue: null,
    });

    node.state = STATE.ACTIVE;
    ctx.activeNodeId = id;
    ctx.returningEdge = null;
    ctx.description = `Calling fib(${n})`;
    this._snap(ctx);

    // Check memo
    if (memo[n] !== undefined) {
      node.state = STATE.MEMOIZED;
      node.returnValue = memo[n];
      ctx.memoTable = { ...memo };
      ctx.description = `Cache hit! fib(${n}) = ${memo[n]} (from memo table)`;
      this._snap(ctx);

      node.state = STATE.RESOLVED;
      ctx.callStack = ctx.callStack.filter((f) => f.id !== id);
      if (parentId !== null) {
        ctx.returningEdge = { from: id, to: parentId, value: memo[n] };
      }
      ctx.description = `Returning cached ${memo[n]} from fib(${n})`;
      this._snap(ctx);

      return memo[n];
    }

    node.state = STATE.COMPUTING;
    ctx.description = `Computing fib(${n})…`;
    this._snap(ctx);

    if (n <= 1) {
      memo[n] = n;
      ctx.memoTable = { ...memo };
      node.state = STATE.BASE_CASE;
      node.returnValue = n;
      ctx.description = `Base case: fib(${n}) = ${n}. Stored in memo.`;
      this._snap(ctx);

      node.state = STATE.RESOLVED;
      ctx.callStack = ctx.callStack.filter((f) => f.id !== id);
      if (parentId !== null) {
        ctx.returningEdge = { from: id, to: parentId, value: n };
      }
      ctx.description = `Returning ${n} from fib(${n})`;
      this._snap(ctx);

      return n;
    }

    const left = this._fibonacciMemo(ctx, n - 1, id, memo);
    const right = this._fibonacciMemo(ctx, n - 2, id, memo);

    const result = left + right;
    memo[n] = result;
    ctx.memoTable = { ...memo };

    node.state = STATE.RETURNING;
    node.returnValue = result;
    ctx.activeNodeId = id;
    ctx.returningEdge = null;
    ctx.description = `fib(${n}) = ${left} + ${right} = ${result}. Stored in memo.`;

    const frame = ctx.callStack.find((f) => f.id === id);
    if (frame) {
      frame.returnValue = result;
      frame.state = "returning";
    }
    this._snap(ctx);

    node.state = STATE.RESOLVED;
    ctx.callStack = ctx.callStack.filter((f) => f.id !== id);
    if (parentId !== null) {
      ctx.returningEdge = { from: id, to: parentId, value: result };
    }
    ctx.description = `Returning ${result} from fib(${n})`;
    this._snap(ctx);

    return result;
  }

  // ── Factorial ───────────────────────────────────────────────────────
  _factorial(ctx, n, parentId) {
    const id = ctx.nextId++;
    const node = {
      id,
      label: `fact(${n})`,
      args: { n },
      state: STATE.PENDING,
      returnValue: null,
      x: 0,
      y: 0,
    };
    ctx.nodes.push(node);
    if (parentId !== null) {
      ctx.edges.push({ from: parentId, to: id });
    }

    ctx.callStack.push({
      id,
      name: `fact(${n})`,
      args: { n },
      state: "active",
      returnValue: null,
    });

    node.state = STATE.ACTIVE;
    ctx.activeNodeId = id;
    ctx.returningEdge = null;
    ctx.description = `Calling fact(${n})`;
    this._snap(ctx);

    node.state = STATE.COMPUTING;
    ctx.description = `Computing ${n}!…`;
    this._snap(ctx);

    if (n <= 1) {
      node.state = STATE.BASE_CASE;
      node.returnValue = 1;
      ctx.description = `Base case: fact(${n}) = 1`;
      this._snap(ctx);

      node.state = STATE.RESOLVED;
      ctx.callStack = ctx.callStack.filter((f) => f.id !== id);
      if (parentId !== null) {
        ctx.returningEdge = { from: id, to: parentId, value: 1 };
      }
      ctx.description = `Returning 1 from fact(${n})`;
      this._snap(ctx);

      return 1;
    }

    const sub = this._factorial(ctx, n - 1, id);
    const result = n * sub;

    node.state = STATE.RETURNING;
    node.returnValue = result;
    ctx.activeNodeId = id;
    ctx.returningEdge = null;
    ctx.description = `fact(${n}) = ${n} × fact(${n - 1}) = ${n} × ${sub} = ${result}`;

    const frame = ctx.callStack.find((f) => f.id === id);
    if (frame) {
      frame.returnValue = result;
      frame.state = "returning";
    }
    this._snap(ctx);

    node.state = STATE.RESOLVED;
    ctx.callStack = ctx.callStack.filter((f) => f.id !== id);
    if (parentId !== null) {
      ctx.returningEdge = { from: id, to: parentId, value: result };
    }
    ctx.description = `Returning ${result} from fact(${n})`;
    this._snap(ctx);

    return result;
  }
}
