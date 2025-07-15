
import React, { useState, useEffect } from 'react';
import { Code, Play, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

const ProblemSolver = () => {
  const [selectedProblem, setSelectedProblem] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [showHint, setShowHint] = useState(false);

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
      template: `function twoSum(nums, target) {
    // Your code here
    
}`,
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
      hint: "Use a hash map to store numbers and their indices as you iterate through the array.",
      testCases: [
        { input: [[2,7,11,15], 9], expected: [0,1] },
        { input: [[3,2,4], 6], expected: [1,2] },
        { input: [[3,3], 6], expected: [0,1] }
      ]
    },
    {
      id: 2,
      title: "Valid Parentheses",
      difficulty: "Easy",
      description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      example: "Input: s = \"()[]{}\"\nOutput: true",
      template: `function isValid(s) {
    // Your code here
    
}`,
      solution: `function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (char in pairs) {
            if (stack.pop() !== pairs[char]) return false;
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
      hint: "Use a stack to keep track of opening brackets and match them with closing brackets.",
      testCases: [
        { input: ["()"], expected: true },
        { input: ["()[]{}"], expected: true },
        { input: ["(]"], expected: false }
      ]
    },
    {
      id: 3,
      title: "Binary Tree Inorder Traversal",
      difficulty: "Medium",
      description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
      example: "Input: root = [1,null,2,3]\nOutput: [1,3,2]",
      template: `function inorderTraversal(root) {
    // Your code here
    
}`,
      solution: `function inorderTraversal(root) {
    const result = [];
    
    function traverse(node) {
        if (!node) return;
        traverse(node.left);
        result.push(node.val);
        traverse(node.right);
    }
    
    traverse(root);
    return result;
}`,
      hint: "Use recursion: visit left subtree, process current node, then visit right subtree.",
      testCases: [
        { input: [null], expected: [] },
        { input: [{ val: 1, left: null, right: null }], expected: [1] }
      ]
    }
  ];

  const currentProblem = problems[selectedProblem];

  useEffect(() => {
    setUserCode(currentProblem.template);
  }, [selectedProblem]);

  const runTests = () => {
    try {
      // Create a function from user code
      const func = new Function('return ' + userCode)();
      const results = currentProblem.testCases.map((testCase, index) => {
        try {
          const result = func(...testCase.input);
          const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
          return {
            index: index + 1,
            passed,
            input: testCase.input,
            expected: testCase.expected,
            actual: result,
            error: null
          };
        } catch (error) {
          return {
            index: index + 1,
            passed: false,
            input: testCase.input,
            expected: testCase.expected,
            actual: null,
            error: error.message
          };
        }
      });
      setTestResults(results);
    } catch (error) {
      setTestResults([{
        index: 0,
        passed: false,
        input: [],
        expected: null,
        actual: null,
        error: 'Syntax Error: ' + error.message
      }]);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const allTestsPassed = testResults.length > 0 && testResults.every(test => test.passed);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Problem <span className="text-purple-400">Solver</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Practice advanced DSA problems with interactive coding challenges
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Problem List */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Problems</h2>
            <div className="space-y-3">
              {problems.map((problem, index) => (
                <button
                  key={problem.id}
                  onClick={() => {
                    setSelectedProblem(index);
                    setUserCode(problem.template);
                    setTestResults([]);
                    setShowHint(false);
                  }}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    selectedProblem === index
                      ? 'bg-purple-600/30 border border-purple-500/50'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{problem.title}</h3>
                    <span className={`text-sm ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {problem.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Problem Details & Code Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Problem Description */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">{currentProblem.title}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(currentProblem.difficulty)} bg-white/10`}>
                  {currentProblem.difficulty}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4">{currentProblem.description}</p>
              
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Example:</h4>
                <pre className="text-green-400 text-sm whitespace-pre-wrap">{currentProblem.example}</pre>
              </div>

              <div className="flex items-center space-x-4 mt-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                >
                  <Lightbulb className="h-4 w-4" />
                  <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                </button>
                
                {allTestsPassed && (
                  <div className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <span>All tests passed!</span>
                  </div>
                )}
              </div>

              {showHint && (
                <div className="mt-4 bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">Hint:</span>
                  </div>
                  <p className="text-yellow-200">{currentProblem.hint}</p>
                </div>
              )}
            </div>

            {/* Code Editor */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-purple-400" />
                  <span className="text-white font-semibold">Code Editor</span>
                </div>
                <button
                  onClick={runTests}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Play className="h-4 w-4" />
                  <span>Run Tests</span>
                </button>
              </div>
              
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-64 bg-gray-900/50 text-white p-4 font-mono text-sm resize-none focus:outline-none"
                placeholder="Write your solution here..."
              />
            </div>

            {/* Test Results */}
            {testResults.length > 0 && (
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Test Results</h3>
                <div className="space-y-3">
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        result.passed
                          ? 'bg-green-600/10 border-green-600/30'
                          : 'bg-red-600/10 border-red-600/30'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        {result.passed ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                        <span className={`font-semibold ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                          Test Case {result.index} {result.passed ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Input:</span>
                          <div className="text-blue-300 font-mono">
                            {JSON.stringify(result.input)}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Expected:</span>
                          <div className="text-green-300 font-mono">
                            {JSON.stringify(result.expected)}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Actual:</span>
                          <div className={`font-mono ${result.passed ? 'text-green-300' : 'text-red-300'}`}>
                            {result.error ? result.error : JSON.stringify(result.actual)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolver;
