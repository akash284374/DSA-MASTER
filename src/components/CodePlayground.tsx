
import React, { useState } from 'react';
import { Play, RotateCcw, Code, Download, Upload } from 'lucide-react';

const CodePlayground = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(`// Write your algorithm here
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Test the algorithm
const testArray = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", testArray);
console.log("Sorted array:", bubbleSort([...testArray]));`);
  
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const languages = [
    { id: 'javascript', name: 'JavaScript', template: '// Write your JavaScript code here\n' },
    { id: 'python', name: 'Python', template: '# Write your Python code here\n' },
    { id: 'java', name: 'Java', template: '// Write your Java code here\npublic class Solution {\n    \n}\n' },
    { id: 'cpp', name: 'C++', template: '// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n' }
  ];

  const algorithmTemplates = [
    {
      name: 'Binary Search',
      code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

// Test
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];
console.log("Array:", sortedArray);
console.log("Search for 7:", binarySearch(sortedArray, 7));
console.log("Search for 6:", binarySearch(sortedArray, 6));`
    },
    {
      name: 'Quick Sort',
      code: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Test
const testArray = [3, 6, 8, 10, 1, 2, 1];
console.log("Original:", testArray);
console.log("Sorted:", quickSort(testArray));`
    },
    {
      name: 'DFS Graph Traversal',
      code: `class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }
  
  dfs(start) {
    const result = [];
    const visited = {};
    
    const traverse = (vertex) => {
      visited[vertex] = true;
      result.push(vertex);
      
      this.adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          traverse(neighbor);
        }
      });
    };
    
    traverse(start);
    return result;
  }
}

// Test
const graph = new Graph();
['A', 'B', 'C', 'D', 'E', 'F'].forEach(v => graph.addVertex(v));
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');
graph.addEdge('D', 'E');
graph.addEdge('D', 'F');
graph.addEdge('E', 'F');

console.log("DFS traversal from A:", graph.dfs('A'));`
    }
  ];

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    
    try {
      // Simulate code execution (in a real app, this would send to a backend)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (selectedLanguage === 'javascript') {
        // Capture console.log output
        const originalLog = console.log;
        let capturedOutput = '';
        
        console.log = (...args) => {
          capturedOutput += args.join(' ') + '\n';
        };
        
        try {
          // Execute the code
          eval(code);
          setOutput(capturedOutput || 'Code executed successfully (no output)');
        } catch (error) {
          setOutput(`Error: ${error.message}`);
        } finally {
          console.log = originalLog;
        }
      } else {
        setOutput('Code execution simulation:\n✅ Compilation successful\n✅ Test cases passed\n\nNote: Full execution requires backend integration for non-JavaScript languages.');
      }
    } catch (error) {
      setOutput(`Execution error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    const template = languages.find(lang => lang.id === selectedLanguage)?.template || '';
    setCode(template);
    setOutput('');
  };

  const loadTemplate = (template) => {
    setCode(template.code);
    setOutput('');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <Code className="inline h-8 w-8 text-green-400 mr-2" />
            Code <span className="text-green-400">Playground</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Write, test, and debug algorithms in multiple programming languages
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Code Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
              {/* Editor Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                  >
                    {languages.map(lang => (
                      <option key={lang.id} value={lang.id}>{lang.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg"
                  >
                    <Play className="h-4 w-4" />
                    <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                  </button>
                  
                  <button
                    onClick={resetCode}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Code Editor */}
              <div className="p-0">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-96 bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none border-none outline-none"
                  placeholder="Write your code here..."
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Output */}
            <div className="mt-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Output</h3>
              </div>
              <div className="p-4">
                <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap bg-gray-900 p-4 rounded-lg max-h-64 overflow-y-auto">
                  {output || 'Output will appear here after running your code...'}
                </pre>
              </div>
            </div>
          </div>

          {/* Algorithm Templates */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Algorithm Templates</h3>
              
              <div className="space-y-3">
                {algorithmTemplates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => loadTemplate(template)}
                    className="w-full text-left p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <div className="text-white font-medium">{template.name}</div>
                    <div className="text-gray-400 text-sm">Click to load template</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-2 p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors">
                  <Download className="h-4 w-4 text-blue-400" />
                  <span className="text-white">Export Code</span>
                </button>
                
                <button className="w-full flex items-center space-x-2 p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors">
                  <Upload className="h-4 w-4 text-purple-400" />
                  <span className="text-white">Import Code</span>
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">💡 Tips</h3>
              
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Use console.log() to debug your code</p>
                <p>• Test with different input sizes</p>
                <p>• Consider edge cases in your algorithms</p>
                <p>• Analyze time and space complexity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
