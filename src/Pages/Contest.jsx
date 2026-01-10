import {
  AlarmClock,
  AlertCircle,
  Clock10,
  TrendingUp,
  Triangle,
  TrophyIcon,
} from "lucide-react";
import React from "react";
import Countdown from "../components/others/CountDown";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";
import { BsTriangleFill } from "react-icons/bs";

const Contest = () => {
  return (
    <div className="w-full  bg-gray-100 h-screen overflow-hidden">
      <Navbar />
      <div className="w-full h-full flex mt-26 mx-10">
        <div className="w-[70%]  ">
          {/* left div -  */}

          <div className="flex  w-full rounded-2xl bg-white overflow-hidden">
            {/* card div  */}
            <div className="w-[25%] relative">
              {/* imgage  */}
              <img
                src="https://images.unsplash.com/photo-1757101782354-d7988295617c"
                className=""
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
        </div>

        <div className="w-[28%] px-10 ">
          {/* right  */}
          <div className="bg-white p-5">
            {/* card  */}
            <div className="flex gap-2">
              <TrendingUp className="bg-blue-100 text-blue-600  rounded-full px-2 " size={40}/>
              <div>

              <h1 className="text-gray-500 text-sm font-semibold uppercase">Your rating</h1>
              <div className="flex items-center gap-3">
               <p className="text-2xl font-semibold">
                1,540 
                </p> 
              <Button className="h-7 text-sm bg-green-50 text-green-600"> <BsTriangleFill /> 
               
               <p>12</p>
                </Button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contest;
