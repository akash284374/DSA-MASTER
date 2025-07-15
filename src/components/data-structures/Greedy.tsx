
import React, { useState, useEffect } from 'react';
import { Target, Play, Pause, RotateCcw } from 'lucide-react';

const Greedy = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('coinChange');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState(null);
  const [inputAmount, setInputAmount] = useState(67);

  const algorithms = [
    { id: 'coinChange', name: 'Coin Change', description: 'Find minimum coins needed' },
    { id: 'activitySelection', name: 'Activity Selection', description: 'Select maximum non-overlapping activities' },
    { id: 'fractionalKnapsack', name: 'Fractional Knapsack', description: 'Maximize value with weight constraint' },
    { id: 'huffmanCoding', name: 'Huffman Coding', description: 'Optimal prefix-free coding' },
  ];

  const coinChangeGreedy = (amount) => {
    const coins = [25, 10, 5, 1]; // quarters, dimes, nickels, pennies
    const result = [];
    const steps = [];
    let remaining = amount;

    steps.push(`Starting with amount: $${(amount / 100).toFixed(2)}`);

    for (const coin of coins) {
      if (remaining >= coin) {
        const count = Math.floor(remaining / coin);
        result.push({ coin, count });
        remaining -= coin * count;
        
        const coinName = coin === 25 ? 'quarters' : coin === 10 ? 'dimes' : coin === 5 ? 'nickels' : 'pennies';
        steps.push(`Use ${count} ${coinName} (${coin}¢ each): ${count} × ${coin}¢ = ${coin * count}¢`);
        steps.push(`Remaining: ${remaining}¢`);
      }
    }

    return { result, steps, totalCoins: result.reduce((sum, item) => sum + item.count, 0) };
  };

  const activitySelectionGreedy = () => {
    const activities = [
      { id: 1, start: 1, finish: 4 },
      { id: 2, start: 3, finish: 5 },
      { id: 3, start: 0, finish: 6 },
      { id: 4, start: 5, finish: 7 },
      { id: 5, start: 8, finish: 9 },
      { id: 6, start: 5, finish: 9 },
      { id: 7, start: 6, finish: 10 },
      { id: 8, start: 8, finish: 11 },
      { id: 9, start: 11, finish: 12 },
      { id: 10, start: 2, finish: 14 },
    ];

    // Sort by finish time
    const sortedActivities = [...activities].sort((a, b) => a.finish - b.finish);
    const selected = [sortedActivities[0]];
    const steps = [];
    
    steps.push('Activities sorted by finish time:');
    steps.push(sortedActivities.map(a => `Activity ${a.id}: [${a.start}, ${a.finish}]`).join(', '));
    steps.push(`Selected Activity ${sortedActivities[0].id}: [${sortedActivities[0].start}, ${sortedActivities[0].finish}]`);

    let lastFinishTime = sortedActivities[0].finish;

    for (let i = 1; i < sortedActivities.length; i++) {
      const activity = sortedActivities[i];
      if (activity.start >= lastFinishTime) {
        selected.push(activity);
        lastFinishTime = activity.finish;
        steps.push(`Selected Activity ${activity.id}: [${activity.start}, ${activity.finish}] (starts after ${lastFinishTime - activity.finish + activity.start})`);
      } else {
        steps.push(`Rejected Activity ${activity.id}: [${activity.start}, ${activity.finish}] (conflicts with previous selection)`);
      }
    }

    return { result: selected, steps, totalActivities: selected.length };
  };

  const fractionalKnapsackGreedy = () => {
    const items = [
      { id: 1, weight: 20, value: 100, ratio: 5 },
      { id: 2, weight: 30, value: 120, ratio: 4 },
      { id: 3, weight: 10, value: 60, ratio: 6 },
    ];
    const capacity = 50;

    const sortedItems = [...items].sort((a, b) => b.ratio - a.ratio);
    const selected = [];
    const steps = [];
    let remainingCapacity = capacity;
    let totalValue = 0;

    steps.push(`Knapsack capacity: ${capacity}`);
    steps.push('Items sorted by value/weight ratio:');
    steps.push(sortedItems.map(item => `Item ${item.id}: value=${item.value}, weight=${item.weight}, ratio=${item.ratio}`).join('; '));

    for (const item of sortedItems) {
      if (remainingCapacity >= item.weight) {
        // Take the whole item
        selected.push({ ...item, fraction: 1 });
        remainingCapacity -= item.weight;
        totalValue += item.value;
        steps.push(`Take complete Item ${item.id}: weight=${item.weight}, value=${item.value}`);
      } else if (remainingCapacity > 0) {
        // Take fraction of the item
        const fraction = remainingCapacity / item.weight;
        selected.push({ ...item, fraction });
        totalValue += item.value * fraction;
        steps.push(`Take ${(fraction * 100).toFixed(1)}% of Item ${item.id}: weight=${remainingCapacity}, value=${(item.value * fraction).toFixed(1)}`);
        remainingCapacity = 0;
      } else {
        steps.push(`Cannot take Item ${item.id}: no remaining capacity`);
      }
      
      steps.push(`Remaining capacity: ${remainingCapacity}, Total value: ${totalValue.toFixed(1)}`);
    }

    return { result: selected, steps, totalValue: totalValue.toFixed(1) };
  };

  const huffmanCodingGreedy = () => {
    const frequencies = [
      { char: 'A', freq: 45 },
      { char: 'B', freq: 13 },
      { char: 'C', freq: 12 },
      { char: 'D', freq: 16 },
      { char: 'E', freq: 9 },
      { char: 'F', freq: 5 },
    ];

    const steps = [];
    const nodes = frequencies.map(f => ({ ...f, left: null, right: null }));
    
    steps.push('Initial frequencies:');
    steps.push(frequencies.map(f => `${f.char}: ${f.freq}`).join(', '));

    while (nodes.length > 1) {
      nodes.sort((a, b) => a.freq - b.freq);
      
      const left = nodes.shift();
      const right = nodes.shift();
      const merged = {
        char: `(${left.char}+${right.char})`,
        freq: left.freq + right.freq,
        left,
        right
      };
      
      nodes.push(merged);
      steps.push(`Merge ${left.char}(${left.freq}) + ${right.char}(${right.freq}) = ${merged.char}(${merged.freq})`);
    }

    const buildCodes = (node, code = '', codes = {}) => {
      if (!node.left && !node.right) {
        codes[node.char] = code || '0';
        return codes;
      }
      
      if (node.left) buildCodes(node.left, code + '0', codes);
      if (node.right) buildCodes(node.right, code + '1', codes);
      
      return codes;
    };

    const codes = buildCodes(nodes[0]);
    steps.push('Final Huffman codes:');
    Object.entries(codes).forEach(([char, code]) => {
      steps.push(`${char}: ${code}`);
    });

    return { result: codes, steps, totalNodes: Object.keys(codes).length };
  };

  const executeAlgorithm = () => {
    let algorithmResult;
    
    switch (selectedAlgorithm) {
      case 'coinChange':
        algorithmResult = coinChangeGreedy(inputAmount);
        break;
      case 'activitySelection':
        algorithmResult = activitySelectionGreedy();
        break;
      case 'fractionalKnapsack':
        algorithmResult = fractionalKnapsackGreedy();
        break;
      case 'huffmanCoding':
        algorithmResult = huffmanCodingGreedy();
        break;
      default:
        algorithmResult = { result: null, steps: [], totalCoins: 0 };
    }
    
    setSteps(algorithmResult.steps);
    setResult(algorithmResult);
    setCurrentStep(0);
  };

  const playSteps = async () => {
    setIsPlaying(true);
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
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
  }, [selectedAlgorithm, inputAmount]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          <Target className="inline h-8 w-8 text-green-400 mr-2" />
          Greedy Algorithms
        </h2>
        <p className="text-gray-300">
          Explore greedy algorithms that make locally optimal choices
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

            {selectedAlgorithm === 'coinChange' && (
              <div>
                <label className="block text-gray-300 mb-2">
                  Amount (cents): {inputAmount}
                </label>
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            <div className="flex space-x-2">
              <button
                onClick={playSteps}
                disabled={isPlaying || steps.length === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg"
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
          
          {result && (
            <div className="space-y-3">
              {selectedAlgorithm === 'coinChange' && (
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {result.totalCoins} coins needed
                  </div>
                  <div className="text-gray-300">
                    for ${(inputAmount / 100).toFixed(2)}
                  </div>
                </div>
              )}
              
              {selectedAlgorithm === 'activitySelection' && (
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {result.totalActivities} activities selected
                  </div>
                  <div className="text-gray-300">
                    Maximum non-overlapping activities
                  </div>
                </div>
              )}
              
              {selectedAlgorithm === 'fractionalKnapsack' && (
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    Value: {result.totalValue}
                  </div>
                  <div className="text-gray-300">
                    Maximum value achieved
                  </div>
                </div>
              )}
              
              {selectedAlgorithm === 'huffmanCoding' && (
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {result.totalNodes} characters encoded
                  </div>
                  <div className="text-gray-300">
                    Optimal prefix-free codes
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

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
                    ? 'bg-green-600/30 border border-green-500'
                    : index < currentStep
                    ? 'bg-blue-600/20 border border-blue-500/30'
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

export default Greedy;
