
import React, { useState } from 'react';
import { Database, List, Hash, Layers, Grid, TreePine, Zap, Target, TrendingUp, Network } from 'lucide-react';
import StackQueue from './data-structures/StackQueue';
import HashTable from './data-structures/HashTable';
import LinkedList from './data-structures/LinkedList';
import Heap from './data-structures/Heap';
import Array from './data-structures/Array';
import Trie from './data-structures/Trie';
import Recursion from './data-structures/Recursion';
import Greedy from './data-structures/Greedy';
import DynamicProgramming from './data-structures/DynamicProgramming';
import AdvancedGraphs from './data-structures/AdvancedGraphs';

const DataStructures = () => {
  const [activeTab, setActiveTab] = useState('array');

  const tabs = [
    { id: 'array', label: 'Array', icon: Grid, component: Array },
    { id: 'list', label: 'Linked List', icon: List, component: LinkedList },
    { id: 'stack', label: 'Stack & Queue', icon: Layers, component: StackQueue },
    { id: 'hash', label: 'Hash Table', icon: Hash, component: HashTable },
    { id: 'heap', label: 'Heap', icon: Database, component: Heap },
    { id: 'trie', label: 'Trie', icon: TreePine, component: Trie },
    { id: 'graphs', label: 'Advanced Graphs', icon: Network, component: AdvancedGraphs },
    { id: 'recursion', label: 'Recursion', icon: Zap, component: Recursion },
    { id: 'greedy', label: 'Greedy', icon: Target, component: Greedy },
    { id: 'dp', label: 'Dynamic Programming', icon: TrendingUp, component: DynamicProgramming },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Array;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Data Structures <span className="text-purple-400">& Algorithms</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Interactive implementations of fundamental data structures and algorithmic paradigms
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex flex-wrap border-b border-white/10">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-purple-400 border-b-2 border-purple-400 bg-purple-400/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataStructures;
