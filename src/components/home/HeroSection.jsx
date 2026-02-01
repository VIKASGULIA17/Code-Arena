"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  ArrowRight,
  Code2,
  Users,
  Zap,
  BarChart3,
  Sparkles,
  Award,
} from "lucide-react";
import { useState } from "react";
import { MdOutlineStart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export default function HeroSection() {
  
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const {jwtToken} = useAppContext();

  async function handleTesting() {
    try {
      const res = await axios.get(`${BACKEND_URL}/user/isWorking`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log(res.data);
    } catch (e) {
      navigate("/sessionExpired");
    }
  }

  return (
    <div className="min-h-screen pt-10 bg-linear-to-br from-slate-50 via-blue-50 to-pink-100">
      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        {/* just for checking session expiry i will remote it later  */}
        <button
          onClick={handleTesting}
          className={`${jwtToken ? "block" : "hidden"} bg-black text-white rounded-md px-2 py-1 hover:bg-white hover:text-black cursor-pointer hover:border-black border-2`}
        >
          click me to test session expiration
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white border   text-blue-500 px-3 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              Weekly Contest #352 is Live
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-semibold text-foreground leading-tight">
                Master <br />
                <span className="">Algorithms.</span>
              </h1>
              <h2 className="text-4xl md:text-7xl bg-linear-to-b from-blue-500 via-purple-500 to-pink-600 bg-clip-text text-transparent font-bold ">
                Ace the Interview.
              </h2>
            </div>
            <p className="text-lg text-foreground/70 max-w-md">
              The best platform to practice coding, compete in global contests,
              and visualize data structures with our modern tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/problem">
                <Button
                  size="lg"
                  className="bg-foreground hover:bg-foreground/90 text-background rounded-lg"
                >
                  Start Solving
                </Button>
              </Link>
              <Link to="/algovisualizer">
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:scale-105 rounded-lg bg-transparent"
                >
                  <Sparkles className="w-4 h-4" />
                  Explore Visualizer
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 29, 3, 4].map((i) => (
                  <img
                    src={`https://i.pravatar.cc?img=${i}`}
                    key={i}
                    alt=""
                    className="w-12 h-12 rounded-full bg-linear-to-br from-purple-400 to-pink-400 border-2 border-white"
                  />
                ))}
              </div>
              <div className="text-sm text-foreground/70">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <div className="font-semibold">1M+ developers joined today</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:h-full lg:w-[40vw]  bg-black rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between bg-black  px-4 py-4
            
            ">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>
              <span className="text-xs text-white">solution.ts</span>
            </div>
            <div
              className="bg-center bg-cover rounded-xl h-full flex flex-col gap-3 p-5
              window:flex-row
              lg:auto
              "
              style={{
                backgroundImage: `url(${"src/assets/BlackBackground.jpeg"})`,
              }}
            >
              <div className="w-full h-auto p-3 flex flex-col gap-3 items-center justify-center
              
              window:w-1/2 window:lg-auto">
                <div className=" h-auto w-full">
                  <p className="text-white text font-bold p-3 bg-blue">
                    READY TO SPEED UP YOUR CODING?
                  </p>
                  <p className="text-white text-3xl font-bold px-3  p-3">
                    Solve DSA and Competitive Programming Problems Faster
                  </p>
                </div>
                <div>
                  <p className=" leading-loose  text-white font-light p-3">
                    CodeTemplate Builder will guide you step-by-step to access
                    pre-built, optimized templates designed for faster
                    problem-solving. Spend less time writing boilerplate code
                    and more time focusing on solving problems.
                  </p>
                  <div>
                    <Link to="/problem">
                      <div className="flex flex-row  w-auto justify-center p-4">
                        <div className="bg-blue-700 h-full py-2 rounded-tl-lg rounded-bl-lg">
                          <MdOutlineStart className="bg-red text-3xl pl-3 text-white" />
                        </div>
                        <button className="bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-tr-lg rounded-br-lg">
                          Get Started
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full h-[300px] overflow-hidden rounded-2xl 
              lg:h-[300px]
              window:w-1/2 window:h-auto 
              
              ">
                <div
                  className="bg-cover bg-no-repeat h-full duration-500 hover:scale-110 w-full rounded-2xl"
                  style={{
                    backgroundImage: `url(${"https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"})`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <Code2 className="w-12 h-12 bg-blue-100 text-blue-600 p-2 rounded-lg mb-4" />
            <p className="text-sm font-medium text-foreground/70 uppercase tracking-wide">
              Total Submissions
            </p>
            <p className="text-4xl font-bold text-foreground mt-2">1.2M+</p>
          </div>
          <div className="bg-white rounded-xl  p-8 border border-slate-200">
            <Users className="w-12 h-12 p-2 mb-4 bg-purple-100 text-purple-600 rounded-lg" />
            <p className="text-sm font-medium text-foreground/70 uppercase tracking-wide">
              Active Users
            </p>
            <p className="text-4xl font-bold text-foreground mt-2">50k+</p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <Zap className="w-12 h-12 p-2 bg-pink-100 text-pink-600 rounded-lg mb-4" />
            <p className="text-sm font-medium text-foreground/70 uppercase tracking-wide">
              Problems Available
            </p>
            <p className="text-4xl font-bold text-foreground mt-2">2,400+</p>
          </div>
        </div>
      </section>

      {/* Daily Challenge Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto ">
        <div className="bg-white rounded-2xl border shadow-xl hover:scale-101 duration-300 border-slate-200 overflow-hidden">
          <div className="flex flex-col md:flex-row  items-center gap-4 p-8">
            <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-center md:text-start">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Daily Challenge
              </h3>
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-foreground">
                  Reverse Linked List II
                </h4>
                <p className="text-foreground/70 text-md md:w-3/4">
                  Given the head of a singly linked list and two integers left
                  and right where left ≤ right, reverse the nodes of the list
                  from position left to position right, and return the reversed
                  list.
                </p>
                <div className="flex gap-2 pt-2">
                  <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded-full border border-yellow-200">
                    Medium
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                    Linked List
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                    Recursion
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/8">
              <Link to="/problem/1">
                <Button className="bg-foreground  hover:bg-foreground/90 text-background rounded-lg">
                  Solve Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything you need to grow
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            From beginner concepts to advanced competitive programming, we have
            the modern tools to help you succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 border border-slate-200 hover:shadow-lg transition-shadow">
            <BarChart3 className="w-12 h-12 p-2 bg-pink-100 text-pink-600 rounded-lg mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Problem Archive
            </h3>
            <p className="text-foreground/70">
              Practice with over 2000 problems curated by difficulty, company,
              and tags. Track your progress with detailed analytics.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-slate-200 hover:shadow-lg transition-shadow">
            <Sparkles className="w-12 h-12 p-2 bg-cyan-100 text-blue-600 rounded-lg mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Live Contests
            </h3>
            <p className="text-foreground/70">
              Join weekly contests, compete with peers in real time, and climb
              the global leaderboard to earn badges.
            </p>
          </div>
          <div className="bg-white rounded-xl p-8 border border-slate-200 hover:shadow-lg transition-shadow">
            <Zap className="w-12 h-12 p-2 bg-green-100 text-green-600 rounded-lg mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Algorithm Visualizer
            </h3>
            <p className="text-foreground/70">
              Don't just read code—see it. Interactive visualizers for sorting,
              searching, dynamic programming, and linked lists.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-center text-white">
          <h2 className="text-5xl font-bold mb-6 leading-16">
            Join{" "}
            <span className="text-brand-gradient">
              50,000+ developers <br />{" "}
            </span>{" "}
            sharpening their skills
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Whether you're preparing for a technical interview or just want to
            improve your problem-solving skills, CodeArena is the place for you.
          </p>
          <Link to="/problem">
            <Button
              size="lg"
              className="bg-white hover:bg-slate-100 text-foreground rounded-full"
            >
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}