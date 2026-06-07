import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Cpu, 
  GitBranch, 
  Server, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Target, 
  Activity, 
  Compass,
  Users,
  Award,
  BookOpen
} from 'lucide-react';
import { EnhancedNavbar } from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ui/ParticleBackground';
import CodeTypewriter from '../components/home/CodeTypewriter';
import { Button } from '../components/ui/button';

const ROTATING_WORDS = ["Algorithms", "Data Structures", "System Design", "Dynamic Programming"];

const Home = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [fade, setFade] = useState(true);

  // Rotate headline words
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % ROTATING_WORDS.length);
        setFade(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Mock data for competitive tracks
  const arenas = [
    {
      id: 'digit-dp',
      title: 'Digit DP Mastery',
      difficulty: 'Hard',
      category: 'Dynamic Programming',
      points: 250,
      description: 'Learn to solve digit constraint optimization problems. Master state definition, memoization schemes, and boundary conditions.',
      icon: Cpu,
      color: 'rose'
    },
    {
      id: 'graph-routing',
      title: "Advanced Graph Routing & Kahn's",
      difficulty: 'Hard',
      category: 'Graphs & Trees',
      points: 300,
      description: "Implement pathfinding algorithms and topological sorting using Kahn's. Perfect for dependency parsing and scheduling systems.",
      icon: GitBranch,
      color: 'indigo'
    },
    {
      id: 'backend-architecture',
      title: 'Backend Architecture & Systems',
      difficulty: 'Medium',
      category: 'System Design',
      points: 150,
      description: 'Design low-latency APIs and distributed databases. Optimize load balancers, caching layers, and database sharding configurations.',
      icon: Server,
      color: 'amber'
    }
  ];

  // Mock data for Live Leaderboard snippet
  const leaderboard = [
    { rank: 1, name: 'AlexCodeMaster', points: 3450, successRate: 98.2, activeStreak: 45, status: 'In Arena' },
    { rank: 2, name: 'TechNinja_99', points: 3220, successRate: 94.5, activeStreak: 28, status: 'Idle' },
    { rank: 3, name: 'BinaryBeast', points: 3105, successRate: 95.1, activeStreak: 19, status: 'In Arena' },
    { rank: 4, name: 'SystemArchitect', points: 2980, successRate: 91.8, activeStreak: 12, status: 'Idle' },
    { rank: 5, name: 'shino_dev', points: 2850, successRate: 96.0, activeStreak: 34, status: 'In Arena' }
  ];

  // Mock statistics data
  const stats = [
    { label: "Submissions",  value: "1.2M+",  icon: Target,  color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10"  },
    { label: "Active Users", value: "50K+",   icon: Users,  color: "text-purple-600 dark:text-purple-400 bg-purple-500/10"  },
    { label: "Problems",     value: "2,400+", icon: Zap,    color: "text-pink-600 dark:text-pink-400 bg-pink-500/10"    },
  ];

  // Helper for difficulty badge styles
  const getDifficultyStyles = (difficulty) => {
    if (difficulty === 'Hard') {
      return 'text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/40 dark:border-rose-900/30';
    }
    return 'text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/40 dark:border-amber-900/30';
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-800 dark:text-slate-200 font-sans">
      
      {/* 1. Transparent ParticleBackground stub (lets global overlay render behind it) */}
      <ParticleBackground />

      {/* Ambient Moving Background Wrapper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 dark:from-indigo-950/40 dark:via-[#0b1120] dark:to-purple-950/30 animate-gradient" />
        <div className="absolute -top-20 -right-20 w-[700px] h-[700px] bg-gradient-to-bl from-indigo-200/40 dark:from-indigo-600/20 to-transparent rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-32 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-purple-200/40 dark:from-purple-600/20 to-transparent rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-pink-200/20 dark:from-pink-600/10 to-transparent rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* 2. Glass Navbar (Sticky Header) */}
      <EnhancedNavbar />

      {/* Main Content Viewport */}
      <main className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-20 md:gap-28">
        
        {/* 3. Hero Section (Split Layout on Desktop) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-6">
          
          {/* Hero Left: Headlines & Actions */}
          <div className="flex flex-col items-start text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-indigo-200/60 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/30 backdrop-blur-md text-indigo-600 dark:text-indigo-400 shadow-sm shadow-indigo-100/10">
              <Sparkles size={13} className="animate-pulse" />
              <span>THE ULTIMATE CODING ARENA</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                Master{' '}
                <span 
                  className="block text-indigo-600 dark:text-indigo-400 transition-opacity duration-300"
                  style={{ opacity: fade ? 1 : 0 }}
                >
                  {ROTATING_WORDS[wordIdx]}.
                </span>
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-400 dark:text-slate-500 leading-tight">
                Ace the Technical Interview.
              </h2>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
              Step into the ultimate zone for competitive programmers. Master advanced algorithms, 
              optimize complex systems, and rank up against the best minds in real-time arenas.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 bg-white/40 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 text-xs px-3.5 py-1.5 rounded-full shadow-sm backdrop-blur-md">
                <Target size={12} className="text-indigo-500 dark:text-indigo-400" />
                2,400+ Problems
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/40 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 text-xs px-3.5 py-1.5 rounded-full shadow-sm backdrop-blur-md">
                <Users size={12} className="text-purple-500 dark:text-purple-400" />
                50K+ Developers
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/40 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 text-xs px-3.5 py-1.5 rounded-full shadow-sm backdrop-blur-md">
                <Trophy size={12} className="text-pink-500 dark:text-pink-400" />
                Weekly Contests
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4">
              <Link
                to="/problem"
                className="group relative flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_4px_30px_rgba(99,102,241,0.6)] hover:scale-[1.02] active:scale-98 overflow-hidden"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-12 -translate-x-full group-hover:animate-shine pointer-events-none" />
                <span>Enter the Arena</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/algovisualizer"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold border border-slate-200/60 dark:border-slate-700/60 bg-white/40 dark:bg-slate-900/40 backdrop-blur-lg hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 transition-all duration-300"
              >
                <Compass size={16} />
                <span>Explore Visualizer</span>
              </Link>
            </div>

            {/* Social Trust */}
            <div className="flex items-center gap-4 pt-6 w-full border-t border-slate-200/30 dark:border-slate-800/50">
              <div className="flex -space-x-2.5">
                {[1, 29, 3, 4, 5].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc?img=${i}`}
                    alt="User profile"
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                  <span className="ml-1 text-xs font-bold">4.9/5</span>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Trusted by <span className="font-semibold text-slate-600 dark:text-slate-300">1M+ developers</span> worldwide</p>
              </div>
            </div>
          </div>

          {/* Hero Right: Interactive Code Typewriter */}
          <div className="relative z-10 w-full lg:max-w-xl mx-auto">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur-xl pointer-events-none" />
            <CodeTypewriter />
          </div>
        </section>

        {/* Platform Stats Grid */}
        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx} 
                  className="flex items-center gap-5 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-lg shadow-md hover:-translate-y-1 hover:border-indigo-500/25 dark:hover:border-indigo-500/20 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 shadow-sm ${stat.color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">{stat.value}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mt-0.5">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Daily Challenge Highlight */}
        <section className="w-full">
          <div className="relative rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 overflow-hidden shadow-xl hover:border-indigo-500/30 transition-all duration-300">
            {/* Ambient inner card glows */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 text-white">
              <Award size={24} />
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  DAILY CHALLENGE
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200/30 dark:border-indigo-500/30 rounded-full animate-pulse">
                  ACTIVE
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Reverse Linked List II</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl leading-relaxed">
                Given the head of a singly linked list and two integers left and right, reverse the nodes from position left to position right.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 justify-center md:justify-start">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-amber-600 bg-amber-50 dark:bg-amber-900/25 border border-amber-200/50 dark:border-amber-900/30">Medium</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-transparent">Linked List</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-transparent">Recursion</span>
              </div>
            </div>

            <Link to="/problem/1" className="shrink-0 w-full md:w-auto">
              <Button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-md h-12 px-6 text-sm font-semibold transition-all duration-200">
                Solve Now <ArrowRight size={16} className="ml-1.5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* 4. Featured Arenas (3-column grid) */}
        <section className="w-full flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/50 dark:border-slate-800 pb-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Choose Your Battleground</h2>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1.5">
                Pick a specialized track to test your algorithmic and system design limits.
              </p>
            </div>
            <Link
              to="/problem"
              className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors group shrink-0"
            >
              <span>View All Challenges</span>
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {arenas.map((arena) => {
              const IconComponent = arena.icon;
              return (
                <div
                  key={arena.id}
                  className="group relative flex flex-col justify-between h-full p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-lg shadow-md hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div>
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/20 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent size={20} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getDifficultyStyles(arena.difficulty)}`}>
                          {arena.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {arena.title}
                    </h3>
                    
                    <span className="inline-block text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
                      {arena.category} • {arena.points} Pts
                    </span>

                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
                      {arena.description}
                    </p>
                  </div>

                  {/* Card Button */}
                  <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <Link
                      to={`/problem`}
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold border border-indigo-500/20 bg-indigo-50/5 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 hover:shadow-md hover:shadow-indigo-500/15 transition-all duration-200"
                    >
                      <span>Join Arena</span>
                      <Zap size={14} className="group-hover:animate-pulse" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Live Leaderboard Snippet */}
        <section className="w-full flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/50 dark:border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Activity size={18} className="animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">LIVE STATUS UPDATING</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">Live Arena Leaderboard</h2>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1.5">
                Top-ranked coding competitors currently dominating active tracks.
              </p>
            </div>
            
            <Link
              to="/contest"
              className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors group shrink-0"
            >
              <span>View Full Leaderboards</span>
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Table Container */}
          <div className="w-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-lg border border-slate-200/50 dark:border-slate-800/80 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-slate-500 dark:text-slate-400">
                <thead>
                  <tr className="border-b border-slate-200/50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <th className="py-4 px-6 font-semibold w-20">Rank</th>
                    <th className="py-4 px-6 font-semibold">Competitor</th>
                    <th className="py-4 px-6 font-semibold hidden md:table-cell text-center">Active Streak</th>
                    <th className="py-4 px-6 font-semibold text-center">Success Rate</th>
                    <th className="py-4 px-6 font-semibold text-right">Points</th>
                    <th className="py-4 px-6 font-semibold text-center w-36">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium text-slate-700 dark:text-slate-300">
                  {leaderboard.map((user, idx) => {
                    const isTop3 = user.rank <= 3;
                    const rankBadgeColor = 
                      user.rank === 1 ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                      user.rank === 2 ? 'bg-slate-400/10 text-slate-500 dark:text-slate-300 border border-slate-400/20' :
                      'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20';

                    return (
                      <tr 
                        key={idx} 
                        className="hover:bg-indigo-500/5 dark:hover:bg-indigo-500/10 border-b border-slate-100 dark:border-slate-800/50 last:border-0 transition-all duration-200 cursor-pointer group"
                      >
                        {/* Rank */}
                        <td className="py-4.5 px-6">
                          {isTop3 ? (
                            <span className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${rankBadgeColor}`}>
                              {user.rank}
                            </span>
                          ) : (
                            <span className="flex items-center justify-center w-7 h-7 text-xs font-semibold text-slate-400">
                              {user.rank}
                            </span>
                          )}
                        </td>

                        {/* Competitor */}
                        <td className="py-4.5 px-6 font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                              {user.name.substring(0, 2).toUpperCase()}
                            </div>
                            <span>{user.name}</span>
                          </div>
                        </td>

                        {/* Active Streak */}
                        <td className="py-4.5 px-6 text-center hidden md:table-cell">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/20">
                            <Zap size={12} fill="currentColor" />
                            <span>{user.activeStreak} days</span>
                          </div>
                        </td>

                        {/* Success Rate */}
                        <td className="py-4.5 px-6">
                          <div className="flex flex-col items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{user.successRate}%</span>
                            <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500" 
                                style={{ width: `${user.successRate}%` }} 
                              />
                            </div>
                          </div>
                        </td>

                        {/* Points */}
                        <td className="py-4.5 px-6 text-right font-bold text-slate-900 dark:text-white">
                          <span>{user.points.toLocaleString()}</span>
                        </td>

                        {/* Status */}
                        <td className="py-4.5 px-6">
                          <div className="flex items-center justify-center">
                            {user.status === 'In Arena' ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                <span>{user.status}</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 border border-transparent">
                                <span>{user.status}</span>
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Premium CTA Panel */}
        <section className="w-full">
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-blob" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-blob animation-delay-2000" />
            <div className="relative space-y-6">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Join{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  50,000+ developers
                </span>
                <br />
                sharpening their skills
              </h2>
              <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Whether you're preparing for a technical interview or improving problem-solving skills, Code Arena is the place for you.
              </p>
              <div className="pt-4">
                <Link to="/problem">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-slate-100 text-slate-900 rounded-full h-12 px-8 text-sm font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
                  >
                    Get Started for Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;