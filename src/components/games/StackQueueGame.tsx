
import React, { useState } from 'react';
import { Layers, Plus, Minus, Trophy, RotateCcw } from 'lucide-react';

const StackQueueGame = () => {
  const [stack, setStack] = useState<number[]>([]);
  const [queue, setQueue] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStatus, setGameStatus] = useState('');
  const [activeStructure, setActiveStructure] = useState<'stack' | 'queue'>('stack');

  const pushToStack = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    setStack([...stack, value]);
    setScore(score + 5);
    setMoves(moves + 1);
    setGameStatus(`Pushed ${value} to Stack`);
    setInputValue('');
  };

  const popFromStack = () => {
    if (stack.length === 0) {
      setGameStatus('Stack is empty! Cannot pop.');
      return;
    }

    const poppedValue = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    setScore(score + 5);
    setMoves(moves + 1);
    setGameStatus(`Popped ${poppedValue} from Stack`);
  };

  const enqueue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    setQueue([...queue, value]);
    setScore(score + 5);
    setMoves(moves + 1);
    setGameStatus(`Enqueued ${value} to Queue`);
    setInputValue('');
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setGameStatus('Queue is empty! Cannot dequeue.');
      return;
    }

    const dequeuedValue = queue[0];
    setQueue(queue.slice(1));
    setScore(score + 5);
    setMoves(moves + 1);
    setGameStatus(`Dequeued ${dequeuedValue} from Queue`);
  };

  const reset = () => {
    setStack([]);
    setQueue([]);
    setScore(0);
    setMoves(0);
    setGameStatus('');
    setInputValue('');
  };

  const handleAdd = () => {
    if (activeStructure === 'stack') {
      pushToStack();
    } else {
      enqueue();
    }
  };

  const handleRemove = () => {
    if (activeStructure === 'stack') {
      popFromStack();
    } else {
      dequeue();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
          <Layers className="h-8 w-8 mr-3 text-purple-400" />
          Stack & Queue Challenge
        </h2>
        <p className="text-gray-400">Master LIFO and FIFO data structures</p>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
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
          <div className="text-2xl font-bold text-green-400">
            {stack.length + queue.length}
          </div>
          <div className="text-gray-400 text-sm">Total Elements</div>
        </div>
      </div>

      {/* Structure Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-white/10 rounded-lg p-1 flex">
          <button
            onClick={() => setActiveStructure('stack')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeStructure === 'stack' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Stack (LIFO)
          </button>
          <button
            onClick={() => setActiveStructure('queue')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeStructure === 'queue' 
                ? 'bg-green-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Queue (FIFO)
          </button>
        </div>
      </div>

      {/* Visualizations */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Stack Visualization */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Layers className="h-5 w-5 mr-2 text-purple-400" />
            Stack (LIFO - Last In, First Out)
          </h3>
          
          <div className="relative h-64 flex flex-col-reverse items-center justify-start space-y-reverse space-y-1 p-4 bg-gray-800 rounded-lg overflow-auto">
            {stack.length === 0 ? (
              <div className="text-gray-500 text-center w-full">Empty Stack</div>
            ) : (
              stack.map((value, index) => (
                <div
                  key={index}
                  className={`w-24 h-10 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold shadow-lg ${
                    index === stack.length - 1 ? 'ring-2 ring-yellow-400' : ''
                  }`}
                >
                  {value}
                  {index === stack.length - 1 && (
                    <span className="absolute -right-16 text-yellow-400 text-xs">← TOP</span>
                  )}
                </div>
              ))
            )}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Top: {stack.length > 0 ? stack[stack.length - 1] : 'None'}
            </p>
            <p className="text-gray-400 text-sm">Size: {stack.length}</p>
          </div>
        </div>

        {/* Queue Visualization */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="h-5 w-5 mr-2 text-green-400">→</span>
            Queue (FIFO - First In, First Out)
          </h3>
          
          <div className="relative h-64 flex flex-col items-center justify-center space-y-2 p-4 bg-gray-800 rounded-lg overflow-auto">
            {queue.length === 0 ? (
              <div className="text-gray-500 text-center">Empty Queue</div>
            ) : (
              <div className="flex flex-col space-y-2 w-full">
                <div className="text-xs text-gray-400 text-center">FRONT ↓</div>
                {queue.map((value, index) => (
                  <div
                    key={index}
                    className={`w-24 h-10 bg-gradient-to-r from-green-600 to-green-400 rounded-lg flex items-center justify-center text-white font-bold shadow-lg mx-auto ${
                      index === 0 ? 'ring-2 ring-yellow-400' : ''
                    }`}
                  >
                    {value}
                    {index === 0 && (
                      <span className="absolute -right-16 text-yellow-400 text-xs">← FRONT</span>
                    )}
                  </div>
                ))}
                <div className="text-xs text-gray-400 text-center">↑ REAR</div>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Front: {queue.length > 0 ? queue[0] : 'None'}
            </p>
            <p className="text-gray-400 text-sm">Size: {queue.length}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-green-400" />
            Add Element
          </h3>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Enter number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
            <button
              onClick={handleAdd}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
            >
              {activeStructure === 'stack' ? 'Push to Stack' : 'Enqueue to Queue'}
            </button>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Minus className="h-5 w-5 mr-2 text-red-400" />
            Remove Element
          </h3>
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">
              {activeStructure === 'stack' 
                ? 'Remove from top (LIFO)' 
                : 'Remove from front (FIFO)'}
            </p>
            <button
              onClick={handleRemove}
              disabled={
                (activeStructure === 'stack' && stack.length === 0) ||
                (activeStructure === 'queue' && queue.length === 0)
              }
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-lg transition-colors"
            >
              {activeStructure === 'stack' ? 'Pop from Stack' : 'Dequeue from Queue'}
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
              Reset All
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
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-purple-400 mb-2">Stack (LIFO):</h4>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Push elements to the top</li>
              <li>• Pop removes the last added element</li>
              <li>• Like a stack of plates</li>
              <li>• Used in: function calls, undo operations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-400 mb-2">Queue (FIFO):</h4>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Enqueue elements to the rear</li>
              <li>• Dequeue removes the first added element</li>
              <li>• Like a line of people</li>
              <li>• Used in: scheduling, breadth-first search</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackQueueGame;
