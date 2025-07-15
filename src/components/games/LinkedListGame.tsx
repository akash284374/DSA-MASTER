
import React, { useState, useEffect } from 'react';
import { ArrowRight, Target, RotateCcw, Trophy } from 'lucide-react';

const LinkedListGame = () => {
  const [nodes, setNodes] = useState<number[]>([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [targetValue, setTargetValue] = useState(0);
  const [steps, setSteps] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    generateLevel();
  }, [level]);

  const generateLevel = () => {
    const size = Math.min(5 + level, 10);
    const nodeValues = Array.from({ length: size }, () => Math.floor(Math.random() * 50) + 1);
    const target = nodeValues[Math.floor(Math.random() * nodeValues.length)];
    
    setNodes(nodeValues);
    setTargetValue(target);
    setCurrentPosition(0);
    setSteps(0);
    setIsComplete(false);
    setGameStarted(true);
  };

  const moveNext = () => {
    if (currentPosition < nodes.length - 1) {
      setCurrentPosition(prev => prev + 1);
      setSteps(prev => prev + 1);
      
      if (nodes[currentPosition + 1] === targetValue) {
        setIsComplete(true);
        setGameStarted(false);
        const efficiency = Math.max(0, nodes.length - steps);
        setScore(prev => prev + 10 + efficiency + level * 5);
      }
    }
  };

  const resetTraversal = () => {
    setCurrentPosition(0);
    setSteps(0);
    setIsComplete(false);
  };

  const nextLevel = () => {
    setLevel(prev => prev + 1);
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    generateLevel();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Linked List Traversal</h3>
        <p className="text-gray-400">Navigate through the linked list to find the target value!</p>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{level}</div>
          <div className="text-gray-400">Level</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{score}</div>
          <div className="text-gray-400">Score</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{steps}</div>
          <div className="text-gray-400">Steps</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center flex items-center justify-center">
          <Target className="h-5 w-5 text-yellow-400 mr-2" />
          <div className="text-yellow-400 font-bold">{targetValue}</div>
        </div>
      </div>

      {/* Game Instructions */}
      <div className="bg-white/5 rounded-lg p-4 text-center">
        <p className="text-gray-300">
          <span className="text-yellow-400 font-bold">Target: {targetValue}</span> | 
          Current Position: <span className="text-blue-400 font-bold">{currentPosition}</span> | 
          Current Value: <span className="text-purple-400 font-bold">{nodes[currentPosition] || 'N/A'}</span>
        </p>
      </div>

      {/* Linked List Visualization */}
      <div className="bg-white/5 rounded-xl p-6">
        <div className="overflow-x-auto">
          <div className="flex items-center space-x-4 min-w-max">
            <div className="text-green-400 font-semibold">HEAD</div>
            <ArrowRight className="text-gray-400" />
            
            {nodes.map((value, index) => (
              <React.Fragment key={index}>
                <div className="relative">
                  <div className={`px-6 py-4 rounded-lg min-w-20 text-center relative transition-all duration-300 ${
                    index === currentPosition 
                      ? 'bg-blue-600 text-white border-2 border-blue-400 scale-110' 
                      : value === targetValue
                        ? 'bg-yellow-600 text-white border-2 border-yellow-400'
                        : 'bg-gray-700 text-gray-300'
                  }`}>
                    <div className="font-bold text-lg">{value}</div>
                    <div className="text-xs text-gray-400">Node {index}</div>
                    
                    {index === currentPosition && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-blue-400 text-sm font-semibold">
                        Current
                      </div>
                    )}
                    
                    {value === targetValue && index !== currentPosition && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-400 text-sm font-semibold">
                        Target
                      </div>
                    )}
                  </div>
                </div>
                
                {index < nodes.length - 1 && (
                  <ArrowRight className={`${
                    index < currentPosition ? 'text-blue-400' : 'text-gray-400'
                  } transition-colors duration-300`} />
                )}
              </React.Fragment>
            ))}
            
            <ArrowRight className="text-gray-400" />
            <div className="text-red-400 font-semibold">NULL</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={moveNext}
          disabled={isComplete || currentPosition >= nodes.length - 1}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
          <span>Move Next</span>
        </button>
        
        <button
          onClick={resetTraversal}
          className="flex items-center space-x-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset Position</span>
        </button>
        
        {isComplete && (
          <button
            onClick={nextLevel}
            className="flex items-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Trophy className="h-4 w-4" />
            <span>Next Level</span>
          </button>
        )}
      </div>

      {/* Success Message */}
      {isComplete && (
        <div className="text-center p-6 bg-green-600/20 rounded-xl border border-green-500/30">
          <Trophy className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-400 mb-2">Target Found!</h3>
          <p className="text-green-300">
            Found value {targetValue} in {steps} steps at position {currentPosition}
          </p>
          <p className="text-sm text-green-400 mt-2">
            Efficiency Bonus: {Math.max(0, nodes.length - steps)} points
          </p>
        </div>
      )}

      {/* Game Over */}
      {!isComplete && currentPosition >= nodes.length - 1 && nodes[currentPosition] !== targetValue && (
        <div className="text-center p-6 bg-red-600/20 rounded-xl border border-red-500/30">
          <div className="text-4xl mb-4">😞</div>
          <h3 className="text-2xl font-bold text-red-400 mb-2">Target Not Found!</h3>
          <p className="text-red-300">
            The target value {targetValue} was not at the end of the list.
          </p>
          <button
            onClick={generateLevel}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkedListGame;
