
import React, { useState, useEffect } from 'react';
import { Target, Clock, CheckCircle, XCircle, Code, Lightbulb, Star } from 'lucide-react';

const InterviewPrep = () => {
  const [selectedCategory, setSelectedCategory] = useState('arrays');
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedProblems, setCompletedProblems] = useState(new Set());

  const categories = [
    { id: 'arrays', name: 'Arrays & Strings', count: 15, difficulty: 'Easy-Hard' },
    { id: 'linkedlists', name: 'Linked Lists', count: 12, difficulty: 'Easy-Medium' },
    { id: 'trees', name: 'Trees & Graphs', count: 18, difficulty: 'Medium-Hard' },
    { id: 'dp', name: 'Dynamic Programming', count: 10, difficulty: 'Hard' },
    { id: 'system', name: 'System Design', count: 8, difficulty: 'Hard' },
  ];

  const problems = {
    arrays: [
      {
        id: 1,
        title: 'Two Sum',
        difficulty: 'Easy',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        hints: [
          'Think about using a hash map to store complements',
          'For each number, check if its complement exists in the hash map',
          'Return the indices when you find a match'
        ],
        solution: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        companies: ['Google', 'Amazon', 'Microsoft', 'Facebook']
      },
      {
        id: 2,
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
        hints: [
          'Keep track of the minimum price seen so far',
          'For each price, calculate the profit if we sell at this price',
          'Keep track of the maximum profit'
        ],
        solution: `function maxProfit(prices) {
    let minPrice = prices[0];
    let maxProfit = 0;
    
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else {
            maxProfit = Math.max(maxProfit, prices[i] - minPrice);
        }
    }
    
    return maxProfit;
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        companies: ['Amazon', 'Bloomberg', 'Apple']
      }
    ],
    linkedlists: [
      {
        id: 3,
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
        hints: [
          'Use three pointers: prev, current, and next',
          'Iterate through the list and reverse the links',
          'Be careful not to lose the reference to the next node'
        ],
        solution: `function reverseList(head) {
    let prev = null;
    let current = head;
    
    while (current !== null) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev;
}`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        companies: ['Google', 'Microsoft', 'Apple', 'Netflix']
      }
    ]
  };

  const currentCategoryProblems = problems[selectedCategory] || [];
  const problem = currentCategoryProblems[currentProblem];

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimer(0);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const nextProblem = () => {
    if (currentProblem < currentCategoryProblems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setUserAnswer('');
      setShowSolution(false);
      setTimer(0);
      setIsTimerRunning(false);
    }
  };

  const markAsCompleted = () => {
    if (problem) {
      setCompletedProblems(prev => new Set([...prev, problem.id]));
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <Target className="inline h-8 w-8 text-orange-400 mr-2" />
            Interview <span className="text-orange-400">Preparation</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Practice coding problems from top tech companies with timed challenges
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Category Selection */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Categories</h3>
              
              <div className="space-y-3">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setCurrentProblem(0);
                      setUserAnswer('');
                      setShowSolution(false);
                      stopTimer();
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-orange-600/30 border border-orange-500'
                        : 'bg-white/10 hover:bg-white/20 border border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-white font-medium">{category.name}</span>
                      <span className="text-xs text-gray-400">{category.count}</span>
                    </div>
                    <div className="text-sm text-gray-400">{category.difficulty}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Progress</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Completed</span>
                  <span className="text-green-400 font-bold">{completedProblems.size}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Current Streak</span>
                  <span className="text-orange-400 font-bold">7 days</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Average Time</span>
                  <span className="text-blue-400 font-bold">15:32</span>
                </div>
              </div>
            </div>
          </div>

          {/* Problem Area */}
          <div className="lg:col-span-3 space-y-6">
            {problem ? (
              <>
                {/* Problem Header */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <h2 className="text-2xl font-bold text-white">{problem.title}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        problem.difficulty === 'Easy' ? 'bg-green-600/20 text-green-400' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-600/20 text-yellow-400' :
                        'bg-red-600/20 text-red-400'
                      }`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-orange-400" />
                        <span className="text-white font-mono text-lg">{formatTime(timer)}</span>
                      </div>
                      
                      <button
                        onClick={isTimerRunning ? stopTimer : startTimer}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          isTimerRunning 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {isTimerRunning ? 'Stop' : 'Start'} Timer
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{problem.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {problem.companies.map(company => (
                      <span key={company} className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Code Editor */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h3 className="text-lg font-semibold text-white">
                      <Code className="inline h-5 w-5 mr-2" />
                      Your Solution
                    </h3>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowSolution(!showSolution)}
                        className="flex items-center space-x-2 px-3 py-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded"
                      >
                        <Lightbulb className="h-4 w-4" />
                        <span>Hints</span>
                      </button>
                      
                      <button
                        onClick={markAsCompleted}
                        className="flex items-center space-x-2 px-3 py-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Mark Complete</span>
                      </button>
                    </div>
                  </div>
                  
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Write your solution here..."
                    className="w-full h-64 bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none border-none outline-none"
                  />
                </div>

                {/* Hints and Solution */}
                {showSolution && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        <Lightbulb className="inline h-5 w-5 mr-2 text-yellow-400" />
                        Hints
                      </h3>
                      
                      <div className="space-y-2">
                        {problem.hints.map((hint, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <span className="text-yellow-400 font-bold">{index + 1}.</span>
                            <span className="text-gray-300">{hint}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        <Star className="inline h-5 w-5 mr-2 text-green-400" />
                        Optimal Solution
                      </h3>
                      
                      <pre className="bg-gray-900 p-4 rounded-lg text-sm text-gray-300 overflow-x-auto">
                        <code>{problem.solution}</code>
                      </pre>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Time:</span>
                          <span className="text-green-400 ml-2">{problem.timeComplexity}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Space:</span>
                          <span className="text-blue-400 ml-2">{problem.spaceComplexity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      if (currentProblem > 0) {
                        setCurrentProblem(currentProblem - 1);
                        setUserAnswer('');
                        setShowSolution(false);
                        stopTimer();
                      }
                    }}
                    disabled={currentProblem === 0}
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 text-white rounded-lg"
                  >
                    Previous
                  </button>
                  
                  <div className="text-gray-400">
                    Problem {currentProblem + 1} of {currentCategoryProblems.length}
                  </div>
                  
                  <button
                    onClick={nextProblem}
                    disabled={currentProblem === currentCategoryProblems.length - 1}
                    className="px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-800 text-white rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-12 text-center">
                <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Problems Available</h3>
                <p className="text-gray-400">Select a different category to see problems.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
