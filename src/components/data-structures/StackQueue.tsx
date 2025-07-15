
import React, { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

const StackQueue = () => {
  const [stack, setStack] = useState([]);
  const [queue, setQueue] = useState([]);
  const [stackInput, setStackInput] = useState('');
  const [queueInput, setQueueInput] = useState('');

  const pushToStack = () => {
    if (stackInput.trim()) {
      setStack(prev => [...prev, stackInput.trim()]);
      setStackInput('');
    }
  };

  const popFromStack = () => {
    setStack(prev => prev.slice(0, -1));
  };

  const enqueue = () => {
    if (queueInput.trim()) {
      setQueue(prev => [...prev, queueInput.trim()]);
      setQueueInput('');
    }
  };

  const dequeue = () => {
    setQueue(prev => prev.slice(1));
  };

  const clearStack = () => setStack([]);
  const clearQueue = () => setQueue([]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Stack */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Stack (LIFO)</h2>
          <p className="text-gray-400">Last In, First Out</p>
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter value"
            value={stackInput}
            onChange={(e) => setStackInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && pushToStack()}
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
          />
          <button
            onClick={pushToStack}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={popFromStack}
            disabled={stack.length === 0}
            className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={clearStack}
            className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-6 min-h-96">
          <div className="text-center mb-4">
            <span className="text-gray-400">← Pop (Top)</span>
          </div>
          <div className="space-y-2">
            {[...stack].reverse().map((item, index) => (
              <div
                key={stack.length - 1 - index}
                className={`bg-purple-600 text-white p-3 rounded-lg text-center transition-all duration-300 ${
                  index === 0 ? 'ring-2 ring-purple-400' : ''
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-400">Push (Bottom) →</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xl font-bold text-purple-400">{stack.length}</div>
            <div className="text-gray-400 text-sm">Size</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xl font-bold text-green-400">O(1)</div>
            <div className="text-gray-400 text-sm">Push</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xl font-bold text-red-400">O(1)</div>
            <div className="text-gray-400 text-sm">Pop</div>
          </div>
        </div>
      </div>

      {/* Queue */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Queue (FIFO)</h2>
          <p className="text-gray-400">First In, First Out</p>
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter value"
            value={queueInput}
            onChange={(e) => setQueueInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && enqueue()}
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
          />
          <button
            onClick={enqueue}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={dequeue}
            disabled={queue.length === 0}
            className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={clearQueue}
            className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        <div className="bg-gray-900/50 rounded-xl p-6 min-h-96">
          <div className="text-center mb-4">
            <span className="text-gray-400">← Dequeue (Front)</span>
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {queue.map((item, index) => (
              <div
                key={index}
                className={`bg-blue-600 text-white p-3 rounded-lg text-center min-w-20 transition-all duration-300 ${
                  index === 0 ? 'ring-2 ring-blue-400' : ''
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-400">Enqueue (Rear) →</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xl font-bold text-blue-400">{queue.length}</div>
            <div className="text-gray-400 text-sm">Size</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xl font-bold text-green-400">O(1)</div>
            <div className="text-gray-400 text-sm">Enqueue</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xl font-bold text-red-400">O(1)</div>
            <div className="text-gray-400 text-sm">Dequeue</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackQueue;
