import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Clock, Zap, TrendingUp, Database, GitCompare } from 'lucide-react';

const ComplexityAnalyzer = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('quickSort');
  const [selectedAlgorithms, setSelectedAlgorithms] = useState(['quickSort', 'bubbleSort']);
  const [inputSize, setInputSize] = useState(1000);
  const [benchmarkResults, setBenchmarkResults] = useState([]);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);

  const algorithms = [
    {
      id: 'quickSort',
      name: 'Quick Sort',
      timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      spaceComplexity: 'O(log n)',
      color: '#8b5cf6',
      implementation: (arr) => {
        const quickSort = (arr, low = 0, high = arr.length - 1) => {
          if (low < high) {
            const pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
          }
          return arr;
        };

        const partition = (arr, low, high) => {
          const pivot = arr[high];
          let i = low - 1;
          for (let j = low; j <= high - 1; j++) {
            if (arr[j] < pivot) {
              i++;
              [arr[i], arr[j]] = [arr[j], arr[i]];
            }
          }
          [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
          return i + 1;
        };

        return quickSort([...arr]);
      }
    },
    {
      id: 'mergeSort',
      name: 'Merge Sort',
      timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      spaceComplexity: 'O(n)',
      color: '#10b981',
      implementation: (arr) => {
        const mergeSort = (arr) => {
          if (arr.length <= 1) return arr;
          
          const mid = Math.floor(arr.length / 2);
          const left = mergeSort(arr.slice(0, mid));
          const right = mergeSort(arr.slice(mid));
          
          return merge(left, right);
        };

        const merge = (left, right) => {
          const result = [];
          let i = 0, j = 0;
          
          while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
              result.push(left[i++]);
            } else {
              result.push(right[j++]);
            }
          }
          
          return result.concat(left.slice(i)).concat(right.slice(j));
        };

        return mergeSort(arr);
      }
    },
    {
      id: 'bubbleSort',
      name: 'Bubble Sort',
      timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      color: '#ef4444',
      implementation: (arr) => {
        const result = [...arr];
        const n = result.length;
        
        for (let i = 0; i < n - 1; i++) {
          for (let j = 0; j < n - i - 1; j++) {
            if (result[j] > result[j + 1]) {
              [result[j], result[j + 1]] = [result[j + 1], result[j]];
            }
          }
        }
        
        return result;
      }
    },
    {
      id: 'selectionSort',
      name: 'Selection Sort',
      timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      color: '#f59e0b',
      implementation: (arr) => {
        const result = [...arr];
        const n = result.length;
        
        for (let i = 0; i < n - 1; i++) {
          let minIdx = i;
          for (let j = i + 1; j < n; j++) {
            if (result[j] < result[minIdx]) {
              minIdx = j;
            }
          }
          if (minIdx !== i) {
            [result[i], result[minIdx]] = [result[minIdx], result[i]];
          }
        }
        
        return result;
      }
    },
    {
      id: 'radixSort',
      name: 'Radix Sort',
      timeComplexity: { best: 'O(d × n)', average: 'O(d × n)', worst: 'O(d × n)' },
      spaceComplexity: 'O(n + k)',
      color: '#06b6d4',
      implementation: (arr) => {
        const result = [...arr];
        
        const getMax = (arr) => Math.max(...arr);
        const countingSort = (arr, exp) => {
          const n = arr.length;
          const output = new Array(n);
          const count = new Array(10).fill(0);

          for (let i = 0; i < n; i++) {
            count[Math.floor(arr[i] / exp) % 10]++;
          }

          for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
          }

          for (let i = n - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
          }

          for (let i = 0; i < n; i++) {
            arr[i] = output[i];
          }
        };

        const max = getMax(result);
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
          countingSort(result, exp);
        }
        
        return result;
      }
    },
    {
      id: 'bucketSort',
      name: 'Bucket Sort',
      timeComplexity: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n²)' },
      spaceComplexity: 'O(n + k)',
      color: '#84cc16',
      implementation: (arr) => {
        const result = [...arr];
        const n = result.length;
        if (n <= 0) return result;

        const max = Math.max(...result);
        const min = Math.min(...result);
        const bucketCount = Math.floor(Math.sqrt(n));
        const bucketSize = Math.ceil((max - min + 1) / bucketCount);
        
        const buckets = Array.from({ length: bucketCount }, () => []);

        for (let i = 0; i < n; i++) {
          const bucketIndex = Math.floor((result[i] - min) / bucketSize);
          const targetBucket = Math.min(bucketIndex, bucketCount - 1);
          buckets[targetBucket].push(result[i]);
        }

        let index = 0;
        for (let i = 0; i < bucketCount; i++) {
          if (buckets[i].length > 0) {
            buckets[i].sort((a, b) => a - b);
            for (let j = 0; j < buckets[i].length; j++) {
              result[index++] = buckets[i][j];
            }
          }
        }
        
        return result;
      }
    }
  ];

  const currentAlgorithm = algorithms.find(alg => alg.id === selectedAlgorithm);

  const generateRandomArray = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
  };

  const measurePerformance = async (algorithm, inputSize) => {
    const testArray = generateRandomArray(inputSize);
    
    const startTime = performance.now();
    const startMemory = (performance as any).memory?.usedJSHeapSize || 0;
    
    algorithm.implementation(testArray);
    
    const endTime = performance.now();
    const endMemory = (performance as any).memory?.usedJSHeapSize || 0;
    
    return {
      time: endTime - startTime,
      memory: Math.abs(endMemory - startMemory),
      inputSize
    };
  };

  const runBenchmark = async () => {
    setIsRunning(true);
    const results = [];
    const sizes = [100, 500, 1000, 2000, 5000, 10000];
    
    for (const size of sizes) {
      const result = await measurePerformance(currentAlgorithm, size);
      results.push({
        inputSize: size,
        time: parseFloat(result.time.toFixed(2)),
        memory: result.memory / 1024,
        algorithm: currentAlgorithm.name
      });
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setBenchmarkResults(results);
    setIsRunning(false);
  };

  const runComparison = async () => {
    setIsRunning(true);
    const results = [];
    const sizes = [100, 500, 1000, 2000, 5000];
    
    for (const size of sizes) {
      const sizeResult = { inputSize: size };
      
      for (const algId of selectedAlgorithms) {
        const algorithm = algorithms.find(alg => alg.id === algId);
        const result = await measurePerformance(algorithm, size);
        sizeResult[algorithm.name] = parseFloat(result.time.toFixed(2));
      }
      
      results.push(sizeResult);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setComparisonResults(results);
    setIsRunning(false);
  };

  const handleAlgorithmToggle = (algId) => {
    setSelectedAlgorithms(prev => {
      if (prev.includes(algId)) {
        return prev.filter(id => id !== algId);
      } else if (prev.length < 4) {
        return [...prev, algId];
      }
      return prev;
    });
  };

  const complexityData = [
    { name: 'O(1)', value: 1, color: '#10b981' },
    { name: 'O(log n)', value: Math.log2(inputSize), color: '#3b82f6' },
    { name: 'O(n)', value: inputSize, color: '#f59e0b' },
    { name: 'O(n log n)', value: inputSize * Math.log2(inputSize), color: '#8b5cf6' },
    { name: 'O(n²)', value: Math.pow(inputSize, 2), color: '#ef4444' },
    { name: 'O(2ⁿ)', value: Math.min(Math.pow(2, Math.min(inputSize, 20)), 1000000), color: '#dc2626' },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Complexity <span className="text-purple-400">Analyzer</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Analyze time and space complexity with real-time performance metrics
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="mb-6 flex items-center space-x-4">
          <button
            onClick={() => setComparisonMode(false)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !comparisonMode 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Single Algorithm
          </button>
          <button
            onClick={() => setComparisonMode(true)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              comparisonMode 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <GitCompare className="h-4 w-4" />
            <span>Compare Algorithms</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Algorithm Selection */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              {comparisonMode ? 'Select Algorithms (max 4)' : 'Select Algorithm'}
            </h2>
            <div className="space-y-3">
              {algorithms.map(algorithm => (
                <button
                  key={algorithm.id}
                  onClick={() => comparisonMode 
                    ? handleAlgorithmToggle(algorithm.id)
                    : setSelectedAlgorithm(algorithm.id)
                  }
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    comparisonMode
                      ? selectedAlgorithms.includes(algorithm.id)
                        ? 'bg-purple-600/30 border border-purple-500/50'
                        : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      : selectedAlgorithm === algorithm.id
                        ? 'bg-purple-600/30 border border-purple-500/50'
                        : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <h3 className="font-semibold text-white">{algorithm.name}</h3>
                  <div className="text-sm text-gray-400 mt-1">
                    <div>Best: {algorithm.timeComplexity.best}</div>
                    <div>Space: {algorithm.spaceComplexity}</div>
                  </div>
                  {comparisonMode && selectedAlgorithms.includes(algorithm.id) && (
                    <div className="mt-2">
                      <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: algorithm.color }}></span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Benchmark Controls</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Input Size: {inputSize}</label>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={inputSize}
                  onChange={(e) => setInputSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={comparisonMode ? runComparison : runBenchmark}
                disabled={isRunning || (comparisonMode && selectedAlgorithms.length < 2)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {isRunning ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    <span>{comparisonMode ? 'Compare' : 'Run Benchmark'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Algorithm Details */}
          {!comparisonMode && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">{currentAlgorithm.name}</h2>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-400" />
                    Time Complexity
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Best:</span>
                      <span className="text-green-400">{currentAlgorithm.timeComplexity.best}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Average:</span>
                      <span className="text-yellow-400">{currentAlgorithm.timeComplexity.average}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Worst:</span>
                      <span className="text-red-400">{currentAlgorithm.timeComplexity.worst}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2 flex items-center">
                    <Database className="h-4 w-4 mr-2 text-purple-400" />
                    Space Complexity
                  </h3>
                  <div className="text-purple-400">{currentAlgorithm.spaceComplexity}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Complexity Growth Chart */}
          {!comparisonMode && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-400" />
                Complexity Growth Comparison
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={complexityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f3f4f6'
                    }}
                  />
                  <Bar dataKey="value" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Performance Results */}
          {(benchmarkResults.length > 0 && !comparisonMode) && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Performance Results</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={benchmarkResults}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="inputSize" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f3f4f6'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Comparison Results */}
          {(comparisonResults.length > 0 && comparisonMode) && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold text-white mb-4">Algorithm Comparison</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={comparisonResults}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="inputSize" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f3f4f6'
                    }}
                  />
                  {selectedAlgorithms.map(algId => {
                    const algorithm = algorithms.find(alg => alg.id === algId);
                    return (
                      <Line
                        key={algId}
                        type="monotone"
                        dataKey={algorithm.name}
                        stroke={algorithm.color}
                        strokeWidth={2}
                        dot={{ fill: algorithm.color }}
                      />
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Detailed Results Table */}
        {benchmarkResults.length > 0 && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Detailed Results</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-gray-300 py-3 px-4">Input Size</th>
                    <th className="text-gray-300 py-3 px-4">Execution Time (ms)</th>
                    <th className="text-gray-300 py-3 px-4">Memory Usage (KB)</th>
                    <th className="text-gray-300 py-3 px-4">Time per Element (ms)</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarkResults.map((result, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="text-white py-3 px-4">{result.inputSize.toLocaleString()}</td>
                      <td className="text-green-400 py-3 px-4">{result.time}</td>
                      <td className="text-purple-400 py-3 px-4">{result.memory.toFixed(2)}</td>
                      <td className="text-yellow-400 py-3 px-4">
                        {(result.time / result.inputSize).toFixed(4)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplexityAnalyzer;
