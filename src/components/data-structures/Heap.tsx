
import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';

const Heap = () => {
  const [heap, setHeap] = useState([]);
  const [heapType, setHeapType] = useState('max');
  const [inputValue, setInputValue] = useState('');

  const getParentIndex = (i) => Math.floor((i - 1) / 2);
  const getLeftChildIndex = (i) => 2 * i + 1;
  const getRightChildIndex = (i) => 2 * i + 2;

  const heapifyUp = (arr, index, isMaxHeap) => {
    let current = index;
    while (current > 0) {
      const parent = getParentIndex(current);
      const shouldSwap = isMaxHeap 
        ? arr[current] > arr[parent]
        : arr[current] < arr[parent];
      
      if (shouldSwap) {
        [arr[current], arr[parent]] = [arr[parent], arr[current]];
        current = parent;
      } else {
        break;
      }
    }
  };

  const heapifyDown = (arr, index, isMaxHeap) => {
    let current = index;
    while (getLeftChildIndex(current) < arr.length) {
      const leftChild = getLeftChildIndex(current);
      const rightChild = getRightChildIndex(current);
      let targetChild = leftChild;

      if (rightChild < arr.length) {
        const shouldPickRight = isMaxHeap
          ? arr[rightChild] > arr[leftChild]
          : arr[rightChild] < arr[leftChild];
        if (shouldPickRight) {
          targetChild = rightChild;
        }
      }

      const shouldSwap = isMaxHeap
        ? arr[targetChild] > arr[current]
        : arr[targetChild] < arr[current];

      if (shouldSwap) {
        [arr[current], arr[targetChild]] = [arr[targetChild], arr[current]];
        current = targetChild;
      } else {
        break;
      }
    }
  };

  const insert = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      const newHeap = [...heap, value];
      heapifyUp(newHeap, newHeap.length - 1, heapType === 'max');
      setHeap(newHeap);
      setInputValue('');
    }
  };

  const extractRoot = () => {
    if (heap.length === 0) return;
    
    const newHeap = [...heap];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();
    
    if (newHeap.length > 0) {
      heapifyDown(newHeap, 0, heapType === 'max');
    }
    
    setHeap(newHeap);
  };

  const clear = () => setHeap([]);

  const buildSampleHeap = () => {
    const values = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35];
    let newHeap = [];
    values.forEach(value => {
      newHeap.push(value);
      heapifyUp(newHeap, newHeap.length - 1, heapType === 'max');
    });
    setHeap(newHeap);
  };

  const getNodeLevel = (index) => Math.floor(Math.log2(index + 1));
  const getMaxLevel = () => heap.length > 0 ? getNodeLevel(heap.length - 1) : 0;

  const renderHeapTree = () => {
    if (heap.length === 0) return null;

    const levels = [];
    let currentLevel = 0;
    let levelNodes = [];
    
    for (let i = 0; i < heap.length; i++) {
      const nodeLevel = getNodeLevel(i);
      
      if (nodeLevel !== currentLevel) {
        if (levelNodes.length > 0) {
          levels.push(levelNodes);
        }
        levelNodes = [];
        currentLevel = nodeLevel;
      }
      
      levelNodes.push({ value: heap[i], index: i });
    }
    
    if (levelNodes.length > 0) {
      levels.push(levelNodes);
    }

    return (
      <div className="space-y-6">
        {levels.map((level, levelIndex) => (
          <div key={levelIndex} className="flex justify-center items-center space-x-4">
            {level.map(({ value, index }) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 ring-2 ring-yellow-400'
                    : heapType === 'max'
                    ? 'bg-gradient-to-r from-red-500 to-pink-500'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500'
                }`}
              >
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Heap Data Structure</h2>
        <p className="text-gray-400">Complete binary tree with heap property</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Heap Operations</h3>
          
          <div className="space-y-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setHeapType('max')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  heapType === 'max' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                <span>Max Heap</span>
              </button>
              <button
                onClick={() => setHeapType('min')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  heapType === 'min' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                }`}
              >
                <TrendingDown className="h-4 w-4" />
                <span>Min Heap</span>
              </button>
            </div>

            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Enter value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && insert()}
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
              />
              <button
                onClick={insert}
                className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={extractRoot}
                disabled={heap.length === 0}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <Minus className="h-4 w-4" />
                <span>Extract {heapType === 'max' ? 'Max' : 'Min'}</span>
              </button>
              <button
                onClick={clear}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Clear</span>
              </button>
            </div>

            <button
              onClick={buildSampleHeap}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
            >
              Build Sample Heap
            </button>
          </div>
        </div>

        {/* Properties */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Heap Properties</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-400">{heap.length}</div>
                <div className="text-gray-400 text-sm">Size</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {heap.length > 0 ? heap[0] : 'N/A'}
                </div>
                <div className="text-gray-400 text-sm">Root</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400">O(log n)</div>
                <div className="text-gray-400 text-sm">Insert</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-red-400">O(log n)</div>
                <div className="text-gray-400 text-sm">Extract</div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">
                {heapType === 'max' ? 'Max Heap' : 'Min Heap'} Property:
              </h4>
              <p className="text-gray-300 text-sm">
                {heapType === 'max' 
                  ? 'Each parent node is greater than or equal to its children'
                  : 'Each parent node is less than or equal to its children'
                }
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Array Representation:</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {heap.map((value, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded text-sm ${
                      index === 0 
                        ? 'bg-yellow-600 text-white' 
                        : 'bg-gray-600 text-gray-200'
                    }`}
                  >
                    [{index}]: {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Heap Visualization */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Heap Tree Visualization</h3>
        
        {heap.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-4">🌳</div>
            <p>Heap is empty. Add some elements!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-max px-8">
              {renderHeapTree()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Heap;
