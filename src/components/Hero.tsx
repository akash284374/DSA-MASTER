
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, TrendingUp, Code, Database, Grid, Hash, Layers, TreePine, Sparkles, Cpu, Binary, List, Network, GitBranch, Shuffle } from 'lucide-react';

const Hero = () => {
  const features = [
    {
      icon: Zap,
      title: 'Interactive Visualizations',
      description: 'Watch algorithms come to life with real-time animations'
    },
    {
      icon: Target,
      title: 'Advanced Data Structures',
      description: 'Explore complex data structures with hands-on examples'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analysis',
      description: 'Analyze time and space complexity with detailed metrics'
    }
  ];

  const dataStructures = [
    { icon: Grid, name: 'Arrays', color: 'text-blue-400' },
    { icon: List, name: 'Linked Lists', color: 'text-green-400' },
    { icon: Layers, name: 'Stacks', color: 'text-purple-400' },
    { icon: Database, name: 'Queues', color: 'text-yellow-400' },
    { icon: Hash, name: 'Hash Tables', color: 'text-red-400' },
    { icon: Database, name: 'Heaps', color: 'text-pink-400' },
    { icon: TreePine, name: 'Trees', color: 'text-cyan-400' },
    { icon: TreePine, name: 'Tries', color: 'text-orange-400' },
    { icon: Network, name: 'Graphs', color: 'text-indigo-400' },
    { icon: GitBranch, name: 'B-Trees', color: 'text-emerald-400' },
    { icon: Shuffle, name: 'AVL Trees', color: 'text-violet-400' },
    { icon: Database, name: 'Red-Black Trees', color: 'text-rose-400' },
  ];

  // Duplicate the array for seamless infinite scroll
  const infiniteDataStructures = [...dataStructures, ...dataStructures];

  return (
    <>
      <style>
        {`
          @keyframes scroll-right-to-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            animation: scroll-right-to-left 20s linear infinite;
          }
        `}
      </style>
      
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Master Advanced
              </span>
              <br />
              <span className="text-white">Data Structures</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                & Algorithms
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Dive deep into the world of advanced DSA with interactive visualizations, 
              real-time complexity analysis, and immersive learning experiences designed to elevate your skills.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105 animate-fade-in">
                <Icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400">{description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/visualizer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 animate-scale-in"
            >
              Start Visualizing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Enhanced Data Structures Animation Section with Continuous Right-to-Left Sliding */}
          <div className="mb-16 overflow-hidden">
            <h2 className="text-3xl font-bold text-white mb-8 animate-fade-in">
              Explore <span className="text-purple-400">Data Structures</span>
            </h2>
            
            {/* Continuous scrolling container */}
            <div className="relative">
              <div className="flex animate-scroll">
                {infiniteDataStructures.map(({ icon: Icon, name, color }, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 mx-4 bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:transform hover:scale-110 group min-w-[200px]"
                  >
                    <Icon className={`h-10 w-10 ${color} mx-auto mb-3 group-hover:animate-pulse transition-all duration-300`} />
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">{name}</p>
                    <div className="mt-3 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Interactive Visualizations */}
          <div className="mb-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 relative overflow-hidden">
            {/* 3D Background Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg animate-pulse transform rotate-12"></div>
              <div className="absolute top-12 right-8 w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full animate-bounce"></div>
              <div className="absolute bottom-8 left-12 w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg animate-spin"></div>
              <div className="absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl animate-pulse transform -rotate-12"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-purple-400 mr-3 animate-pulse" />
                <h3 className="text-2xl font-bold text-white">Interactive Algorithm Playground</h3>
                <Sparkles className="h-8 w-8 text-pink-400 ml-3 animate-pulse" />
              </div>
              
              {/* Animated Algorithm Visualization */}
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-6">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="relative">
                    <div
                      className="bg-gradient-to-t from-purple-600 via-pink-500 to-blue-500 rounded-lg transition-all duration-1000 hover:scale-110 cursor-pointer shadow-lg"
                      style={{ 
                        height: `${Math.sin(Date.now() * 0.001 + i) * 30 + 60}px`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                      {Math.floor(Math.sin(Date.now() * 0.001 + i) * 50 + 75)}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 3D Character Elements */}
              <div className="flex justify-center items-center space-x-8 mb-6">
                <div className="relative">
                  <Cpu className="h-16 w-16 text-blue-400 animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <div className="text-4xl animate-bounce">⚡</div>
                <div className="relative">
                  <Binary className="h-16 w-16 text-green-400 animate-spin" style={{ animationDuration: '3s' }} />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
                <div className="text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🚀</div>
                <div className="relative">
                  <Database className="h-16 w-16 text-purple-400 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-ping"></div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">Experience algorithms through immersive 3D visualizations</p>
              
              {/* Floating Code Elements */}
              <div className="flex justify-center space-x-4 text-sm font-mono">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full text-white animate-pulse">
                  O(n log n)
                </span>
                <span className="bg-gradient-to-r from-green-600 to-teal-600 px-3 py-1 rounded-full text-white animate-pulse" style={{ animationDelay: '0.3s' }}>
                  Quick Sort
                </span>
                <span className="bg-gradient-to-r from-pink-600 to-red-600 px-3 py-1 rounded-full text-white animate-pulse" style={{ animationDelay: '0.6s' }}>
                  Binary Tree
                </span>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-2 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-purple-400">50+</div>
              <div className="text-gray-400">Algorithms</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl font-bold text-pink-400">25+</div>
              <div className="text-gray-400">Data Structures</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code className="h-6 w-6 text-purple-400" />
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              DSA Master
            </span>
          </div>
          <p className="text-gray-400">
            © 2025 DSA Master. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Hero;
