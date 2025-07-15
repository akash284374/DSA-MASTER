
import React, { useState, useEffect } from 'react';
import { TrendingUp, Trophy, Target, Calendar, Award, Star } from 'lucide-react';

const ProgressTracker = () => {
  const [userProgress, setUserProgress] = useState({
    totalProblems: 156,
    solvedProblems: 47,
    currentStreak: 5,
    longestStreak: 12,
    totalXP: 2350,
    level: 8,
    achievements: [
      { id: 1, name: 'First Steps', description: 'Solved your first problem', unlocked: true, icon: '🎯' },
      { id: 2, name: 'Array Master', description: 'Solved 10 array problems', unlocked: true, icon: '📊' },
      { id: 3, name: 'Speed Demon', description: 'Solved 5 problems in one day', unlocked: true, icon: '⚡' },
      { id: 4, name: 'Persistent', description: 'Maintained a 7-day streak', unlocked: false, icon: '🔥' },
      { id: 5, name: 'Algorithm Expert', description: 'Solved 50 problems', unlocked: false, icon: '🧠' },
    ],
    weeklyActivity: [
      { day: 'Mon', problems: 3, date: '2024-01-01' },
      { day: 'Tue', problems: 2, date: '2024-01-02' },
      { day: 'Wed', problems: 0, date: '2024-01-03' },
      { day: 'Thu', problems: 4, date: '2024-01-04' },
      { day: 'Fri', problems: 1, date: '2024-01-05' },
      { day: 'Sat', problems: 3, date: '2024-01-06' },
      { day: 'Sun', problems: 2, date: '2024-01-07' },
    ],
    skillProgress: [
      { skill: 'Arrays & Strings', progress: 75, total: 20, solved: 15 },
      { skill: 'Linked Lists', progress: 60, total: 15, solved: 9 },
      { skill: 'Trees & Graphs', progress: 40, total: 25, solved: 10 },
      { skill: 'Dynamic Programming', progress: 30, total: 20, solved: 6 },
      { skill: 'Sorting & Searching', progress: 85, total: 15, solved: 13 },
      { skill: 'Hash Tables', progress: 90, total: 10, solved: 9 },
    ]
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const levelProgress = ((userProgress.totalXP % 500) / 500) * 100;
  const nextLevelXP = (userProgress.level + 1) * 500;
  const currentLevelXP = userProgress.level * 500;
  const remainingXP = nextLevelXP - userProgress.totalXP;

  const difficultyStats = [
    { level: 'Easy', solved: 23, total: 60, color: 'text-green-400', bgColor: 'bg-green-400/20' },
    { level: 'Medium', solved: 18, total: 70, color: 'text-yellow-400', bgColor: 'bg-yellow-400/20' },
    { level: 'Hard', solved: 6, total: 26, color: 'text-red-400', bgColor: 'bg-red-400/20' },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <TrendingUp className="inline h-8 w-8 text-blue-400 mr-2" />
            Progress <span className="text-blue-400">Tracker</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Track your learning journey and celebrate your achievements
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Problems Solved</h3>
                <p className="text-3xl font-bold text-white mt-1">
                  {userProgress.solvedProblems}
                  <span className="text-lg text-gray-400">/{userProgress.totalProblems}</span>
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(userProgress.solvedProblems / userProgress.totalProblems) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Current Streak</h3>
                <p className="text-3xl font-bold text-orange-400 mt-1">{userProgress.currentStreak}</p>
                <p className="text-sm text-gray-400">days</p>
              </div>
              <div className="text-2xl">🔥</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Level</h3>
                <p className="text-3xl font-bold text-purple-400 mt-1">{userProgress.level}</p>
                <p className="text-sm text-gray-400">{remainingXP} XP to next level</p>
              </div>
              <Star className="h-8 w-8 text-purple-400" />
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Total XP</h3>
                <p className="text-3xl font-bold text-green-400 mt-1">{userProgress.totalXP.toLocaleString()}</p>
              </div>
              <Trophy className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Activity Chart */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Weekly Activity</h3>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex items-end space-x-4 h-48">
              {userProgress.weeklyActivity.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-600 rounded-t-lg transition-all duration-300 hover:bg-blue-500"
                    style={{ 
                      height: `${Math.max((day.problems / 5) * 100, 10)}%`,
                      minHeight: day.problems > 0 ? '20px' : '4px'
                    }}
                  />
                  <div className="mt-2 text-center">
                    <p className="text-white font-medium">{day.problems}</p>
                    <p className="text-gray-400 text-xs">{day.day}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Achievements</h3>
              <Award className="h-5 w-5 text-yellow-400" />
            </div>
            
            <div className="space-y-4">
              {userProgress.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-yellow-400/10 border-yellow-400/30'
                      : 'bg-gray-700/30 border-gray-600/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h4 className={`font-medium ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                        {achievement.name}
                      </h4>
                      <p className="text-sm text-gray-400">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <div className="text-yellow-400">✓</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Progress */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Skill Progress</h3>
            
            <div className="space-y-4">
              {userProgress.skillProgress.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{skill.skill}</span>
                    <span className="text-gray-400 text-sm">{skill.solved}/{skill.total}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty Breakdown */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Difficulty Breakdown</h3>
            
            <div className="space-y-4">
              {difficultyStats.map((stat, index) => (
                <div key={index} className={`p-4 rounded-lg ${stat.bgColor}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-medium ${stat.color}`}>{stat.level}</span>
                    <span className="text-white">{stat.solved}/{stat.total}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${stat.color.replace('text-', 'bg-')}`}
                      style={{ width: `${(stat.solved / stat.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
