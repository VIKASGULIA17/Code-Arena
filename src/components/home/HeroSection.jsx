"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code2,
  Users,
  Zap,
  BarChart3,
  Sparkles,
  Award,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const stats = [
    { label: "Submissions", value: "1.2M+", icon: Code2, color: "text-indigo-600 bg-indigo-50" },
    { label: "Active Users", value: "50K+", icon: Users, color: "text-purple-600 bg-purple-50" },
    { label: "Problems", value: "2,400+", icon: Zap, color: "text-pink-600 bg-pink-50" },
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Problem Archive",
      description: "Practice with 2000+ problems curated by difficulty, company, and tags with detailed analytics.",
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      icon: Sparkles,
      title: "Live Contests",
      description: "Join weekly contests, compete in real time, and climb the global leaderboard.",
      color: "text-purple-600 bg-purple-50",
    },
    {
      icon: Zap,
      title: "Algorithm Visualizer",
      description: "Interactive visualizers for sorting, searching, dynamic programming, and more.",
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-indigo-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative section-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium shadow-[0_1px_3px_rgba(79,70,229,0.08)]">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                Weekly Contest #352 is Live
                <ChevronRight size={14} />
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.08] tracking-tight">
                  Master
                  <br />
                  Algorithms.
                </h1>
                <h2 className="text-4xl md:text-5xl font-extrabold text-brand-gradient leading-[1.12]">
                  Ace the Interview.
                </h2>
              </div>

              <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
                The best platform to practice coding, compete in global contests,
                and visualize data structures with modern tools.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/problem">
                  <Button
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-200/50 px-7 h-12 text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-indigo-200/60"
                  >
                    Start Solving
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
                <Link to="/algovisualizer">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-xl h-12 text-sm font-semibold border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                  >
                    <Sparkles className="w-4 h-4 mr-1.5" />
                    Explore Visualizer
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2.5">
                  {[1, 29, 3, 4].map((i) => (
                    <img
                      src={`https://i.pravatar.cc?img=${i}`}
                      key={i}
                      alt=""
                      className="w-10 h-10 rounded-full border-[2.5px] border-white shadow-sm"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <div className="font-semibold text-slate-600 text-xs mt-0.5">1M+ developers joined</div>
                </div>
              </div>
            </div>

            {/* Right Column — Code Preview Card */}
            <div className="hidden lg:block relative z-10">
              <div className="rounded-2xl overflow-hidden border border-slate-200/70 shadow-2xl shadow-slate-300/30 aspect-[4/3] relative bg-slate-900 p-1">
                {/* Terminal-like header */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 rounded-t-xl">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="text-xs text-slate-400 font-code ml-2">solution.py</span>
                </div>
                {/* Code content */}
                <div className="p-5 text-sm font-code leading-relaxed">
                  <div><span className="text-purple-400">def</span> <span className="text-amber-300">twoSum</span><span className="text-slate-300">(nums, target):</span></div>
                  <div className="text-slate-500 ml-4">"""Find two numbers that add up to target"""</div>
                  <div className="ml-4"><span className="text-slate-300">seen = </span><span className="text-amber-300">{'{}'}</span></div>
                  <div className="ml-4"><span className="text-purple-400">for</span> <span className="text-slate-300">i, num</span> <span className="text-purple-400">in</span> <span className="text-amber-300">enumerate</span><span className="text-slate-300">(nums):</span></div>
                  <div className="ml-8"><span className="text-slate-300">complement = target - num</span></div>
                  <div className="ml-8"><span className="text-purple-400">if</span> <span className="text-slate-300">complement</span> <span className="text-purple-400">in</span> <span className="text-slate-300">seen:</span></div>
                  <div className="ml-12"><span className="text-purple-400">return</span> <span className="text-slate-300">[seen[complement], i]</span></div>
                  <div className="ml-8"><span className="text-slate-300">seen[num] = i</span></div>
                  <div className="mt-3 pt-3 border-t border-slate-700/50">
                    <span className="text-emerald-400">✓ All test cases passed</span>
                    <span className="text-slate-500 ml-3">Runtime: 4ms · Memory: 15.2MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="px-6 pb-20 section-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="card-elevated p-6 flex items-center gap-5 hover-lift"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Daily Challenge ─── */}
      <section className="px-6 pb-20 section-wrapper">
        <div className="card-elevated p-0 overflow-hidden hover-lift">
          <div className="flex flex-col md:flex-row items-center gap-6 p-8">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Daily Challenge
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-600 rounded-full">NEW</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">
                Reverse Linked List II
              </h4>
              <p className="text-slate-500 text-sm max-w-lg mb-3">
                Given the head of a singly linked list and two integers left and right, reverse the nodes from position left to position right.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="badge-warning">
                  Medium
                </span>
                <span className="badge-info">
                  Linked List
                </span>
                <span className="badge-info">
                  Recursion
                </span>
              </div>
            </div>
            <Link to="/problem/1" className="shrink-0">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm shadow-indigo-200/50 h-11 px-5 text-sm font-semibold transition-all duration-200">
                Solve Now <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="px-6 py-24 section-wrapper">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Everything you need to grow
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            From beginner concepts to advanced competitive programming, modern tools to help you succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card-elevated p-8 hover-lift group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 pb-24 section-wrapper">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Join{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                50,000+ developers
              </span>
              <br />
              sharpening their skills
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Whether you're preparing for a technical interview or improving
              problem-solving skills, Code Arena is the place for you.
            </p>
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
      </section>
    </div>
  );
}