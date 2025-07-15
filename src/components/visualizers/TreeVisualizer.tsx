
import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, Search } from 'lucide-react';

const TreeVisualizer = ({ isPlaying, speed }) => {
  const canvasRef = useRef(null);
  const [tree, setTree] = useState(null);
  const [algorithm, setAlgorithm] = useState('bst');
  const [insertValue, setInsertValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [isTraversing, setIsTraversing] = useState(false);

  const algorithms = [
    { id: 'bst', name: 'Binary Search Tree', type: 'Tree Structure' },
    { id: 'avl', name: 'AVL Tree', type: 'Self-Balancing' },
    { id: 'inorder', name: 'In-order Traversal', type: 'Tree Traversal' },
    { id: 'preorder', name: 'Pre-order Traversal', type: 'Tree Traversal' },
    { id: 'postorder', name: 'Post-order Traversal', type: 'Tree Traversal' },
  ];

  class BinaryTreeNode {
    value: number;
    left: BinaryTreeNode | null;
    right: BinaryTreeNode | null;
    height: number;

    constructor(value: number) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.height = 1;
    }
  }

  const insert = (root: BinaryTreeNode | null, value: number): BinaryTreeNode => {
    if (!root) return new BinaryTreeNode(value);
    
    if (value < root.value) {
      root.left = insert(root.left, value);
    } else if (value > root.value) {
      root.right = insert(root.right, value);
    }
    
    return root;
  };

  const deleteNode = (root: BinaryTreeNode | null, value: number): BinaryTreeNode | null => {
    if (!root) return null;

    if (value < root.value) {
      root.left = deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = deleteNode(root.right, value);
    } else {
      // Node to be deleted found
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      // Node with two children: get inorder successor
      let minNode = root.right;
      while (minNode.left) {
        minNode = minNode.left;
      }

      root.value = minNode.value;
      root.right = deleteNode(root.right, minNode.value);
    }

    return root;
  };

  const search = async (root: BinaryTreeNode | null, value: number, visited: number[] = []): Promise<boolean> => {
    if (!root) return false;
    
    visited.push(root.value);
    setHighlightedNodes([...visited]);
    await sleep(speed * 2);
    
    if (root.value === value) return true;
    
    if (value < root.value) {
      return await search(root.left, value, visited);
    } else {
      return await search(root.right, value, visited);
    }
  };

  const inorderTraversal = async (root: BinaryTreeNode | null, result: number[] = []): Promise<number[]> => {
    if (!root) return result;
    
    await inorderTraversal(root.left, result);
    
    result.push(root.value);
    setTraversalOrder([...result]);
    setHighlightedNodes([root.value]);
    await sleep(speed * 2);
    
    await inorderTraversal(root.right, result);
    return result;
  };

  const preorderTraversal = async (root: BinaryTreeNode | null, result: number[] = []): Promise<number[]> => {
    if (!root) return result;
    
    result.push(root.value);
    setTraversalOrder([...result]);
    setHighlightedNodes([root.value]);
    await sleep(speed * 2);
    
    await preorderTraversal(root.left, result);
    await preorderTraversal(root.right, result);
    return result;
  };

  const postorderTraversal = async (root: BinaryTreeNode | null, result: number[] = []): Promise<number[]> => {
    if (!root) return result;
    
    await postorderTraversal(root.left, result);
    await postorderTraversal(root.right, result);
    
    result.push(root.value);
    setTraversalOrder([...result]);
    setHighlightedNodes([root.value]);
    await sleep(speed * 2);
    
    return result;
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleInsert = () => {
    if (insertValue.trim()) {
      const value = parseInt(insertValue);
      if (!isNaN(value)) {
        setTree(prevTree => insert(prevTree, value));
        setInsertValue('');
      }
    }
  };

  const handleDelete = () => {
    if (insertValue.trim() && tree) {
      const value = parseInt(insertValue);
      if (!isNaN(value)) {
        setTree(prevTree => deleteNode(prevTree, value));
        setInsertValue('');
      }
    }
  };

  const handleSearch = async () => {
    if (searchValue.trim() && tree && !isTraversing) {
      const value = parseInt(searchValue);
      if (!isNaN(value)) {
        setHighlightedNodes([]);
        await search(tree, value);
      }
    }
  };

  const handleTraversal = async () => {
    if (tree && !isTraversing) {
      setIsTraversing(true);
      setTraversalOrder([]);
      setHighlightedNodes([]);
      
      try {
        if (algorithm === 'inorder') {
          await inorderTraversal(tree);
        } else if (algorithm === 'preorder') {
          await preorderTraversal(tree);
        } else if (algorithm === 'postorder') {
          await postorderTraversal(tree);
        }
      } finally {
        setIsTraversing(false);
      }
    }
  };

  const clearTree = () => {
    setTree(null);
    setHighlightedNodes([]);
    setTraversalOrder([]);
  };

  useEffect(() => {
    // Initialize with sample tree
    let root = null;
    [50, 30, 70, 20, 40, 60, 80].forEach(value => {
      root = insert(root, value);
    });
    setTree(root);
  }, []);

  useEffect(() => {
    drawTree();
  }, [tree, highlightedNodes]);

  const drawTree = () => {
    const canvas = canvasRef.current;
    if (!canvas || !tree) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const positions = new Map();
    
    const calculatePositions = (node: BinaryTreeNode | null, x: number, y: number, xOffset: number) => {
      if (!node) return;
      
      positions.set(node.value, { x, y });
      
      if (node.left) {
        calculatePositions(node.left, x - xOffset, y + 60, xOffset / 2);
      }
      if (node.right) {
        calculatePositions(node.right, x + xOffset, y + 60, xOffset / 2);
      }
    };

    calculatePositions(tree, 300, 50, 150);

    // Draw edges
    const drawEdges = (node: BinaryTreeNode | null) => {
      if (!node) return;
      
      const nodePos = positions.get(node.value);
      
      if (node.left) {
        const leftPos = positions.get(node.left.value);
        ctx.beginPath();
        ctx.moveTo(nodePos.x, nodePos.y);
        ctx.lineTo(leftPos.x, leftPos.y);
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 2;
        ctx.stroke();
        drawEdges(node.left);
      }
      
      if (node.right) {
        const rightPos = positions.get(node.right.value);
        ctx.beginPath();
        ctx.moveTo(nodePos.x, nodePos.y);
        ctx.lineTo(rightPos.x, rightPos.y);
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 2;
        ctx.stroke();
        drawEdges(node.right);
      }
    };

    drawEdges(tree);

    // Draw nodes
    positions.forEach((pos, value) => {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 25, 0, 2 * Math.PI);
      
      const isHighlighted = highlightedNodes.includes(value);
      ctx.fillStyle = isHighlighted ? '#10b981' : '#8b5cf6';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw value
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), pos.x, pos.y + 5);
    });
  };

  useEffect(() => {
    if (isPlaying && ['inorder', 'preorder', 'postorder'].includes(algorithm)) {
      handleTraversal();
    }
  }, [isPlaying, algorithm]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
          >
            {algorithms.map(alg => (
              <option key={alg.id} value={alg.id}>
                {alg.name} - {alg.type}
              </option>
            ))}
          </select>

          {['inorder', 'preorder', 'postorder'].includes(algorithm) && (
            <button
              onClick={handleTraversal}
              disabled={isTraversing}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
            >
              {isTraversing ? 'Traversing...' : 'Start Traversal'}
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Value"
            value={insertValue}
            onChange={(e) => setInsertValue(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 w-24"
          />
          <button
            onClick={handleInsert}
            className="flex items-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center space-x-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <input
            type="text"
            placeholder="Search value"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 w-24"
          />
          <button
            onClick={handleSearch}
            disabled={isTraversing}
            className="flex items-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            onClick={clearTree}
            className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-xl p-6">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="mx-auto border border-gray-700 rounded-lg"
        />
      </div>

      {traversalOrder.length > 0 && (
        <div className="bg-white/5 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">Traversal Order:</h3>
          <div className="flex flex-wrap gap-2">
            {traversalOrder.map((value, index) => (
              <span key={index} className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                {value}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">BST</div>
          <div className="text-gray-400">Structure</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">{highlightedNodes.length}</div>
          <div className="text-gray-400">Highlighted</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">{traversalOrder.length}</div>
          <div className="text-gray-400">Traversed</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">O(log n)</div>
          <div className="text-gray-400">Complexity</div>
        </div>
      </div>
    </div>
  );
};

export default TreeVisualizer;
