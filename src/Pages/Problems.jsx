import React from "react";
import Navbar from "../components/Navbar";
import { ArrowRightIcon, CircleCheck } from "lucide-react";
import {
  MoveRight,
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  CircleStar,
  Airplay,
  Aperture,
  Clock10,
} from "lucide-react";
import ProblemList from "../components/problem/SearchInterface";
import { Progress } from "@/components/ui/progress";
import { CircularProgress } from "@heroui/progress";
import SessionCard from "../components/others/CircularProgress";
import ResultSection from "../components/problem/ResultSection";

const Problems = () => {
  

  const Problem_Progress = [
    { id: 1, title: "Easy", progress: 56 },
    { id: 2, title: "Medium", progress: 78 },
    { id: 3, title: "hard", progress: 34 },
  ];

  return (
    <div className="px-10 overflow-hidden">
      <Navbar />

      <div className=" pt-16 w-screen flex gap-20">
        <div className="w-[70%] my-6 ">
          <div>
            {/* left div  */}
            <span className="font-bold  bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-5xl ">
              Problem Set
            </span>
            <h4 className="text-xl pt-3 text-gray-700  ">
              Shape your coding skills with our currated list of
              problems.Search,filter,
              <br />
              and solve.
            </h4>
          </div>
          {/* <ProblemList /> */}
          <ProblemList />

          <ResultSection />
        </div>

        <div className="w-[20%] flex flex-col">
          <div className=" shadow-2xl bg-linear-to-br rounded-2xl from-blue-500 via-purple-500 to-pink-600 ">
            {/* right div  */}
            <div className="px-5 py-8 flex flex-col gap-4">
              <div className="flex justify-between">
                <h1 className="text-xl font-bold text-white">
                  Daily Challenge
                </h1>
                <button className="bg-white/50 text-white font-semibold px-3 py-1 rounded-2xl">
                  April 12
                </button>
              </div>

              <h3 className="px-2 text-3xl font-bold text-white ">
                Trapping Rain water
              </h3>
              <div className="flex gap-4 items-center">
                <button className="bg-red-500 px-3 py-1 rounded-xl text-white">
                  Hard
                </button>
                <p className="text-white/80 text-xl">+10 Points</p>
              </div>
              <button className="flex w-full items-center justify-center text-center rounded-lg px-3 py-2 bg-white text-xl font-bold text-purple-500">
                <p>Solve now</p>
                <MoveRight />
              </button>
            </div>
          </div>
          <div className="w-20 h-20 ">
            <SessionCard />
          </div>

          <div className="w-full  py-6 rounded-2xl shadow-2xl mt-60">
            <h1 className="text-2xl text-gray-600 px-10">Trending Companies</h1>
            <div className="flex gap-7 pt-5 px-10">
              <div className="border border-black/30 rounded-2xl flex gap-2 px-2 py-1 text-black/80">
                <ShoppingCart className="text-sm" size={20} />
                <p>Amazon</p>
              </div>
              <div className="border border-black/30 rounded-2xl flex gap-2 px-2 py-1 text-black/80">
                <Airplay className="text-sm" size={20} />
                <p>Microsoft</p>
              </div>
            </div>
            <div className="flex gap-7 pt-5 px-10">
              <div className="border border-black/30 rounded-2xl flex gap-2 px-2 py-1 text-black/80">
                <CircleStar className="text-sm" size={20} />
                <p>Meta</p>
              </div>
              <div className="border border-black/30 rounded-2xl flex gap-2 px-2 py-1 text-black/80">
                <Aperture className="text-sm" size={20} />
                <p>Google</p>
              </div>
            </div>
          </div>

          <div className="w-full h-60 mt-10 overflow-hidden relative rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1592659762303-90081d34b277?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Contest Background"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-center text-white  bg-black/30">
              <h1 className="text-center font-bold text-3xl ">
                Weekly Contest 298
              </h1>

              <div className="flex items-center justify-center gap-2 mt-2 px-4 py-1 rounded-full bg-white/20 text-lg font-semibold animate-pulse">
                <Clock10 className="w-5 h-5" />
                <p>Starts in 04:23:05</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problems;
