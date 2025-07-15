
import React, { useState } from 'react';
import { Database, Plus, Minus, Trophy, RotateCcw } from 'lucide-react';

const HeapGame = () => {
  const [heap, setHeap] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStatus, setGameStatus] = useState('');
  const [isMaxHeap, setIsMaxHeap] = useState(true);

  const parent = (i: number) => Math.floor((i - 1) / 2);
  const leftChild = (i: number) => 2 * i + 1;
  const rightChild = (i: number) => 2 * i + 2;

  const heapifyUp = (arr: number[], index: number) => {
    while (index > 0) {
      const parentIndex = parent(index);
      const shouldSwap = isMaxHeap 
        ? arr[index] > arr[parentIndex]
        : arr[index] < arr[parentIndex];
      
      if (!shouldSwap) break;
      
      [arr[index], arr[parentIndex]] = [arr[parentIndex], arr[index]];
      index = parentIndex;
    }
  };

  const heapifyDown = (arr: number[], index: number) => {
    const size = arr.length;
    
    while (true) {
      let target = index;
      const left = leftChild(index);
      const right = rightChild(index);
      
      if (left < size) {
        const shouldSwapLeft = isMaxHeap
          ? arr[left] > arr[target]
          : arr[left] < arr[target];
        if (shouldSwapLeft) target = left;
      }
      
      if (right < size) {
        const shouldSwapRight = isMaxHeap
          ? arr[right] > arr[target]
          : arr[right] < arr[target];
        if (shouldSwapRight) target = right;
      }
      
      if (target === index) break;
      
      [arr[index], arr[target]] = [arr[target], arr[index]];
      index = target;
    }
  };

  const insert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    const newHeap = [...heap, value];
    heapifyUp(newHeap, newHeap.length - 1);
    
    setHeap(newHeap);
    setScore(score + 10);
    setMoves(moves + 1);
    setGameStatus(`Inserted ${value} into ${isMaxHeap ? 'Max' : 'Min'} Heap`);
    setInputValue('');
  };

  const extractRoot = () => {
    if (heap.length === 0) {
      setGameStatus('Heap is empty!');
      return;
    }

    const root = heap[0];
    const newHeap = [...heap];
    
    if (newHeap.length === 1) {
      newHeap.pop();
    } else {
      newHeap[0] = newHeap.pop()!;
      heapifyDown(newHeap, 0);
    }
    
    setHeap(newHeap);
    setScore(score + 15);
    setMoves(moves + 1);
    setGameStatus(`Extracted ${root} from ${isMaxHeap ? 'Max' : 'Min'} Heap`);
  };

  const reset = () => {
    setHeap([]);
    setScore(0);
    setMoves(0);
    setGameStatus('');
    setInputValue('');
  };

  const getNodePosition = (index: number) => {
    const level = Math.floor(Math.log2(index + 1));
    const positionInLevel = index - (Math.pow(2, level) - 1);
    const totalInLevel = Math.pow(2, level);
    
    return {
      level,
      x: (positionInLevel + 0.5) / totalInLevel,
    };
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
          <Database className="h-8 w-8 mr-3 text-red-400" />
          Heap Challenge
        </h2>
        <p className="text-gray-400">Master heap operations and tree properties</p>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-400">{score}</div>
          <div className="text-gray-400 text-sm">Score</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{moves}</div>
          <div className="text-gray-400 text-sm">Operations</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{heap.length}</div>
          <div className="text-gray-400 text-sm">Elements</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">
            {heap.length > 0 ? heap[0] : '-'}
          </div>
          <div className="text-gray-400 text-sm">Root</div>
        </div>
      </div>

      {/* Heap Type Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-white/10 rounded-lg p-1 flex">
          <button
            onClick={() => setIsMaxHeap(true)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isMaxHeap 
                ? 'bg-red-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Max Heap
          </button>
          <button
            onClick={() => setIsMaxHeap(false)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !isMaxHeap 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Min Heap
          </button>
        </div>
      </div>

      {/* Heap Visualization */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">
          {isMaxHeap ? 'Max' : 'Min'} Heap Visualization
        </h3>
        
        {heap.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Database className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Empty heap. Add some numbers to see the tree structure!</p>
          </div>
        ) : (
          <div className="relative h-64 overflow-auto">
            <svg className="w-full h-full">
              {heap.map((value, index) => {
                const { level, x } = getNodePosition(index);
                const nodeX = x * 400 + 50;
                const nodeY = level * 60 + 30;
                
                // Draw edges to children
                const leftIdx = leftChild(index);
                const rightIdx = rightChild(index);
                
                return (
                  <g key={index}>
                    {/* Edges */}
                    {leftIdx < heap.length && (
                      <line
                        x1={nodeX}
                        y1={nodeY}
                        x2={getNodePosition(leftIdx).x * 400 + 50}
                        y2={(getNodePosition(leftIdx).level) * 60 + 30}
                        stroke="#6b7280"
                        strokeWidth="2"
                      />
                    )}
                    {rightIdx < heap.length && (
                      <line
                        x1={nodeX}
                        y1={nodeY}
                        x2={getNodePosition(rightIdx).x * 400 + 50}
                        y2={(getNodePosition(rightIdx).level) * 60 + 30}
                        stroke="#6b7280"
                        strokeWidth="2"
                      />
                    )}
                    
                    {/* Node */}
                    <circle
                      cx={nodeX}
                      cy={nodeY}
                      r="20"
                      fill={index === 0 ? (isMaxHeap ? "#dc2626" : "#2563eb") : "#7c3aed"}
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    <text
                      x={nodeX}
                      y={nodeY + 5}
                      textAnchor="middle"
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      {value}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-green-400" />
            Insert Element
          </h3>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Enter number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && insert()}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
            <button
              onClick={insert}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
            >
              Insert
            </button>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Minus className="h-5 w-5 mr-2 text-red-400" />
            Extract Root
          </h3>
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">
              Remove the {isMaxHeap ? 'maximum' : 'minimum'} element
            </p>
            <button
              onClick={extractRoot}
              disabled={heap.length === 0}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-lg transition-colors"
            >
              Extract {isMaxHeap ? 'Max' : 'Min'}
            </button>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <RotateCcw className="h-5 w-5 mr-2 text-purple-400" />
            Game Controls
          </h3>
          <div className="space-y-4">
            <button
              onClick={reset}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
            >
              Reset Game
            </button>
          </div>
        </div>
      </div>

      {/* Game Status */}
      {gameStatus && (
        <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4 text-center">
          <p className="text-blue-300">{gameStatus}</p>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">How to Play</h3>
        <ul className="text-gray-300 space-y-2 text-sm">
          <li>• Insert numbers to build a heap and maintain heap property</li>
          <li>• Extract the root to remove max/min element</li>
          <li>• Watch how heapify operations maintain the tree structure</li>
          <li>• Switch between Max Heap and Min Heap to understand both variants</li>
        </ul>
      </div>
    </div>
  );
};

export default HeapGame;
