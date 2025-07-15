
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';
import DataStructures from '../components/DataStructures';
import ComplexityAnalyzer from '../components/ComplexityAnalyzer';
import AIMentor from '../components/AIMentor';
import ThreeDVisualizer from '../components/ThreeDVisualizer';

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/visualizer" element={<AlgorithmVisualizer />} />
          <Route path="/data-structures" element={<DataStructures />} />
          <Route path="/complexity" element={<ComplexityAnalyzer />} />
          <Route path="/ai-mentor" element={<AIMentor />} />
          <Route path="/3d-visualizer" element={<ThreeDVisualizer />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default Index;
