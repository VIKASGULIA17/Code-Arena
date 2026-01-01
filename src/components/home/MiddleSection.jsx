import React from "react";
import {
  CodeXml,
  UsersRound,
  Zap,
  Target,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
// Assuming these are your custom 3D card components
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Button } from "../ui/button";

const MiddleSection = () => {
  const Cards = [
    {
      icon: (
        <CodeXml className="h-20 w-20 p-4 bg-linear-to-r from-blue-400 to-blue-300 text-white rounded-xl hover:scale-110 duration-500" />
      ),
      frequency: "100+",
      label: "Problem",
      hover: "hover:bg-gradient-to-r from-blue-200 to-blue-100",
    },
    {
      icon: (
        <UsersRound className="h-20 w-20 p-4 bg-linear-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:scale-110 duration-500" />
      ),
      frequency: "50+",
      label: "Active Users",
      hover: "hover:bg-gradient-to-r from-purple-200 to-pink-100",
    },
    {
      icon: (
        <Zap className="h-20 w-20 p-4 bg-linear-to-r from-orange-400 to-orange-600 text-white rounded-xl hover:scale-110 duration-500" />
      ),
      frequency: "3",
      label: "languages",
      hover: "hover:bg-gradient-to-r from-yellow-100 to-yellow-50",
    },
  ];

  const Features = [
    {
      icon: (
        <CodeXml className="h-20 w-20 p-4 bg-linear-to-r from-blue-500 to-blue-300 text-white rounded-xl hover:scale-110 duration-500" />
      ),
      frequency: "AI-Powered Feedback",
      label:
        "Get instant, intelligent feedback on your code quality, time complexity, and optimization opportunities",
      hover: "bg-gradient-to-r from-blue-500 to-blue-300",
    },
    {
      icon: (
        <UsersRound className="h-20 w-20 p-4 bg-linear-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:scale-110 duration-500" />
      ),
      frequency: "Mock Interviews",
      label:
        "Practice with time-boxed interview simulations and receive detailed analysis on your performance",
      hover: "bg-gradient-to-r from-purple-600 to-pink-400",
    },
    {
      icon: (
        <Zap className="h-20 w-20 p-4 bg-linear-to-r from-orange-400 to-orange-600 text-white rounded-xl hover:scale-110 duration-500" />
      ),
      frequency: "Live Contests",
      label:
        "Compete with developers worldwide in real-time contests and climb the global leaderboard",
      hover: "bg-gradient-to-r from-yellow-400 to-orange-400",
    },
  ];

  const buttonFeatures = [
    { label: "Real-time code execution" },
    { label: "Comprehensive test cases" },
    { label: "Company-tagged problems" },
    { label: "Discussion forums" },
    { label: "Progress tracking" },
    { label: "Personalized learning paths" },
  ];

  return (
    <div>
      {/* 1. First Card Section (The one with the clipping issue) */}
      <div className="w-full relative my-20 lg:mt-200 z-30 flex items-center flex-col lg:flex-row lg:justify-center gap-40 md:gap-10 px-4 md:px-8 mt-260">
        {Cards.map((obj, idx) => {
          return (
            <div
              key={idx}
              className={`duration-200  z-10 w-full max-w-sm md:w-auto lg:w-72 -my-16 lg:my-0`}
            >
              <div
                // Using w-full here references the w-72 max-width of the parent
                className={`bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 dark:bg-black dark:border-white/20 border-black/10 w-full h-auto rounded-xl p-6 border flex items-center flex-col gap-3 ${obj.hover} overflow-hidden `}
              >
                {obj.icon}

                <div className="text-black text-4xl font-semibold text-center mt-2 dark:text-neutral-300">
                  {obj.frequency}
                </div>

                <div className="flex justify-between items-center">
                  <div className="px-4 py-2 rounded-xl text-black/50 font-bold">
                    {obj.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Features Section */}
      <div className="h-auto w-full bg-black/5 pt-32 lg:pt-20">
        <div className="w-full items-center flex flex-col pt-10 gap-10">
          <Button className="bg-blue-100 text-blue-500 hover:bg-blue-200 rounded-3xl">
            <Target />
            <p>Why choose code Arena</p>
          </Button>

          <h1 className="text-5xl leading-14 lg:text-5xl px-3 lg:px-0 font-medium lg:font-semibold text-center lg:leading-15">
            Everything You Need to
            <br />
            Excel in Coding
          </h1>

          <p className="text-center px-5 text-lg">
            Experience the next generation of coding practice with AI-driven
            insights and <br /> comprehensive learning tools
          </p>
        </div>

        <div className="flex w-full flex-col lg:flex-row justify-center py-10 lg:py-20 gap-20 px-4 lg:px-8 ">
          {" "}
          {/* Adjusted gap and padding */}
          {Features.map((obj, idx) => {
            return (
              <CardContainer
                key={idx}
                className={`inter-var duration-200 -my-24 lg:my-0 z-10 pt-1 ${obj.hover} rounded-xl`}
              >
                <CardBody
                  className={`bg-white relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 dark:bg-black dark:border-white/20 border-black/10 w-80 h-auto rounded-xl p-6 border flex items-start flex-col gap-3 overflow-hidden `}
                >
                  {obj.icon}
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-black text-2xl font-semibold text-start max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {obj.frequency}
                  </CardItem>
                  <div className="text-start">
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="text-start py-2 rounded-xl text-black/50 "
                    >
                      {obj.label}
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            );
          })}
        </div>
      </div>

      {/* 3. CTA Banner Section */}
      <div className="w-full my-20 flex justify-center items-center px-4 md:px-0">
        <div className="py-15 rounded-2xl px-10 h-full bg-linear-to-br from-blue-600 via-purple-500 to-pink-600 flex flex-col lg:flex-row gap-10">
          <div className="flex flex-col items-start gap-7">
            {/* left */}
            <h1 className="text-3xl font-bold text-white">
              Ready to Level Up Your <br /> Coding Skills?
            </h1>
            <p className="text-white text-lg">
              Join thousands of developers who are mastering <br /> data
              structures and algorithms with our AI-powered <br />
              platform
            </p>
            <Button
              size="lg"
              className="flex justify-center items-center cursor-pointer"
            >
              <p>Get started for free</p>
              <ArrowRight />
            </Button>
          </div>
          {/* right: Fixed wrapping issue here */}
          <div className="grid grid-cols-2 gap-4">
            {buttonFeatures.map((obj, idx) => {
              return (
                <Button
                  key={idx}
                  variant="outline"
                  className="bg-white/20 hover:bg-white/20
                           text-white duration-200 
                           h-20 w-full 
                           flex flex-wrap items-center justify-start gap-2 px-3" /* Added flex-wrap and gap */
                >
                  <BadgeCheck className="text-green-300 shrink-0" />
                  <p className="text-[12px] lg:text-[17px] leading-snug">
                    {obj.label}
                  </p>{" "}
                  {/* Adjusted text size for wrapping */}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleSection;
