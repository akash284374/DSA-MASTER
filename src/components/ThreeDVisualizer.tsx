
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, Eye, Settings } from 'lucide-react';

const ThreeDVisualizer = () => {
  const [selectedVisualization, setSelectedVisualization] = useState('binaryTree');
  const [isAnimating, setIsAnimating] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const visualizations = [
    { id: 'binaryTree', name: 'Binary Tree Traversal', description: '3D Binary Tree with DFS/BFS animations' },
    { id: 'graphTraversal', name: 'Graph Traversal', description: '3D graph network with pathfinding' },
    { id: 'sortingCubes', name: 'Sorting Algorithms', description: '3D cubes demonstrating sorting' },
    { id: 'heapStructure', name: 'Heap Operations', description: '3D heap with insert/delete animations' },
    { id: 'stackQueue', name: 'Stack & Queue', description: '3D stack and queue operations' },
  ];

  const binaryTreeData = [
    { id: 1, value: 50, x: 0, y: 0, z: 0, level: 0 },
    { id: 2, value: 30, x: -2, y: -1, z: 0, level: 1 },
    { id: 3, value: 70, x: 2, y: -1, z: 0, level: 1 },
    { id: 4, value: 20, x: -3, y: -2, z: 0, level: 2 },
    { id: 5, value: 40, x: -1, y: -2, z: 0, level: 2 },
    { id: 6, value: 60, x: 1, y: -2, z: 0, level: 2 },
    { id: 7, value: 80, x: 3, y: -2, z: 0, level: 2 },
  ];

  const [treeNodes, setTreeNodes] = useState(binaryTreeData);
  const [visitedNodes, setVisitedNodes] = useState(new Set<number>());
  const [sortingArray, setSortingArray] = useState([64, 34, 25, 12, 22, 11, 90, 88]);
  const [currentSortStep, setCurrentSortStep] = useState(0);

  const drawVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('Canvas not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Canvas context not available');
      return;
    }

    console.log('Drawing visualization:', selectedVisualization, 'Step:', currentStep);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 50;

    if (selectedVisualization === 'binaryTree') {
      console.log('Drawing binary tree, visited nodes:', Array.from(visitedNodes));
      
      // Draw tree connections first
      ctx.strokeStyle = '#6b7280';
      ctx.lineWidth = 2;
      
      const drawEdge = (from: any, to: any) => {
        const fromX = centerX + from.x * scale;
        const fromY = centerY + from.y * scale;
        const toX = centerX + to.x * scale;
        const toY = centerY + to.y * scale;
        
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
      };

      // Draw parent-child connections
      for (let i = 1; i < treeNodes.length; i++) {
        const child = treeNodes[i];
        const parentIndex = Math.floor((i - 1) / 2);
        const parent = treeNodes[parentIndex];
        if (parent) {
          drawEdge(parent, child);
        }
      }

      // Draw nodes with proper state visualization
      treeNodes.forEach((node, index) => {
        const x = centerX + node.x * scale;
        const y = centerY + node.y * scale;
        const radius = 25;
        
        ctx.save();
        
        // Shadow for 3D effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(x + 3, y + 3, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Determine node state
        const isVisited = visitedNodes.has(node.id);
        const isCurrent = index === currentStep && isAnimating;
        
        console.log(`Node ${node.id}: visited=${isVisited}, current=${isCurrent}`);
        
        // Node background with proper colors
        if (isCurrent) {
          ctx.fillStyle = '#f59e0b'; // Amber for current
        } else if (isVisited) {
          ctx.fillStyle = '#10b981'; // Green for visited
        } else {
          ctx.fillStyle = '#6366f1'; // Indigo for unvisited
        }
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Highlight effect for current node
        if (isCurrent) {
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 4;
          ctx.stroke();
        } else {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        // Node value
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.value.toString(), x, y);
        
        ctx.restore();
      });
    } 
    
    else if (selectedVisualization === 'sortingCubes') {
      console.log('Drawing sorting cubes, current step:', currentSortStep);
      
      // Draw 3D sorting cubes with better visualization
      sortingArray.forEach((height, index) => {
        const x = 50 + index * 80;
        const cubeHeight = height * 3;
        const cubeWidth = 60;
        const depth = 40;
        
        ctx.save();
        
        // Highlight current comparison
        const isComparing = isAnimating && (index === currentSortStep || index === currentSortStep + 1);
        const hue = height * 4;
        
        // Top face
        ctx.fillStyle = isComparing ? `hsl(${hue}, 80%, 70%)` : `hsl(${hue}, 70%, 60%)`;
        ctx.beginPath();
        ctx.moveTo(x, canvas.height - cubeHeight);
        ctx.lineTo(x + cubeWidth, canvas.height - cubeHeight);
        ctx.lineTo(x + cubeWidth + depth/2, canvas.height - cubeHeight - depth/2);
        ctx.lineTo(x + depth/2, canvas.height - cubeHeight - depth/2);
        ctx.closePath();
        ctx.fill();
        
        // Left face
        ctx.fillStyle = isComparing ? `hsl(${hue}, 80%, 55%)` : `hsl(${hue}, 70%, 45%)`;
        ctx.beginPath();
        ctx.moveTo(x, canvas.height - cubeHeight);
        ctx.lineTo(x + depth/2, canvas.height - cubeHeight - depth/2);
        ctx.lineTo(x + depth/2, canvas.height - depth/2);
        ctx.lineTo(x, canvas.height);
        ctx.closePath();
        ctx.fill();
        
        // Front face
        ctx.fillStyle = isComparing ? `hsl(${hue}, 80%, 60%)` : `hsl(${hue}, 70%, 50%)`;
        ctx.fillRect(x, canvas.height - cubeHeight, cubeWidth, cubeHeight);
        
        // Highlight border for comparing elements
        if (isComparing) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.strokeRect(x, canvas.height - cubeHeight, cubeWidth, cubeHeight);
        }
        
        // Value label
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(height.toString(), x + cubeWidth/2, canvas.height - cubeHeight/2);
        
        ctx.restore();
      });
    }
    
    else if (selectedVisualization === 'stackQueue') {
      console.log('Drawing stack and queue');
      
      // Draw 3D Stack with improved visualization
      const stackItems = [10, 20, 30, 40, 50];
      stackItems.forEach((value, index) => {
        const x = 100;
        const y = canvas.height - 50 - (index * 40);
        const width = 120;
        const height = 35;
        const depth = 20;
        
        ctx.save();
        
        const isHighlighted = isAnimating && index === currentStep;
        
        // Top face
        ctx.fillStyle = isHighlighted ? '#a855f7' : '#8b5cf6';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width + depth, y - depth);
        ctx.lineTo(x + depth, y - depth);
        ctx.closePath();
        ctx.fill();
        
        // Front face
        ctx.fillStyle = isHighlighted ? '#9333ea' : '#7c3aed';
        ctx.fillRect(x, y, width, height);
        
        // Right face
        ctx.fillStyle = isHighlighted ? '#7e22ce' : '#6d28d9';
        ctx.beginPath();
        ctx.moveTo(x + width, y);
        ctx.lineTo(x + width + depth, y - depth);
        ctx.lineTo(x + width + depth, y - depth + height);
        ctx.lineTo(x + width, y + height);
        ctx.closePath();
        ctx.fill();
        
        // Highlight border
        if (isHighlighted) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.strokeRect(x, y, width, height);
        }
        
        // Value
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + width/2, y + height/2 + 5);
        
        ctx.restore();
      });
      
      // Draw 3D Queue with improved visualization
      const queueItems = [15, 25, 35, 45];
      queueItems.forEach((value, index) => {
        const x = 400 + (index * 80);
        const y = canvas.height - 100;
        const width = 70;
        const height = 50;
        const depth = 25;
        
        ctx.save();
        
        const isHighlighted = isAnimating && index === currentStep;
        
        // Top face
        ctx.fillStyle = isHighlighted ? '#22d3ee' : '#06b6d4';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width + depth, y - depth);
        ctx.lineTo(x + depth, y - depth);
        ctx.closePath();
        ctx.fill();
        
        // Front face
        ctx.fillStyle = isHighlighted ? '#0ea5e9' : '#0891b2';
        ctx.fillRect(x, y, width, height);
        
        // Right face
        ctx.fillStyle = isHighlighted ? '#0284c7' : '#0e7490';
        ctx.beginPath();
        ctx.moveTo(x + width, y);
        ctx.lineTo(x + width + depth, y - depth);
        ctx.lineTo(x + width + depth, y - depth + height);
        ctx.lineTo(x + width, y + height);
        ctx.closePath();
        ctx.fill();
        
        // Highlight border
        if (isHighlighted) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          ctx.strokeRect(x, y, width, height);
        }
        
        // Value
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + width/2, y + height/2 + 5);
        
        ctx.restore();
      });
    }
  };

  // Draw whenever state changes
  useEffect(() => {
    console.log('Redrawing due to state change');
    drawVisualization();
  }, [selectedVisualization, currentStep, isAnimating, sortingArray, currentSortStep, visitedNodes]);

  const startAnimation = async () => {
    console.log('Starting animation for:', selectedVisualization);
    setIsAnimating(true);
    setVisitedNodes(new Set());
    setCurrentStep(0);
    setCurrentSortStep(0);

    if (selectedVisualization === 'binaryTree') {
      console.log('Running binary tree animation');
      // DFS traversal animation
      for (let i = 0; i < treeNodes.length; i++) {
        console.log(`Processing tree node ${i}:`, treeNodes[i]);
        setCurrentStep(i);
        drawVisualization(); // Force redraw
        await new Promise(resolve => setTimeout(resolve, 1500 / speed));
        
        setVisitedNodes(prev => {
          const newSet = new Set([...prev, treeNodes[i].id]);
          console.log('Updated visited nodes:', Array.from(newSet));
          return newSet;
        });
        drawVisualization(); // Force redraw after state change
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    } else if (selectedVisualization === 'sortingCubes') {
      console.log('Running sorting animation');
      // Bubble sort animation
      for (let i = 0; i < sortingArray.length - 1; i++) {
        console.log(`Sorting comparison at index ${i}`);
        setCurrentSortStep(i);
        drawVisualization();
        await new Promise(resolve => setTimeout(resolve, 1200 / speed));
      }
    } else if (selectedVisualization === 'stackQueue') {
      console.log('Running stack/queue animation');
      // Stack/Queue operations animation
      for (let i = 0; i < 5; i++) {
        console.log(`Stack/Queue operation ${i}`);
        setCurrentStep(i);
        drawVisualization();
        await new Promise(resolve => setTimeout(resolve, 1000 / speed));
      }
    }

    setIsAnimating(false);
    console.log('Animation completed');
  };

  const reset = () => {
    console.log('Resetting visualization');
    setIsAnimating(false);
    setCurrentStep(0);
    setCurrentSortStep(0);
    setVisitedNodes(new Set());
    drawVisualization();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <Eye className="inline h-8 w-8 text-cyan-400 mr-2" />
            3D <span className="text-cyan-400">Visualizations</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Experience data structures and algorithms in immersive 3D environments
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                <Settings className="inline h-5 w-5 mr-2" />
                Controls
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Visualization:</label>
                  <select
                    value={selectedVisualization}
                    onChange={(e) => {
                      console.log('Changing visualization to:', e.target.value);
                      setSelectedVisualization(e.target.value);
                      reset();
                    }}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                  >
                    {visualizations.map(viz => (
                      <option key={viz.id} value={viz.id}>{viz.name}</option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-400 mt-1">
                    {visualizations.find(viz => viz.id === selectedVisualization)?.description}
                  </p>
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
                    className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 text-white rounded-lg flex-1"
                  >
                    {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    <span>{isAnimating ? 'Playing...' : 'Play'}</span>
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

            {/* Algorithm Info */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Algorithm Info</h3>
              
              {selectedVisualization === 'binaryTree' && (
                <div className="space-y-3">
                  <div className="text-sm text-gray-300">
                    <strong className="text-cyan-400">DFS Traversal</strong>
                    <p>Depth-First Search explores as far as possible along each branch before backtracking.</p>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Time Complexity:</span>
                    <span className="text-white ml-2">O(n)</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Space Complexity:</span>
                    <span className="text-white ml-2">O(h)</span>
                  </div>
                </div>
              )}
              
              {selectedVisualization === 'sortingCubes' && (
                <div className="space-y-3">
                  <div className="text-sm text-gray-300">
                    <strong className="text-cyan-400">Bubble Sort</strong>
                    <p>Compares adjacent elements and swaps them if they are in wrong order.</p>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Time Complexity:</span>
                    <span className="text-white ml-2">O(n²)</span>
                  </div>
                </div>
              )}
              
              {selectedVisualization === 'stackQueue' && (
                <div className="space-y-3">
                  <div className="text-sm text-gray-300">
                    <strong className="text-cyan-400">Stack & Queue</strong>
                    <p>Stack: LIFO (Last In, First Out)<br/>Queue: FIFO (First In, First Out)</p>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Operations:</span>
                    <span className="text-white ml-2">O(1)</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3D Visualization Canvas */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">
                  <Zap className="inline h-5 w-5 mr-2 text-cyan-400" />
                  3D Visualization Canvas
                </h3>
              </div>
              
              <div className="p-6">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={500}
                  className="w-full bg-gray-900 rounded-lg shadow-lg border border-gray-700"
                />
              </div>
              
              {/* Legend */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
                    <span className="text-gray-300">Unvisited</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-300">Current</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Visited</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDVisualizer;
