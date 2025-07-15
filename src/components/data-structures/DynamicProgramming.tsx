import React, { useState, useEffect } from 'react';
import { TrendingUp, Play, Pause, RotateCcw } from 'lucide-react';

const DynamicProgramming = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('fibonacci');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [dpTable, setDpTable] = useState([]);
  const [result, setResult] = useState(null);
  const [inputValue, setInputValue] = useState(8);

  const algorithms = [
    { id: 'fibonacci', name: 'Fibonacci DP', description: 'Calculate Fibonacci with memoization' },
    { id: 'knapsack', name: '0/1 Knapsack', description: 'Maximize value with weight constraint' },
    { id: 'lcs', name: 'Longest Common Subsequence', description: 'Find LCS of two strings' },
    { id: 'editDistance', name: 'Edit Distance', description: 'Minimum operations to transform strings' },
  ];

  const fibonacciDP = (n) => {
    const dp = new Array(n + 1);
    const steps = [];
    
    steps.push('Initializing DP table...');
    dp[0] = 0;
    dp[1] = 1;
    steps.push(`dp[0] = 0, dp[1] = 1`);
    
    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
      steps.push(`dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`);
    }
    
    return { result: dp[n], steps, dpTable: dp };
  };

  const knapsackDP = () => {
    const weights = [1, 3, 4, 5];
    const values = [1, 4, 5, 7];
    const capacity = 7;
    const n = weights.length;
    
    const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
    const steps = [];
    
    steps.push(`Items: weights=[${weights.join(', ')}], values=[${values.join(', ')}]`);
    steps.push(`Knapsack capacity: ${capacity}`);
    steps.push('Building DP table...');
    
    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= capacity; w++) {
        if (weights[i - 1] <= w) {
          const include = values[i - 1] + dp[i - 1][w - weights[i - 1]];
          const exclude = dp[i - 1][w];
          dp[i][w] = Math.max(include, exclude);
          
          if (include > exclude) {
            steps.push(`dp[${i}][${w}] = max(include=${include}, exclude=${exclude}) = ${dp[i][w]} (include item ${i})`);
          } else {
            steps.push(`dp[${i}][${w}] = max(include=${include}, exclude=${exclude}) = ${dp[i][w]} (exclude item ${i})`);
          }
        } else {
          dp[i][w] = dp[i - 1][w];
          steps.push(`dp[${i}][${w}] = ${dp[i][w]} (item ${i} too heavy)`);
        }
      }
    }
    
    return { result: dp[n][capacity], steps, dpTable: dp };
  };

  const lcsDP = () => {
    const str1 = "ABCDGH";
    const str2 = "AEDFHR";
    const m = str1.length;
    const n = str2.length;
    
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    const steps = [];
    
    steps.push(`String 1: "${str1}"`);
    steps.push(`String 2: "${str2}"`);
    steps.push('Building LCS table...');
    
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          steps.push(`${str1[i-1]} == ${str2[j-1]}: dp[${i}][${j}] = dp[${i-1}][${j-1}] + 1 = ${dp[i][j]}`);
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          steps.push(`${str1[i-1]} != ${str2[j-1]}: dp[${i}][${j}] = max(dp[${i-1}][${j}], dp[${i}][${j-1}]) = ${dp[i][j]}`);
        }
      }
    }
    
    return { result: dp[m][n], steps, dpTable: dp };
  };

  const editDistanceDP = () => {
    const str1 = "SUNDAY";
    const str2 = "SATURDAY";
    const m = str1.length;
    const n = str2.length;
    
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    const steps = [];
    
    steps.push(`Transform "${str1}" to "${str2}"`);
    steps.push('Initializing base cases...');
    
    // Initialize base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    steps.push('Base cases: dp[i][0] = i (deletions), dp[0][j] = j (insertions)');
    
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
          steps.push(`${str1[i-1]} == ${str2[j-1]}: dp[${i}][${j}] = dp[${i-1}][${j-1}] = ${dp[i][j]} (no operation)`);
        } else {
          const replace = dp[i - 1][j - 1] + 1;
          const insert = dp[i][j - 1] + 1;
          const remove = dp[i - 1][j] + 1;
          
          dp[i][j] = Math.min(replace, insert, remove);
          steps.push(`${str1[i-1]} != ${str2[j-1]}: dp[${i}][${j}] = min(replace=${replace}, insert=${insert}, delete=${remove}) = ${dp[i][j]}`);
        }
      }
    }
    
    return { result: dp[m][n], steps, dpTable: dp };
  };

  const executeAlgorithm = () => {
    let algorithmResult;
    
    switch (selectedAlgorithm) {
      case 'fibonacci':
        algorithmResult = fibonacciDP(inputValue);
        break;
      case 'knapsack':
        algorithmResult = knapsackDP();
        break;
      case 'lcs':
        algorithmResult = lcsDP();
        break;
      case 'editDistance':
        algorithmResult = editDistanceDP();
        break;
      default:
        algorithmResult = { result: 0, steps: [], dpTable: [] };
    }
    
    setSteps(algorithmResult.steps);
    setDpTable(algorithmResult.dpTable);
    setResult(algorithmResult.result);
    setCurrentStep(0);
  };

  const playSteps = async () => {
    setIsPlaying(true);
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
    setIsPlaying(false);
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    executeAlgorithm();
  };

  useEffect(() => {
    executeAlgorithm();
  }, [selectedAlgorithm, inputValue]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          <TrendingUp className="inline h-8 w-8 text-blue-400 mr-2" />
          Dynamic Programming
        </h2>
        <p className="text-gray-300">
          Solve complex problems by breaking them into overlapping subproblems
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="bg-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Algorithm Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Select Algorithm:</label>
              <select
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
              >
                {algorithms.map(alg => (
                  <option key={alg.id} value={alg.id}>{alg.name}</option>
                ))}
              </select>
              <p className="text-sm text-gray-400 mt-1">
                {algorithms.find(alg => alg.id === selectedAlgorithm)?.description}
              </p>
            </div>

            {selectedAlgorithm === 'fibonacci' && (
              <div>
                <label className="block text-gray-300 mb-2">
                  Fibonacci Number: {inputValue}
                </label>
                <input
                  type="range"
                  min="3"
                  max="15"
                  value={inputValue}
                  onChange={(e) => setInputValue(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            <div className="flex space-x-2">
              <button
                onClick={playSteps}
                disabled={isPlaying || steps.length === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isPlaying ? 'Playing...' : 'Play Steps'}</span>
              </button>
              
              <button
                onClick={reset}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Result</h3>
          
          {result !== null && (
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {result}
              </div>
              <div className="text-gray-300">
                {selectedAlgorithm === 'fibonacci' && `Fibonacci(${inputValue}) = ${result}`}
                {selectedAlgorithm === 'knapsack' && `Maximum value: ${result}`}
                {selectedAlgorithm === 'lcs' && `LCS length: ${result}`}
                {selectedAlgorithm === 'editDistance' && `Minimum operations: ${result}`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DP Table Visualization */}
      {dpTable.length > 0 && (
        <div className="bg-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">DP Table</h3>
          
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse">
              <tbody>
                {dpTable.map((row, i) => (
                  <tr key={i}>
                    {Array.isArray(row) ? (
                      row.map((cell, j) => (
                        <td
                          key={j}
                          className="border border-gray-600 px-3 py-2 text-center text-white bg-purple-900/30"
                        >
                          {cell}
                        </td>
                      ))
                    ) : (
                      <td className="border border-gray-600 px-3 py-2 text-center text-white bg-purple-900/30">
                        {row}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Steps Visualization */}
      {steps.length > 0 && (
        <div className="bg-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Algorithm Steps</h3>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-blue-600/30 border border-blue-500'
                    : index < currentStep
                    ? 'bg-green-600/20 border border-green-500/30'
                    : 'bg-gray-700/30 border border-gray-600/30'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-mono text-gray-400">#{index + 1}</span>
                  <span className="text-white">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicProgramming;
