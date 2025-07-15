
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';

const Recursion = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('factorial');
  const [inputValue, setInputValue] = useState(5);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState(null);

  const algorithms = [
    { id: 'factorial', name: 'Factorial', description: 'Calculate n! recursively' },
    { id: 'fibonacci', name: 'Fibonacci', description: 'Calculate Fibonacci numbers' },
    { id: 'towerOfHanoi', name: 'Tower of Hanoi', description: 'Solve Tower of Hanoi puzzle' },
    { id: 'binarySearch', name: 'Binary Search', description: 'Search in sorted array' },
  ];

  const factorial = (n, callStack = []) => {
    const newStack = [...callStack, `factorial(${n})`];
    
    if (n === 0 || n === 1) {
      return { result: 1, steps: [...newStack, `Base case: factorial(${n}) = 1`] };
    }
    
    const recursive = factorial(n - 1, newStack);
    const result = n * recursive.result;
    
    return {
      result,
      steps: [...recursive.steps, `factorial(${n}) = ${n} × factorial(${n-1}) = ${n} × ${recursive.result} = ${result}`]
    };
  };

  const fibonacci = (n, memo = {}, callStack = []) => {
    const newStack = [...callStack, `fib(${n})`];
    
    if (n in memo) {
      return { result: memo[n], steps: [...newStack, `Memoized: fib(${n}) = ${memo[n]}`] };
    }
    
    if (n <= 1) {
      memo[n] = n;
      return { result: n, steps: [...newStack, `Base case: fib(${n}) = ${n}`] };
    }
    
    const fib1 = fibonacci(n - 1, memo, newStack);
    const fib2 = fibonacci(n - 2, memo, newStack);
    const result = fib1.result + fib2.result;
    
    memo[n] = result;
    
    return {
      result,
      steps: [...fib1.steps, ...fib2.steps, `fib(${n}) = fib(${n-1}) + fib(${n-2}) = ${fib1.result} + ${fib2.result} = ${result}`]
    };
  };

  const towerOfHanoi = (n, from = 'A', to = 'C', aux = 'B', moves = []) => {
    if (n === 1) {
      moves.push(`Move disk 1 from ${from} to ${to}`);
      return { result: moves.length, steps: [...moves] };
    }
    
    towerOfHanoi(n - 1, from, aux, to, moves);
    moves.push(`Move disk ${n} from ${from} to ${to}`);
    towerOfHanoi(n - 1, aux, to, from, moves);
    
    return { result: moves.length, steps: [...moves] };
  };

  const binarySearch = (arr, target, left = 0, right = arr.length - 1, steps = []) => {
    if (left > right) {
      return { result: -1, steps: [...steps, `Element ${target} not found in array`] };
    }
    
    const mid = Math.floor((left + right) / 2);
    steps.push(`Searching range [${left}, ${right}], mid = ${mid}, arr[${mid}] = ${arr[mid]}`);
    
    if (arr[mid] === target) {
      return { result: mid, steps: [...steps, `Found ${target} at index ${mid}`] };
    }
    
    if (arr[mid] > target) {
      steps.push(`${arr[mid]} > ${target}, search left half`);
      return binarySearch(arr, target, left, mid - 1, steps);
    } else {
      steps.push(`${arr[mid]} < ${target}, search right half`);
      return binarySearch(arr, target, mid + 1, right, steps);
    }
  };

  const executeAlgorithm = () => {
    let algorithmResult;
    
    switch (selectedAlgorithm) {
      case 'factorial':
        algorithmResult = factorial(inputValue);
        break;
      case 'fibonacci':
        algorithmResult = fibonacci(inputValue);
        break;
      case 'towerOfHanoi':
        algorithmResult = towerOfHanoi(Math.min(inputValue, 4)); // Limit to 4 disks for visualization
        break;
      case 'binarySearch':
        const sortedArray = Array.from({ length: 10 }, (_, i) => i * 2);
        algorithmResult = binarySearch(sortedArray, inputValue);
        break;
      default:
        algorithmResult = { result: 0, steps: [] };
    }
    
    setSteps(algorithmResult.steps);
    setResult(algorithmResult.result);
    setCurrentStep(0);
  };

  const playSteps = async () => {
    setIsPlaying(true);
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    setIsPlaying(false);
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setSteps([]);
    setResult(null);
  };

  useEffect(() => {
    executeAlgorithm();
  }, [selectedAlgorithm, inputValue]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          <Zap className="inline h-8 w-8 text-purple-400 mr-2" />
          Recursion Visualizer
        </h2>
        <p className="text-gray-300">
          Explore recursive algorithms and understand how they break down problems
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

            <div>
              <label className="block text-gray-300 mb-2">
                Input Value: {inputValue}
              </label>
              <input
                type="range"
                min="1"
                max={selectedAlgorithm === 'towerOfHanoi' ? 4 : 10}
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={playSteps}
                disabled={isPlaying || steps.length === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg"
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

        {/* Result Display */}
        <div className="bg-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Result</h3>
          
          {result !== null && (
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {selectedAlgorithm === 'binarySearch' && result === -1 ? 'Not Found' : result}
              </div>
              <div className="text-gray-300">
                {selectedAlgorithm === 'factorial' && `${inputValue}! = ${result}`}
                {selectedAlgorithm === 'fibonacci' && `Fibonacci(${inputValue}) = ${result}`}
                {selectedAlgorithm === 'towerOfHanoi' && `${result} moves required`}
                {selectedAlgorithm === 'binarySearch' && 
                  (result === -1 ? `${inputValue} not found` : `Found at index ${result}`)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Steps Visualization */}
      {steps.length > 0 && (
        <div className="bg-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Execution Steps</h3>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-purple-600/30 border border-purple-500'
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

export default Recursion;
