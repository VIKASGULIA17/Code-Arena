import React from "react";
import { Button } from "../ui/button";
import { Sparkles, ArrowRight, BadgeCheck } from "lucide-react";
import { CodeXml, UsersRound, Zap } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const BottomWave = () => (
  <div className="absolute bottom-0 left-0 right-0 ">
    <svg
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-bg-color"
    >
      <path
        d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
        fill="white"
      />
    </svg>
  </div>
);

const HeroSection = () => {
  return (
    <div className="absolute left-0 top-16 min-h-screen w-full bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 ">
      <div className="absolute inset-0 opacity-30 overflow-clip ">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div
          className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="flex flex-col items-center gap-6 z-30 py-20">
        <Button
          variant="outline"
          className="animate-float duration-200 flex items-center rounded-2xl bg-white/20 hover:bg-white/40 "
        >
          <Sparkles className="text-white" />
          <p className="text-white">AI powered Learning Platform</p>
        </Button>

        <div className="z-20">
          <h1 className="text-5xl text-center leading-15 md:text-5xl lg:text-7xl md:leading-16 lg:leading-20 capitalize text-white font-bold">
            Master Coding with
          </h1>
          <h1 className="text-5xl text-center  leading-15 md:text-5xl lg:text-7xl md:leading-16 lg:leading-20 text-transparent bg-clip-text bg-linear-to-br from-yellow-400  to-white font-bold">
            AI-Powered Practice
          </h1>
        </div>

        <div className="py-2 z-20 lg:mx-[33vw]">
          <p className="text-xl text-center lg:text-2xl text-white/90 ">
            Practice problems, compete in contests, and ace your
            interviews with intelligent feedback and real-time analysis
          </p>
        </div>

        {/* cta  */}

        <div className="flex flex-col md:flex-row py-6 gap-4 z-20">
          <Button
            variant="outline"
            size="lg"
            className="
          hover:scale-105 hover:bg-white/90 duration-200
          text-purple-500 cursor-pointer"
          >
            <p className="text-[17px]">
              Start Solving
            </p>
            <ArrowRight />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="
          hover:scale-105 bg-white/20 hover:bg-white/30
          text-white duration-200 cursor-pointer"
          >
            <p
              className="text-[17px]
            "
            >
              View Contest
            </p>
          </Button>
        </div>

        {/* tags */}
        <div className="grid col-2 md:flex gap-4">
          <div className="flex text-md lg:text-sm text-white/80 gap-2 items-center">
            <BadgeCheck className="text-green-400" />
            <p>Real-time code execution</p>
          </div>
          <div className="flex text-md lg:text-sm text-white/80 gap-2 items-center ">
            <BadgeCheck className="text-green-400" />
            <p>Comprehensive test cases</p>
          </div>
          <div className="flex text-md lg:text-sm text-white/80 gap-2 items-center ">
            <BadgeCheck className="text-green-400" />
            <p>Company-tagged problem</p>
          </div>
        </div>
      </div>

      <BottomWave />
    </div>
  );
};

export default HeroSection;
