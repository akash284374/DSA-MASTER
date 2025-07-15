
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Route, Target } from 'lucide-react';

const GraphVisualizer = ({ isPlaying, speed }) => {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [algorithm, setAlgorithm] = useState('dijkstra');
  const [startNode, setStartNode] = useState(0);
  const [endNode, setEndNode] = useState(4);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const algorithms = [
    { id: 'dijkstra', name: "Dijkstra's Algorithm", type: 'Shortest Path' },
    { id: 'bfs', name: 'Breadth-First Search', type: 'Graph Traversal' },
    { id: 'dfs', name: 'Depth-First Search', type: 'Graph Traversal' },
    { id: 'astar', name: 'A* Algorithm', type: 'Shortest Path' },
  ];

  useEffect(() => {
    generateGraph();
  }, []);

  const generateGraph = () => {
    const nodeCount = 8;
    const newNodes = [];
    const newEdges = [];

    // Generate nodes in a circular pattern
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * 2 * Math.PI;
      const radius = 120;
      const x = 300 + radius * Math.cos(angle);
      const y = 200 + radius * Math.sin(angle);
      newNodes.push({ id: i, x, y, label: String.fromCharCode(65 + i) });
    }

    // Generate random edges
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.6) {
          const weight = Math.floor(Math.random() * 20) + 1;
          newEdges.push({ from: i, to: j, weight });
        }
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
    setVisitedNodes([]);
    setCurrentPath([]);
  };

  useEffect(() => {
    drawGraph();
  }, [nodes, edges, visitedNodes, currentPath]);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    edges.forEach(edge => {
      const fromNode = nodes[edge.from];
      const toNode = nodes[edge.to];
      
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      
      const isInPath = currentPath.some(pathEdge => 
        (pathEdge.from === edge.from && pathEdge.to === edge.to) ||
        (pathEdge.from === edge.to && pathEdge.to === edge.from)
      );
      
      ctx.strokeStyle = isInPath ? '#10b981' : '#6b7280';
      ctx.lineWidth = isInPath ? 3 : 1;
      ctx.stroke();

      // Draw weight
      const midX = (fromNode.x + toNode.x) / 2;
      const midY = (fromNode.y + toNode.y) / 2;
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(edge.weight.toString(), midX, midY);
    });

    // Draw nodes
    nodes.forEach((node, index) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      
      let fillColor = '#8b5cf6';
      if (index === startNode) fillColor = '#10b981';
      else if (index === endNode) fillColor = '#ef4444';
      else if (visitedNodes.includes(index)) fillColor = '#f59e0b';
      
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + 5);
    });
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getNeighbors = (nodeId) => {
    return edges
      .filter(edge => edge.from === nodeId || edge.to === nodeId)
      .map(edge => ({
        node: edge.from === nodeId ? edge.to : edge.from,
        weight: edge.weight,
        edge
      }));
  };

  const dijkstra = async () => {
    const distances = Array(nodes.length).fill(Infinity);
    const previous = Array(nodes.length).fill(null);
    const visited = new Set();
    const queue = [];

    distances[startNode] = 0;
    queue.push(startNode);

    while (queue.length > 0) {
      let current = queue.reduce((min, node) => 
        distances[node] < distances[min] ? node : min
      );
      
      queue.splice(queue.indexOf(current), 1);
      
      if (visited.has(current)) continue;
      visited.add(current);
      
      setVisitedNodes([...visited]);
      await sleep(speed * 2);

      if (current === endNode) break;

      const neighbors = getNeighbors(current);
      for (const neighbor of neighbors) {
        if (visited.has(neighbor.node)) continue;

        const alt = distances[current] + neighbor.weight;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          previous[neighbor.node] = current;
          if (!queue.includes(neighbor.node)) queue.push(neighbor.node);
        }
      }
    }

    // Reconstruct path
    const path = [];
    let current = endNode;
    while (previous[current] !== null) {
      const prev = previous[current];
      const edge = edges.find(e => 
        (e.from === prev && e.to === current) || 
        (e.from === current && e.to === prev)
      );
      if (edge) path.unshift(edge);
      current = prev;
    }
    
    setCurrentPath(path);
  };

  const bfs = async () => {
    const visited = new Set();
    const previous = Array(nodes.length).fill(null);
    const queue = [startNode];
    visited.add(startNode);

    while (queue.length > 0) {
      const current = queue.shift();
      setVisitedNodes([...visited]);
      await sleep(speed * 2);

      if (current === endNode) break;

      const neighbors = getNeighbors(current);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor.node)) {
          visited.add(neighbor.node);
          previous[neighbor.node] = current;
          queue.push(neighbor.node);
        }
      }
    }

    // Reconstruct path
    const path = [];
    let current = endNode;
    while (previous[current] !== null) {
      const prev = previous[current];
      const edge = edges.find(e => 
        (e.from === prev && e.to === current) || 
        (e.from === current && e.to === prev)
      );
      if (edge) path.unshift(edge);
      current = prev;
    }
    
    setCurrentPath(path);
  };

  const dfs = async () => {
    const visited = new Set();
    const previous = Array(nodes.length).fill(null);
    const stack = [startNode];

    while (stack.length > 0) {
      const current = stack.pop();
      
      if (visited.has(current)) continue;
      visited.add(current);
      
      setVisitedNodes([...visited]);
      await sleep(speed * 2);

      if (current === endNode) break;

      const neighbors = getNeighbors(current);
      for (const neighbor of neighbors.reverse()) {
        if (!visited.has(neighbor.node)) {
          previous[neighbor.node] = current;
          stack.push(neighbor.node);
        }
      }
    }

    // Reconstruct path
    const path = [];
    let current = endNode;
    while (previous[current] !== null) {
      const prev = previous[current];
      const edge = edges.find(e => 
        (e.from === prev && e.to === current) || 
        (e.from === current && e.to === prev)
      );
      if (edge) path.unshift(edge);
      current = prev;
    }
    
    setCurrentPath(path);
  };

  const astar = async () => {
    const heuristic = (a, b) => {
      const nodeA = nodes[a];
      const nodeB = nodes[b];
      return Math.sqrt(Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2));
    };

    const gScore = Array(nodes.length).fill(Infinity);
    const fScore = Array(nodes.length).fill(Infinity);
    const previous = Array(nodes.length).fill(null);
    const visited = new Set();
    const openSet = [startNode];

    gScore[startNode] = 0;
    fScore[startNode] = heuristic(startNode, endNode);

    while (openSet.length > 0) {
      let current = openSet.reduce((min, node) => 
        fScore[node] < fScore[min] ? node : min
      );
      
      openSet.splice(openSet.indexOf(current), 1);
      visited.add(current);
      
      setVisitedNodes([...visited]);
      await sleep(speed * 2);

      if (current === endNode) break;

      const neighbors = getNeighbors(current);
      for (const neighbor of neighbors) {
        if (visited.has(neighbor.node)) continue;

        const tentativeGScore = gScore[current] + neighbor.weight;

        if (tentativeGScore < gScore[neighbor.node]) {
          previous[neighbor.node] = current;
          gScore[neighbor.node] = tentativeGScore;
          fScore[neighbor.node] = gScore[neighbor.node] + heuristic(neighbor.node, endNode);

          if (!openSet.includes(neighbor.node)) {
            openSet.push(neighbor.node);
          }
        }
      }
    }

    // Reconstruct path
    const path = [];
    let current = endNode;
    while (previous[current] !== null) {
      const prev = previous[current];
      const edge = edges.find(e => 
        (e.from === prev && e.to === current) || 
        (e.from === current && e.to === prev)
      );
      if (edge) path.unshift(edge);
      current = prev;
    }
    
    setCurrentPath(path);
  };

  const startAlgorithm = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setVisitedNodes([]);
    setCurrentPath([]);
    
    try {
      switch (algorithm) {
        case 'dijkstra':
          await dijkstra();
          break;
        case 'bfs':
          await bfs();
          break;
        case 'dfs':
          await dfs();
          break;
        case 'astar':
          await astar();
          break;
      }
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (isPlaying && !isRunning) {
      startAlgorithm();
    }
  }, [isPlaying]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isRunning}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
          >
            {algorithms.map(alg => (
              <option key={alg.id} value={alg.id}>
                {alg.name} - {alg.type}
              </option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-green-400" />
            <select
              value={startNode}
              onChange={(e) => setStartNode(Number(e.target.value))}
              disabled={isRunning}
              className="bg-gray-700 text-white px-2 py-1 rounded border border-gray-600"
            >
              {nodes.map((node, index) => (
                <option key={index} value={index}>Start: {node.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-red-400" />
            <select
              value={endNode}
              onChange={(e) => setEndNode(Number(e.target.value))}
              disabled={isRunning}
              className="bg-gray-700 text-white px-2 py-1 rounded border border-gray-600"
            >
              {nodes.map((node, index) => (
                <option key={index} value={index}>End: {node.label}</option>
              ))}
            </select>
          </div>

          <button
            onClick={generateGraph}
            disabled={isRunning}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <Route className="h-4 w-4" />
            <span>New Graph</span>
          </button>
        </div>

        <div className="text-sm text-gray-300">
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>Start
          <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 ml-4"></span>End
          <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2 ml-4"></span>Visited
          <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mr-2 ml-4"></span>Unvisited
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">{nodes.length}</div>
          <div className="text-gray-400">Nodes</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">{edges.length}</div>
          <div className="text-gray-400">Edges</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">{visitedNodes.length}</div>
          <div className="text-gray-400">Visited</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">{currentPath.length}</div>
          <div className="text-gray-400">Path Length</div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualizer;
