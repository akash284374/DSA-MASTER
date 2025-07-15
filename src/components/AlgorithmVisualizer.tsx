
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import SortingVisualizer from './visualizers/SortingVisualizer';
import GraphVisualizer from './visualizers/GraphVisualizer';
import TreeVisualizer from './visualizers/TreeVisualizer';

const AlgorithmVisualizer = () => {
  const [activeTab, setActiveTab] = useState('sorting');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(100);

  const tabs = [
    { id: 'sorting', label: 'Sorting Algorithms', component: SortingVisualizer },
    { id: 'graph', label: 'Graph Algorithms', component: GraphVisualizer },
    { id: 'tree', label: 'Tree Algorithms', component: TreeVisualizer },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || SortingVisualizer;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Algorithm <span className="text-purple-400">Visualizer</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Watch algorithms execute step by step with interactive visualizations
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-white/10">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-purple-400 border-b-2 border-purple-400 bg-purple-400/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-gray-300 flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Speed:</span>
              </label>
              <input
                type="range"
                min="10"
                max="1000"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-32"
              />
              <span className="text-gray-300 w-12">{speed}ms</span>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="p-6">
            <ActiveComponent isPlaying={isPlaying} speed={speed} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
