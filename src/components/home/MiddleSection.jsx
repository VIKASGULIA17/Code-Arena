import { useState } from "react";

import { IoMdDownload } from "react-icons/io";
import { MdOutlineStart } from "react-icons/md";

const DownloadArea = () => {
  return (
    <>
      <div className="h-auto w-auto p-24 py-11">
        <div
          className="bg-center bg-cover rounded-xl h-auto flex flex-row gap-3 p-5"
          style={{ backgroundImage: `url(${'src/assets/BlackBackground.jpeg'})` }}
        >
          <div className=" h-full w-1/2 p-3 flex flex-col gap-3 items-center justify-center">
            <div className=" h-auto w-full">
              <p className="text-white text font-bold p-3 bg-blue">
                READY TO SPEED UP YOUR CODING?
              </p>
              <p className="text-white text-3xl font-bold px-3  p-3">
                Solve DSA and Competitive Programming Problems Faster
              </p>
            </div>
            <div>
              <p className="myhighlights leading-loose  text-white font-light p-3">
                CodeTemplate Builder will guide you step-by-step to access
                pre-built, optimized templates designed for faster
                problem-solving. Spend less time writing boilerplate code and
                more time focusing on solving problems.
              </p>
              <div>
                <div className="flex flex-row  w-auto justify-center p-4">
                  <div className="bg-blue-700 h-full py-2 rounded-tl-lg rounded-bl-lg">
                    <MdOutlineStart className="bg-red text-3xl pl-3 text-white"/>
                  </div>
                  <button className="bg-blue-700 text-white px-4 py-2 rounded-tr-lg rounded-br-lg">Get Started</button>
                </div>
                <p className="myhighlights leading-loose italic text-white text-center  font-light p-3">"Free to use for personal practice. Charges apply for advanced features."</p>
              </div>
            </div>
          </div>
          <div className="h-auto w-1/2">
            <div className="bg-cover bg-no-repeat h-full w-full rounded-2xl"
              style={{backgroundImage : `url(${'src/assets/image.png'})`}}
            >

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadArea;