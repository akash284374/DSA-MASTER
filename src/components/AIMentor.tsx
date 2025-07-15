
import React, { useState, useRef, useEffect } from 'react';
import { Brain, MessageCircle, Send, Code, Lightbulb, Target, User, Bot as BotIcon } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
  codeExample?: string;
}

const AIMentor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI mentor for Data Structures and Algorithms. I can help you with coding problems, explain concepts, analyze complexity, and provide guidance on technical interviews. What would you like to learn about today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "Explain Big O notation",
    "How does binary search work?",
    "What's the difference between stack and queue?",
    "Help me with dynamic programming",
    "Explain graph traversal algorithms",
    "How to approach coding interviews?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): { content: string; codeExample?: string } => {
    const message = userMessage.toLowerCase().trim();
    
    console.log('Processing user message:', message);
    
    // Check for Big O related questions
    if (message.includes('big o') || message.includes('complexity') || message.includes('time complexity') || message.includes('space complexity')) {
      console.log('Matched Big O question');
      return {
        content: "**Big O Notation** describes how algorithm performance scales with input size. It focuses on the worst-case scenario and dominant operations.\n\n**Common Time Complexities:**\n• **O(1) - Constant**: Array access, hash table lookup\n• **O(log n) - Logarithmic**: Binary search, balanced tree operations\n• **O(n) - Linear**: Single loop, array traversal\n• **O(n log n) - Linearithmic**: Merge sort, heap sort\n• **O(n²) - Quadratic**: Nested loops, bubble sort\n• **O(2ⁿ) - Exponential**: Brute force recursive solutions\n\n**How to Calculate:**\n1. Count dominant operations (loops, recursions)\n2. Drop constants and lower-order terms\n3. Focus on worst-case behavior\n\n**Space Complexity** measures memory usage - consider variables, recursion stack, and data structures created.",
        codeExample: `// O(1) - Constant Time
function getFirstElement(arr) {
    return arr[0]; // Always 1 operation
}

// O(n) - Linear Time  
function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) { // n operations
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

// O(log n) - Logarithmic Time
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        
        if (arr[mid] < target) {
            left = mid + 1; // Eliminate left half
        } else {
            right = mid - 1; // Eliminate right half
        }
    }
    return -1;
}

// O(n²) - Quadratic Time
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {        // n iterations
        for (let j = 0; j < arr.length - 1; j++) { // n iterations each
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// O(2ⁿ) - Exponential Time (Inefficient)
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2); // 2 recursive calls each time
}`
      };
    }
    
    // Check for binary search questions
    if (message.includes('binary search') || (message.includes('search') && message.includes('algorithm'))) {
      console.log('Matched binary search question');
      return {
        content: "**Binary Search** is an efficient algorithm for finding elements in **sorted arrays**. It works by repeatedly dividing the search space in half.\n\n**Algorithm Steps:**\n1. Compare target with middle element\n2. If found, return index\n3. If target is smaller, search left half\n4. If target is larger, search right half\n5. Repeat until found or search space is empty\n\n**Requirements:**\n• Array must be sorted\n• Random access to elements (arrays, not linked lists)\n\n**Performance:**\n• **Time**: O(log n) - eliminates half the elements each step\n• **Space**: O(1) iterative, O(log n) recursive\n\n**When to use:** Searching in large sorted datasets, finding insertion points, peak finding problems.",
        codeExample: `// Iterative Binary Search - Preferred approach
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        // Avoid integer overflow: (left + right) / 2
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) {
            return mid; // Found at index mid
        }
        
        if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Element not found
}

// Recursive Binary Search
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1; // Base case: not found
    
    const mid = Math.floor(left + (right - left) / 2);
    
    if (arr[mid] === target) return mid;
    
    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// Find insertion point (where element should be inserted)
function searchInsert(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) return mid;
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left; // Insertion point
}

// Usage examples:
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log(binarySearch(sortedArray, 7));   // Output: 3
console.log(binarySearch(sortedArray, 4));   // Output: -1
console.log(searchInsert(sortedArray, 4));   // Output: 2`
      };
    }
    
    // Check for stack vs queue questions
    if ((message.includes('stack') && message.includes('queue')) || message.includes('difference between stack and queue')) {
      console.log('Matched stack vs queue question');
      return {
        content: "**Stack vs Queue** - Two fundamental data structures with opposite access patterns:\n\n**Stack (LIFO - Last In, First Out):**\n• Like a stack of plates - add/remove from top only\n• **Operations**: push(add), pop(remove), peek(view top)\n• **Use cases**: Function calls, undo operations, expression evaluation, backtracking, browser history\n• **Implementation**: Array or linked list\n\n**Queue (FIFO - First In, First Out):**\n• Like a line at a store - first person served first\n• **Operations**: enqueue(add to rear), dequeue(remove from front)\n• **Use cases**: BFS traversal, task scheduling, print queues, buffering, breadth-first processing\n• **Implementation**: Array (with front/rear pointers) or linked list\n\n**Performance**: Both operations are O(1) when implemented correctly.",
        codeExample: `// Stack Implementation
class Stack {
    constructor() {
        this.items = [];
    }
    
    // Add element to top
    push(element) {
        this.items.push(element);
        return this.size();
    }
    
    // Remove and return top element
    pop() {
        if (this.isEmpty()) return undefined;
        return this.items.pop();
    }
    
    // View top element without removing
    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
}

// Queue Implementation (Efficient version)
class Queue {
    constructor() {
        this.items = {};
        this.front = 0;
        this.rear = 0;
    }
    
    // Add element to rear
    enqueue(element) {
        this.items[this.rear] = element;
        this.rear++;
        return this.size();
    }
    
    // Remove and return front element
    dequeue() {
        if (this.isEmpty()) return undefined;
        
        const item = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return item;
    }
    
    // View front element
    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[this.front];
    }
    
    isEmpty() {
        return this.rear - this.front === 0;
    }
    
    size() {
        return this.rear - this.front;
    }
}

// Usage Examples:
const stack = new Stack();
stack.push(1); stack.push(2); stack.push(3);
console.log(stack.pop()); // 3 (last in, first out)
console.log(stack.peek()); // 2

const queue = new Queue();
queue.enqueue(1); queue.enqueue(2); queue.enqueue(3);
console.log(queue.dequeue()); // 1 (first in, first out)
console.log(queue.peek()); // 2

// Real-world example: Function call stack
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1); // Each call added to call stack
}`
      };
    }
    
    // Check for dynamic programming questions
    if (message.includes('dynamic programming') || message.includes(' dp ') || message.includes('memoization') || message.includes('tabulation')) {
      console.log('Matched dynamic programming question');
      return {
        content: "**Dynamic Programming (DP)** optimizes recursive problems by storing results of subproblems to avoid redundant calculations.\n\n**Key Characteristics:**\n1. **Optimal Substructure**: Optimal solution contains optimal solutions to subproblems\n2. **Overlapping Subproblems**: Same subproblems are solved multiple times\n\n**Two Main Approaches:**\n• **Memoization (Top-down)**: Recursion + caching results in hash table\n• **Tabulation (Bottom-up)**: Iterative approach, build solutions from base cases up\n\n**Problem Identification:**\n- Can you break it into similar subproblems?\n- Do subproblems overlap?\n- Are you making choices at each step?\n\n**Common DP Patterns:**\n• Fibonacci, climbing stairs (1D DP)\n• Grid paths, edit distance (2D DP)\n• Knapsack, coin change (decision DP)",
        codeExample: `// Problem: Fibonacci - Classic DP Example
// Naive Recursion: O(2^n) - VERY SLOW!
function fibNaive(n) {
    if (n <= 1) return n;
    return fibNaive(n - 1) + fibNaive(n - 2); // Recalculates same values
}

// Memoization (Top-down): O(n) time, O(n) space
function fibMemo(n, memo = {}) {
    if (n in memo) return memo[n]; // Return cached result
    if (n <= 1) return n;
    
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// Tabulation (Bottom-up): O(n) time, O(n) space
function fibTab(n) {
    if (n <= 1) return n;
    
    const dp = new Array(n + 1);
    dp[0] = 0; dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]; // Build from previous results
    }
    return dp[n];
}

// Space Optimized: O(n) time, O(1) space
function fibOptimal(n) {
    if (n <= 1) return n;
    
    let prev2 = 0, prev1 = 1;
    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}

// Coin Change Problem - Another Classic DP
function coinChange(coins, amount) {
    // dp[i] = minimum coins needed for amount i
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0; // Base case: 0 coins for amount 0
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) { // Can use this coin
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Usage:
console.log(fibMemo(40));  // Fast: 102334155
console.log(coinChange([1, 3, 4], 6)); // Output: 2 (3+3)`
      };
    }
    
    // Check for graph traversal questions
    if (message.includes('graph') || message.includes('bfs') || message.includes('dfs') || message.includes('traversal') || message.includes('breadth first') || message.includes('depth first')) {
      console.log('Matched graph traversal question');
      return {
        content: "**Graph Traversal** systematically visits all vertices in a graph using two main algorithms:\n\n**Depth-First Search (DFS):**\n• **Strategy**: Go as deep as possible before backtracking\n• **Implementation**: Stack (iterative) or recursion\n• **Memory**: O(V) for visited set + O(V) for recursion stack\n• **Use cases**: Cycle detection, topological sort, pathfinding in mazes, connected components\n\n**Breadth-First Search (BFS):**\n• **Strategy**: Explore neighbors level by level\n• **Implementation**: Queue\n• **Memory**: O(V) for visited set + O(V) for queue\n• **Use cases**: Shortest path (unweighted), level-order traversal, social network distance\n\n**Both have O(V + E) time complexity** where V = vertices, E = edges.",
        codeExample: `// Graph Implementation using Adjacency List
class Graph {
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
        this.adjacencyList[v2].push(v1); // Undirected graph
    }
    
    // DFS Recursive - Natural and clean
    dfsRecursive(start, visited = new Set(), result = []) {
        visited.add(start);
        result.push(start);
        
        for (const neighbor of this.adjacencyList[start]) {
            if (!visited.has(neighbor)) {
                this.dfsRecursive(neighbor, visited, result);
            }
        }
        return result;
    }
    
    // DFS Iterative - Uses explicit stack
    dfsIterative(start) {
        const stack = [start];
        const visited = new Set();
        const result = [];
        
        while (stack.length > 0) {
            const vertex = stack.pop();
            
            if (!visited.has(vertex)) {
                visited.add(vertex);
                result.push(vertex);
                
                // Add neighbors in reverse order for consistent traversal
                for (let i = this.adjacencyList[vertex].length - 1; i >= 0; i--) {
                    const neighbor = this.adjacencyList[vertex][i];
                    if (!visited.has(neighbor)) {
                        stack.push(neighbor);
                    }
                }
            }
        }
        return result;
    }
    
    // BFS - Level by level exploration
    bfs(start) {
        const queue = [start];
        const visited = new Set([start]);
        const result = [];
        
        while (queue.length > 0) {
            const vertex = queue.shift(); // Remove from front
            result.push(vertex);
            
            for (const neighbor of this.adjacencyList[vertex]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor); // Add to back
                }
            }
        }
        return result;
    }
    
    // Shortest Path using BFS (unweighted graph)
    shortestPath(start, end) {
        const queue = [[start]]; // Queue of paths
        const visited = new Set([start]);
        
        while (queue.length > 0) {
            const path = queue.shift();
            const vertex = path[path.length - 1];
            
            if (vertex === end) {
                return path; // Found shortest path
            }
            
            for (const neighbor of this.adjacencyList[vertex]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push([...path, neighbor]); // Extend path
                }
            }
        }
        return null; // No path exists
    }
    
    // Check if graph has cycle (using DFS)
    hasCycle() {
        const visited = new Set();
        const recursionStack = new Set();
        
        const hasCycleUtil = (vertex) => {
            visited.add(vertex);
            recursionStack.add(vertex);
            
            for (const neighbor of this.adjacencyList[vertex]) {
                if (!visited.has(neighbor)) {
                    if (hasCycleUtil(neighbor)) return true;
                } else if (recursionStack.has(neighbor)) {
                    return true; // Back edge found - cycle detected
                }
            }
            
            recursionStack.delete(vertex);
            return false;
        };
        
        for (const vertex in this.adjacencyList) {
            if (!visited.has(vertex)) {
                if (hasCycleUtil(vertex)) return true;
            }
        }
        return false;
    }
}

// Example Usage:
const graph = new Graph();
['A', 'B', 'C', 'D', 'E'].forEach(v => graph.addVertex(v));
graph.addEdge('A', 'B'); graph.addEdge('A', 'C');
graph.addEdge('B', 'D'); graph.addEdge('C', 'E');

console.log('DFS:', graph.dfsRecursive('A')); // ['A', 'B', 'D', 'C', 'E']
console.log('BFS:', graph.bfs('A'));          // ['A', 'B', 'C', 'D', 'E']
console.log('Path A→E:', graph.shortestPath('A', 'E')); // ['A', 'C', 'E']`
      };
    }
    
    // Check for interview preparation questions
    if (message.includes('interview') || message.includes('coding interview') || message.includes('technical interview') || message.includes('job interview')) {
      console.log('Matched interview question');
      return {
        content: "**Coding Interview Success Strategy** - A systematic approach to excel in technical interviews:\n\n**Preparation Phase (2-3 months):**\n• **Practice**: 150+ LeetCode problems (Easy→Medium→Hard)\n• **Patterns**: Learn common problem patterns (two pointers, sliding window, etc.)\n• **Fundamentals**: Review Big O, data structures, algorithms\n• **Mock interviews**: Practice with peers or platforms like Pramp\n• **System design**: Study basics for senior roles\n\n**During Interview (UMPIRE Method):**\n1. **Understand**: Ask clarifying questions, confirm inputs/outputs\n2. **Match**: Identify similar problems you've solved before\n3. **Plan**: Discuss approach before coding, consider edge cases\n4. **Implement**: Write clean, readable code with good naming\n5. **Review**: Test with examples, trace through logic\n6. **Evaluate**: Analyze time/space complexity, discuss optimizations\n\n**Communication Tips:**\n• Think out loud throughout the process\n• Start with brute force, then optimize\n• Handle edge cases explicitly\n• Ask if you're on the right track",
        codeExample: `// Interview Problem Example: Two Sum
// Given array and target, return indices of two numbers that sum to target

// Step 1: Understand the problem
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1] because nums[0] + nums[1] = 2 + 7 = 9
// Constraints: Exactly one solution exists, can't use same element twice

// Step 2: Brute Force Approach - Always start here!
function twoSumBrute(nums, target) {
    // Try every pair of numbers
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return []; // Should not reach here based on constraints
}
// Time: O(n²), Space: O(1)

// Step 3: Optimized Approach - Hash Map
function twoSum(nums, target) {
    const numToIndex = new Map(); // number -> index mapping
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        // Check if complement exists in our seen numbers
        if (numToIndex.has(complement)) {
            return [numToIndex.get(complement), i];
        }
        
        // Store current number and its index for future lookups
        numToIndex.set(nums[i], i);
    }
    
    return []; // Should not reach here based on constraints
}
// Time: O(n), Space: O(n) - Classic time-space tradeoff!

// Step 4: Explain the optimization to interviewer
// "We trade space for time - instead of checking every pair (O(n²)), 
// we use a hash map to check if complement exists in O(1) time.
// This reduces overall time complexity to O(n) with O(n) extra space."

// Step 5: Test with examples
console.log(twoSum([2,7,11,15], 9)); // [0,1]
console.log(twoSum([3,2,4], 6));     // [1,2]  
console.log(twoSum([3,3], 6));       // [0,1]

// Step 6: Discuss edge cases
// - What if no solution? (Problem guarantees one exists)
// - What if multiple solutions? (Return any one)
// - What about duplicate numbers? (Our solution handles it correctly)

// Additional Interview Tips:
// 1. Always communicate your thought process
// 2. Write clean, readable code with good variable names
// 3. Consider edge cases and ask about them
// 4. Test your solution with provided examples
// 5. Be ready to optimize or handle follow-up questions`
      };
    }

    // Check for sorting algorithm questions
    if (message.includes('sort') || message.includes('sorting') || message.includes('merge sort') || message.includes('quick sort')) {
      console.log('Matched sorting question');
      return {
        content: "**Sorting Algorithms** arrange elements in a specific order. Here are the most important ones:\n\n**Comparison-based Sorts:**\n• **Merge Sort**: O(n log n) always, stable, divide & conquer\n• **Quick Sort**: O(n log n) average, O(n²) worst, in-place\n• **Heap Sort**: O(n log n) always, in-place, not stable\n• **Bubble Sort**: O(n²), stable, simple but inefficient\n\n**Non-comparison Sorts:**\n• **Counting Sort**: O(n + k), for integers in small range\n• **Radix Sort**: O(d × n), for integers/strings\n\n**When to use which:**\n• **Merge Sort**: When stability is needed, guaranteed O(n log n)\n• **Quick Sort**: General purpose, average case very fast\n• **Heap Sort**: When memory is limited (in-place)",
        codeExample: `// Merge Sort - Divide and Conquer, Stable
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
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
}

// Quick Sort - Fast average case, in-place
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high]; // Choose last element as pivot
    let i = low - 1; // Index of smaller element
    
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Place pivot
    return i + 1;
}

// Heap Sort - In-place, guaranteed O(n log n)
function heapSort(arr) {
    buildMaxHeap(arr);
    
    for (let i = arr.length - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]]; // Move max to end
        heapify(arr, 0, i); // Restore heap property
    }
    
    return arr;
}

function buildMaxHeap(arr) {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, i, n);
    }
}

function heapify(arr, rootIndex, heapSize) {
    let largest = rootIndex;
    const left = 2 * rootIndex + 1;
    const right = 2 * rootIndex + 2;
    
    if (left < heapSize && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < heapSize && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== rootIndex) {
        [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
        heapify(arr, largest, heapSize);
    }
}

// Usage and comparison:
const arr1 = [64, 34, 25, 12, 22, 11, 90];
console.log('Merge Sort:', mergeSort([...arr1])); // [11,12,22,25,34,64,90]
console.log('Quick Sort:', quickSort([...arr1])); // [11,12,22,25,34,64,90]
console.log('Heap Sort:', heapSort([...arr1]));   // [11,12,22,25,34,64,90]`
      };
    }
    
    // Default comprehensive response
    console.log('Providing comprehensive DSA response');
    return {
      content: "I'm here to help you master **Data Structures and Algorithms**! I can provide detailed explanations, code examples, and problem-solving strategies.\n\n**What I can help you with:**\n\n**📊 Data Structures:**\n• Arrays, Strings, Linked Lists\n• Stacks, Queues, Deques\n• Trees (Binary, BST, AVL, Red-Black)\n• Graphs (Directed, Undirected, Weighted)\n• Hash Tables, Sets, Maps\n• Heaps, Priority Queues\n• Tries, Suffix Trees\n\n**⚡ Algorithms:**\n• Sorting (Quick, Merge, Heap, Radix)\n• Searching (Binary Search, DFS, BFS)\n• Dynamic Programming & Memoization\n• Greedy Algorithms\n• Divide & Conquer\n• Graph Algorithms (Dijkstra, Floyd-Warshall)\n• String Algorithms (KMP, Rabin-Karp)\n\n**🎯 Problem Solving:**\n• Algorithm complexity analysis (Big O)\n• Coding interview preparation\n• Step-by-step problem breakdown\n• Code optimization techniques\n• Debugging and testing strategies\n\n**💡 Try asking me about:**\n• \"Explain Big O notation with examples\"\n• \"How does binary search work?\"\n• \"Difference between stack and queue\"\n• \"Help me with dynamic programming\"\n• \"Graph traversal algorithms\"\n• \"Coding interview tips\"\n\nWhat specific topic would you like to explore? I'll provide clear explanations with practical code examples!",
      codeExample: `// Example: Two fundamental algorithms every programmer should know

// 1. Binary Search - O(log n) searching in sorted array
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1; // Not found
}

// 2. Depth-First Search - Graph/Tree traversal
function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    console.log(start); // Process current node
    
    for (const neighbor of graph[start] || []) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
    return visited;
}

// Usage examples:
const sortedArr = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(sortedArr, 7)); // Output: 3

const graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'], 
    'C': ['F'],
    'D': [], 'E': [], 'F': []
};
dfs(graph, 'A'); // Visits: A, B, D, E, C, F

// These form the foundation for more complex algorithms!`
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    console.log('User sending message:', inputMessage);

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate realistic AI thinking time
    setTimeout(() => {
      console.log('Generating AI response for:', inputMessage);
      const aiResponse = getAIResponse(inputMessage);
      console.log('AI response generated successfully');
      
      const aiMessage: Message = {
        id: messages.length + 2,
        content: aiResponse.content,
        isUser: false,
        timestamp: new Date(),
        codeExample: aiResponse.codeExample,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      console.log('AI message added to chat');
    }, 1200); // Slightly shorter delay for better UX
  };

  const handleQuickQuestion = (question: string) => {
    console.log('Quick question selected:', question);
    setInputMessage(question);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <Brain className="inline h-10 w-10 text-purple-400 mr-3" />
            AI Code <span className="text-purple-400">Mentor</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Your personal AI tutor for mastering data structures and algorithms
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                <Lightbulb className="inline h-5 w-5 mr-2 text-yellow-400" />
                Quick Questions
              </h3>
              
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm text-gray-300 hover:text-white"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                <Target className="inline h-5 w-5 mr-2 text-green-400" />
                Topics I Can Help With
              </h3>
              
              <div className="space-y-2 text-sm text-gray-300">
                <div>• Algorithm Analysis & Big O</div>
                <div>• Data Structure Implementation</div>
                <div>• Problem Solving Strategies</div>
                <div>• Code Optimization</div>
                <div>• Interview Preparation</div>
                <div>• Dynamic Programming</div>
                <div>• Graph Algorithms</div>
                <div>• System Design Basics</div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-3xl rounded-lg p-4 ${
                        message.isUser
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-100'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {!message.isUser && (
                          <BotIcon className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
                        )}
                        {message.isUser && (
                          <User className="h-5 w-5 text-white mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="whitespace-pre-line">{message.content}</div>
                          {message.codeExample && (
                            <div className="mt-3">
                              <div className="flex items-center space-x-2 mb-2">
                                <Code className="h-4 w-4 text-green-400" />
                                <span className="text-sm text-green-400 font-medium">Code Example:</span>
                              </div>
                              <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                                <code className="text-gray-300">{message.codeExample}</code>
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-gray-100 rounded-lg p-4 max-w-xs">
                      <div className="flex items-center space-x-2">
                        <BotIcon className="h-5 w-5 text-purple-400" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-white/10 p-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about DSA, algorithms, or coding interviews..."
                    className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMentor;
