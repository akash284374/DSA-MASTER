import React, { useState, useEffect, useCallback } from 'react';
import { Shuffle } from 'lucide-react';

const SortingVisualizer = ({ isPlaying, speed }) => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [algorithm, setAlgorithm] = useState('quickSort');
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });
  const [isRunning, setIsRunning] = useState(false);

  const algorithms = [
    { id: 'quickSort', name: 'Quick Sort', complexity: 'O(n log n)' },
    { id: 'mergeSort', name: 'Merge Sort', complexity: 'O(n log n)' },
    { id: 'bubbleSort', name: 'Bubble Sort', complexity: 'O(n²)' },
    { id: 'selectionSort', name: 'Selection Sort', complexity: 'O(n²)' },
    { id: 'insertionSort', name: 'Insertion Sort', complexity: 'O(n²)' },
    { id: 'heapSort', name: 'Heap Sort', complexity: 'O(n log n)' },
    { id: 'radixSort', name: 'Radix Sort', complexity: 'O(d × n)' },
    { id: 'bucketSort', name: 'Bucket Sort', complexity: 'O(n + k)' },
  ];

  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 300) + 10);
    setArray(newArray);
    setComparing([]);
    setSorted([]);
    setSwapping([]);
    setStats({ comparisons: 0, swaps: 0 });
  }, [arraySize]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const incrementComparisons = () => {
    setStats(prev => ({ ...prev, comparisons: prev.comparisons + 1 }));
  };

  const incrementSwaps = () => {
    setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
  };

  const quickSort = async (arr, low = 0, high = arr.length - 1) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      setComparing([j, high]);
      incrementComparisons();
      await sleep(speed);

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          incrementSwaps();
          setSwapping([i, j]);
          setArray([...arr]);
          await sleep(speed);
        }
      }
    }
    
    if (i + 1 !== high) {
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      incrementSwaps();
      setSwapping([i + 1, high]);
      setArray([...arr]);
      await sleep(speed);
    }
    
    setComparing([]);
    setSwapping([]);
    return i + 1;
  };

  const bubbleSort = async (arr) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        incrementComparisons();
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          incrementSwaps();
          setSwapping([j, j + 1]);
          setArray([...arr]);
          await sleep(speed);
        }
      }
      setSorted(prev => [...prev, n - 1 - i]);
    }
    setSorted(Array.from({ length: n }, (_, i) => i));
  };

  const selectionSort = async (arr) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        setComparing([minIdx, j]);
        incrementComparisons();
        await sleep(speed);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        incrementSwaps();
        setSwapping([i, minIdx]);
        setArray([...arr]);
        await sleep(speed);
      }
      setSorted(prev => [...prev, i]);
    }
    setSorted(Array.from({ length: n }, (_, i) => i));
  };

  const mergeSort = async (arr, start = 0, end = arr.length - 1) => {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid + 1, end);
    await merge(arr, start, mid, end);
  };

  const merge = async (arr, start, mid, end) => {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      setComparing([start + i, mid + 1 + j]);
      incrementComparisons();
      await sleep(speed);

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      incrementSwaps();
      setArray([...arr]);
      k++;
    }

    while (i < left.length) {
      arr[k] = left[i];
      incrementSwaps();
      setArray([...arr]);
      i++;
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      incrementSwaps();
      setArray([...arr]);
      j++;
      k++;
    }
  };

  const insertionSort = async (arr) => {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      
      setComparing([i]);
      await sleep(speed);
      
      while (j >= 0 && arr[j] > key) {
        setComparing([j, j + 1]);
        incrementComparisons();
        await sleep(speed);
        
        arr[j + 1] = arr[j];
        incrementSwaps();
        setSwapping([j, j + 1]);
        setArray([...arr]);
        await sleep(speed);
        j--;
      }
      arr[j + 1] = key;
      setArray([...arr]);
      setSorted(prev => [...prev, i]);
    }
    setSorted(Array.from({ length: n }, (_, i) => i));
  };

  const heapSort = async (arr) => {
    const n = arr.length;

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      [arr[0], arr[i]] = [arr[i], arr[0]];
      incrementSwaps();
      setSwapping([0, i]);
      setArray([...arr]);
      await sleep(speed);

      // Call heapify on the reduced heap
      await heapify(arr, i, 0);
      setSorted(prev => [...prev, i]);
    }
    setSorted(Array.from({ length: n }, (_, i) => i));
  };

  const heapify = async (arr, n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    setComparing([i, left, right].filter(idx => idx < n));
    await sleep(speed);

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
      incrementComparisons();
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
      incrementComparisons();
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      incrementSwaps();
      setSwapping([i, largest]);
      setArray([...arr]);
      await sleep(speed);

      await heapify(arr, n, largest);
    }
  };

  const radixSort = async (arr) => {
    const getMax = (arr) => Math.max(...arr);
    const countingSort = async (arr, exp) => {
      const n = arr.length;
      const output = new Array(n);
      const count = new Array(10).fill(0);

      // Count occurrences
      for (let i = 0; i < n; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
        setComparing([i]);
        incrementComparisons();
        await sleep(speed / 2);
      }

      // Change count[i] to actual position
      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
      }

      // Build output array
      for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
        setSwapping([i, count[digit]]);
        incrementSwaps();
        await sleep(speed / 2);
      }

      // Copy output array to arr
      for (let i = 0; i < n; i++) {
        arr[i] = output[i];
        setArray([...arr]);
        await sleep(speed / 2);
      }
    };

    const max = getMax(arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await countingSort(arr, exp);
    }
    setSorted(Array.from({ length: arr.length }, (_, i) => i));
  };

  const bucketSort = async (arr) => {
    const n = arr.length;
    if (n <= 0) return;

    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const bucketCount = Math.floor(Math.sqrt(n));
    const bucketSize = Math.ceil((max - min + 1) / bucketCount);
    
    // Create buckets
    const buckets = Array.from({ length: bucketCount }, () => []);

    // Distribute elements into buckets
    for (let i = 0; i < n; i++) {
      const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
      const targetBucket = Math.min(bucketIndex, bucketCount - 1);
      buckets[targetBucket].push(arr[i]);
      
      setComparing([i]);
      incrementComparisons();
      await sleep(speed);
    }

    // Sort individual buckets and concatenate
    let index = 0;
    for (let i = 0; i < bucketCount; i++) {
      if (buckets[i].length > 0) {
        // Simple insertion sort for each bucket
        buckets[i].sort((a, b) => a - b);
        
        for (let j = 0; j < buckets[i].length; j++) {
          arr[index] = buckets[i][j];
          setSwapping([index]);
          incrementSwaps();
          setArray([...arr]);
          await sleep(speed);
          index++;
        }
      }
    }
    setSorted(Array.from({ length: n }, (_, i) => i));
  };

  const startSorting = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setStats({ comparisons: 0, swaps: 0 });
    const arrCopy = [...array];
    
    try {
      switch (algorithm) {
        case 'quickSort':
          await quickSort(arrCopy);
          break;
        case 'bubbleSort':
          await bubbleSort(arrCopy);
          break;
        case 'selectionSort':
          await selectionSort(arrCopy);
          break;
        case 'insertionSort':
          await insertionSort(arrCopy);
          break;
        case 'mergeSort':
          await mergeSort(arrCopy);
          break;
        case 'heapSort':
          await heapSort(arrCopy);
          break;
        case 'radixSort':
          await radixSort(arrCopy);
          break;
        case 'bucketSort':
          await bucketSort(arrCopy);
          break;
      }
      
      setSorted(Array.from({ length: array.length }, (_, i) => i));
      setComparing([]);
      setSwapping([]);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (isPlaying && !isRunning) {
      startSorting();
    }
  }, [isPlaying]);

  const getBarColor = (index) => {
    if (sorted.includes(index)) return 'bg-green-500';
    if (swapping.includes(index)) return 'bg-red-500';
    if (comparing.includes(index)) return 'bg-yellow-500';
    return 'bg-purple-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isRunning}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
          >
            {algorithms.map(alg => (
              <option key={alg.id} value={alg.id}>
                {alg.name} - {alg.complexity}
              </option>
            ))}
          </select>
          
          <div className="flex items-center space-x-2">
            <label className="text-white text-sm">Elements:</label>
            <input
              type="range"
              min="10"
              max="100"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isRunning}
              className="w-24"
            />
            <span className="text-white text-sm w-8">{arraySize}</span>
          </div>
          
          <button
            onClick={generateArray}
            disabled={isRunning}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <Shuffle className="h-4 w-4" />
            <span>Shuffle</span>
          </button>
        </div>

        <div className="text-sm text-gray-300">
          <span className="inline-block w-3 h-3 bg-purple-500 mr-2"></span>Unsorted
          <span className="inline-block w-3 h-3 bg-yellow-500 mr-2 ml-4"></span>Comparing
          <span className="inline-block w-3 h-3 bg-red-500 mr-2 ml-4"></span>Swapping
          <span className="inline-block w-3 h-3 bg-green-500 mr-2 ml-4"></span>Sorted
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-xl p-6 h-96 flex items-end justify-center space-x-1">
        {array.map((value, index) => (
          <div
            key={index}
            className={`transition-all duration-200 ${getBarColor(index)} rounded-t`}
            style={{
              height: `${(value / 300) * 100}%`,
              width: `calc(100% / ${array.length} - 2px)`,
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">{array.length}</div>
          <div className="text-gray-400">Elements</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">{stats.comparisons}</div>
          <div className="text-gray-400">Comparisons</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-400">{stats.swaps}</div>
          <div className="text-gray-400">Swaps</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">{sorted.length}</div>
          <div className="text-gray-400">Sorted</div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
