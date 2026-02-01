import React, { useMemo, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
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
import SearchInterface from "../components/problem/SearchInterface";
import SessionCard from "../components/others/CircularProgress";
import ResultSection from "../components/problem/ResultSection";
import { Link, useNavigate } from "react-router-dom";
import { dsaProblems } from "../data/dsaProblem";
import Countdown from "../components/others/CountDown";
import Footer from "../components/Footer";

const Problems = () => {
  const [potd, setpotd] = useState(null);

  const problemOfTheDay = () => {
    const id = Math.round(Math.random() * 100);

    const problem = id % dsaProblems.length;
    setpotd(dsaProblems[problem]);
    console.log(problem);
  };
  useEffect(() => {
    problemOfTheDay();
  }, [dsaProblems]);

  //thing to apply
  // 1st- when submitted ,if passed all the test cases ,mark it true
  // 2nd  - pass random problem info to problem of the day ,will just pass the shuffle function on the useeffect for now



  const [filters, setfilters] = useState({
    //this si for the search and the filter to filter out questions
    search: "",
    Difficulty: "All",
    Tags: "All",
    topics: "All",
  });

  const filteredProblems = useMemo(() => {
    // filtering problems in memory according to the questions
    // IMPORTANT --- topic wala filter add karna h , for now bus dsa h ,or problems bhi add krni h --
    return dsaProblems.filter((problem) => {
      //checking searches
      const matchSearches = problem.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      const matchedDifficulty =
        filters.Difficulty === "All" ||
        problem.difficulty === filters.Difficulty ||
        !filters.Difficulty;

      const matchedTags =
        filters.Tags === "All" ||
        !filters.Tags ||
        problem.tags.includes(filters.Tags);

      return matchSearches && matchedDifficulty && matchedTags;
    });
  }, [filters]);

  const navigate = useNavigate(); // path ke liye

  const handleShuffle = (filteredResults) => {
    //random problem open krne ke liye
    if (filteredResults.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredResults.length);
      const randomProblem = filteredResults[randomIndex];
      navigate(`/problem/${randomProblem.id}`);
    } else {
      alert("No problems found to shuffle from!");
    }
  };

  return (
    <div className=" bg-gray-100 overflow-hidden">
      <Navbar />

      <div className="lg:px-20 pt-16 w-screen window:flex lg:gap-20">
        <div className="w-full window:w-[70%] px-5 lg:px-0 my-6 ">
          <div>
            {/* left div  */}
            <span
              className="
            font-bold  bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-5xl "
            >
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
          <SearchInterface
            setfilters={setfilters}
            filters={filters}
            onShuffle={() => handleShuffle(filteredProblems)}
          />

          <ResultSection
            filters={filters}
            filteredProblems={filteredProblems}
          />
        </div>

        <div
          className="
        px-6 lg:px-0 my-10
        window:w-[20%] flex flex-col"
        >
          <div className=" shadow-2xl bg-linear-to-br rounded-2xl from-blue-500 via-purple-500 to-pink-600 ">
            {/* right div  */}

            {/* problem of the day  */}
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
                {potd ? potd.title : ""}
              </h3>
              <div className="flex gap-4 items-center">
                <button className={`${potd? (potd.difficulty==="Easy"?'bg-green-300 ':(potd.difficulty==="Medium"?"bg-yellow-400":" bg-red-500")):'  '} bg-red-500 px-3 py-1 rounded-xl text-white`}>
                  {potd ? potd.difficulty : ""}
                </button>
                <p className="text-emerald-100 text-lg font-medium">+10 Points</p>
              </div>
              <Link
                to={`/problem/${potd?potd.id:''}`}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                <button className="flex w-full cursor-pointer items-center justify-center text-center rounded-lg px-3 py-2 bg-white text-xl font-bold text-purple-500">
                  <p>Solve now</p>
                  <MoveRight />
                </button>
              </Link>
            </div>
          </div>
          <div className="w-20 h-20 ">
            <SessionCard />
          </div>

          <div className="w-auto text-sm py-6 rounded-2xl shadow-2xl mt-60">
            <h1 className="text-2xl text-gray-600 px-10">Trending Companies</h1>
            <div className="grid grid-cols-2 gap-7 pt-5 px-10">
              <div className="border border-black/30 rounded-lg font-semibold flex gap-2 px-3 py-2 text-black/80">
                <ShoppingCart className="text-sm" size={20} />
                <p>Amazon</p>
              </div>
              <div className="border border-black/30 rounded-lg font-semibold flex gap-2 px-3 py-2 text-black/80">
                <Airplay className="text-sm" size={20} />
                <p>Microsoft</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-7 pt-5 px-10">
              <div className="border border-black/30 rounded-lg font-semibold flex gap-2 px-3 py-2 text-black/80">
                <CircleStar className="text-sm" size={20} />
                <p>Meta</p>
              </div>
              <div className="border border-black/30 rounded-lg font-semibold flex gap-2 px-3 py-2 text-black/80">
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
                <p>
                  Starts in {<Countdown targetTime="2026-06-18T22:30:00" />}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Problems;
