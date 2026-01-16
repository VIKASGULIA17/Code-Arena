import {
  AlarmClock,
  ArrowRight,
  TrendingUp,
  TrophyIcon,
  Zap,
} from "lucide-react";
import Countdown from "../components/others/CountDown";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";
import { BsTriangleFill } from "react-icons/bs";
import { topSolvers } from "../data/ContestData";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContestList from "../components/Contest/ContestList";
import { useState } from "react";

const Contest = () => {
  return (
    <div className="w-full  bg-gray-100 overflow-x-hidden">
      <Navbar />
      <div className="w-full h-full lg:flex mt-26 px-4 lg:mx-10">
        <div className="w-full lg:w-[70%]  ">
          {/* left div -  */}

          <div className="flex flex-col lg:flex-row w-full rounded-2xl shadow-xl bg-white overflow-hidden">
            {/* card div  */}
            <div className="lg:w-[25%]  relative">
              {/* imgage  */}
              <img
                src="https://images.unsplash.com/photo-1757101782354-d7988295617c"
                className="h-60 w-full object-cover "
                alt=""
              />
              <p className="absolute bottom-7 left-13 bg-linear-to-r from-blue-400 via-purple-500 to-pink-600 text-white  px-3 py-1 rounded-2xl">
                Featured Event
              </p>
            </div>
            <div className="w-full px-10 my-10 ">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-semibold">
                    Global Coding contest 2024
                  </h1>
                  <p className="text-gray-700">sponsered by TechGiant</p>
                </div>
                <TrophyIcon
                  className="p-3 bg-purple-100 text-purple-500 rounded-full font-bold"
                  size={45}
                />
              </div>
              <div className="flex items-center my-10 gap-4">
                <AlarmClock className="text-blue-700" />
                <div className="text-xl font-bold">
                  <Countdown />
                </div>
                <p className="text-gray-700">until starts</p>
              </div>
              <div className="">
                <p className="max-w-[400px]">
                  Join over 15,000 developers in the biggest algorithm challenge
                  of the year.
                </p>
              </div>
              <div className="flex items-center gap-3 my-7">
                <Button>
                  <p className="text-gray-600 font-semibold border shadow-2xl px-4 py-2 rounded-lg">
                    Details
                  </p>
                </Button>
                <Button className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-500">
                  <p className="text-white font-semibold">Register Now</p>
                </Button>
              </div>
              {/* content  */}
            </div>
          </div>

          <ContestList />
        </div>

        <div className="w-full lg:w-[28%] lg:px-10 h-auto  overflow-hidden">
          {/* right  */}
          <div className="bg-white p-5 rounded-xl border border-gray shadow-2xl">
            {/* card  */}
            <div className="flex gap-2">
              <TrendingUp
                className="bg-blue-100 text-blue-600  rounded-full px-2 "
                size={40}
              />
              <div>
                <h1 className="text-gray-500 text-sm font-semibold uppercase">
                  Your rating
                </h1>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-semibold">1,540</p>
                  <Button className="h-7 text-sm bg-green-50 text-green-600">
                    {" "}
                    <BsTriangleFill />
                    <p>12</p>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-7 w-full my-3 text-center">
              <Card className="w-1/2 bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-gray-700 font-medium">
                    Global Rank
                  </CardTitle>
                  <CardDescription className="font-bold text-black">
                    #14,023
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="w-1/2 bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-gray-700 font-medium">
                    Contest
                  </CardTitle>
                  <CardDescription className="font-bold text-black">
                    24
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            <Button className="mt-5 flex w-full">
              <p className="text-center">View Full History</p>
              <ArrowRight />
            </Button>
            {/* ... */}
          </div>

          <div className="my-8 shadow-xl">
            <Card>
              <CardHeader>
                <CardTitle>Top Solver</CardTitle>
                <CardAction>Last Contest</CardAction>
              </CardHeader>

              {topSolvers.map((obj, idx) => {
                return (
                  <CardContent
                    key={idx}
                    className="flex items-center gap-6 border-b border-gray-50 last:border-0"
                  >
                    <p className="w-5 font-bold text-gray-400">{obj.rank}</p>
                    <img
                      src={obj.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full bg-gray-100"
                    />
                    <h1 className="font-medium flex-1 text-gray-800">
                      {obj.name}
                    </h1>
                    <div className="flex items-center gap-1 text-gray-400 font-semibold">
                      <Zap
                        size={16}
                        className="fill-green-500 text-green-500"
                      />
                      <p>{obj.duration}</p>
                    </div>
                  </CardContent>
                );
              })}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contest;
