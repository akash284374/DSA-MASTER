
import React, { useState, useEffect, useRef } from 'react';
import { Network, Play, Pause, RotateCcw, Zap, Info } from 'lucide-react';

const AdvancedGraphs = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Graph data
  const nodes = [
    { id: 'A', x: 100, y: 100, visited: false, distance: Infinity },
    { id: 'B', x: 300, y: 50, visited: false, distance: Infinity },
    { id: 'C', x: 500, y: 100, visited: false, distance: Infinity },
    { id: 'D', x: 200, y: 250, visited: false, distance: Infinity },
    { id: 'E', x: 400, y: 250, visited: false, distance: Infinity },
  ];

  const edges = [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'D', weight: 2 },
    { from: 'B', to: 'C', weight: 3 },
    { from: 'B', to: 'E', weight: 5 },
    { from: 'D', to: 'E', weight: 1 },
    { from: 'C', to: 'E', weight: 2 },
  ];

  const algorithms = [
    { id: 'dijkstra', name: "Dijkstra's Algorithm", description: 'Shortest path from source to all vertices' },
    { id: 'bfs', name: 'Breadth-First Search', description: 'Level-order traversal of graph' },
    { id: 'dfs', name: 'Depth-First Search', description: 'Deep traversal using stack' },
    { id: 'kruskal', name: "Kruskal's Algorithm", description: 'Minimum spanning tree using union-find' },
  ];

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      
      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        // Draw weight
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(edge.weight.toString(), midX, midY);
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
      ctx.fillStyle = node.visited ? '#10b981' : '#6366f1';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw node label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.id, node.x, node.y);
    });
  };

  useEffect(() => {
    drawGraph();
  }, [currentStep, isAnimating]);

  const startAnimation = async () => {
    setIsAnimating(true);
    setCurrentStep(0);
    
    // Reset all nodes
    nodes.forEach(node => {
      node.visited = false;
      node.distance = Infinity;
    });

    if (selectedAlgorithm === 'bfs') {
      // BFS animation
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].visited = true;
        setCurrentStep(i);
        drawGraph();
        await new Promise(resolve => setTimeout(resolve, 1000 / speed));
      }
    } else if (selectedAlgorithm === 'dfs') {
      // DFS animation
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].visited = true;
        setCurrentStep(i);
        drawGraph();
        await new Promise(resolve => setTimeout(resolve, 1000 / speed));
      }
    }

    setIsAnimating(false);
  };

  const reset = () => {
    setIsAnimating(false);
    setCurrentStep(0);
    nodes.forEach(node => {
      node.visited = false;
      node.distance = Infinity;
    });
    drawGraph();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">
        <Network className="inline h-6 w-6 mr-2" />
        Advanced Graph Algorithms
      </h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Controls</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Algorithm:</label>
              <select
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
              >
                {algorithms.map(alg => (
                  <option key={alg.id} value={alg.id}>{alg.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Speed: {speed}x</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={startAnimation}
                disabled={isAnimating}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg flex-1"
              >
                {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isAnimating ? 'Running...' : 'Start'}</span>
              </button>
              
              <button
                onClick={reset}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">
              <Zap className="inline h-5 w-5 mr-2" />
              Graph Visualization
            </h3>
          </div>
          
          <div className="p-6">
            <canvas
              ref={canvasRef}
              width={600}
              height={300}
              className="w-full bg-gray-900 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="mt-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          <Info className="inline h-5 w-5 mr-2" />
          Algorithm Information
        </h3>
        
        {(() => {
          const currentAlg = algorithms.find(alg => alg.id === selectedAlgorithm);
          return currentAlg ? (
            <div>
              <h4 className="text-cyan-400 font-semibold">{currentAlg.name}</h4>
              <p className="text-gray-300 mt-2">{currentAlg.description}</p>
            </div>
          ) : null;
        })()}
      </div>
    </div>
  );
};

export default AdvancedGraphs;
