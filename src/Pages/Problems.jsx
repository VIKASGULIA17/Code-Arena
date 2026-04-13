import React, { useMemo, useState, useEffect } from "react";
import { EnhancedNavbar } from "../components/Navbar";
import {
  MoveRight,
  ShoppingCart,
  CircleStar,
  Airplay,
  Aperture,
  Clock10,
  Flame,
  Building2,
} from "lucide-react";
import SearchInterface from "../components/problem/SearchInterface";
import ResultSection from "../components/problem/ResultSection";
import { Link, useNavigate } from "react-router-dom";
import Countdown from "../components/others/CountDown";
import Footer from "../components/Footer";
import Loading from "../components/others/Loading";
import { useAppContext } from "../context/AppContext";

const Problems = () => {
  const [loading, setLoading] = useState(true);
  const [potd, setpotd] = useState(null);
  const { jwtToken, allProblem, showAllProblems } = useAppContext();

  const problemOfTheDay = (problems) => {
    if (!problems || problems.length === 0) return;
    const id = Math.round(Math.random() * 100);
    const index = id % problems.length;
    setpotd(problems[index]);
  };

  useEffect(() => {
    showAllProblems();
    setLoading(false);
  }, []);

  const [filters, setfilters] = useState({
    search: "",
    Difficulty: "All",
    Tags: "All",
    topics: "All",
  });

  const filteredProblems = useMemo(() => {
    if (!allProblem || allProblem.length === 0) return [];
    return allProblem.filter((problem) => {
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
  }, [filters, allProblem]);

  const navigate = useNavigate();

  const handleShuffle = (filteredResults) => {
    if (filteredResults.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredResults.length);
      const randomProblem = filteredResults[randomIndex];
      navigate(`/problem/${randomProblem.id}`);
    } else {
      alert("No problems found to shuffle from!");
    }
  };

  if (loading) {
    return <Loading />;
  }

  const companies = [
    { name: "Amazon", icon: ShoppingCart },
    { name: "Microsoft", icon: Airplay },
    { name: "Meta", icon: CircleStar },
    { name: "Google", icon: Aperture },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <EnhancedNavbar />

      <div className="section-wrapper pt-24 pb-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Problem Set
              </h1>
              <p className="text-slate-500 text-lg">
                Shape your coding skills with our curated list of problems. Search, filter, and solve.
              </p>
            </div>

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

          {/* Sidebar */}
          <div className="w-full lg:w-[300px] shrink-0 space-y-6">
            {/* Daily Challenge Card */}
            <div className="card-elevated overflow-hidden">
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame size={18} className="text-orange-300" />
                    <h3 className="text-white font-bold text-sm">Daily Challenge</h3>
                  </div>
                  <span className="text-xs text-white/70 bg-white/15 px-2.5 py-1 rounded-full font-medium backdrop-blur-sm">
                    Today
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white">
                  {potd ? potd.title : "Loading..."}
                </h4>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                      potd
                        ? potd.difficulty === "Easy"
                          ? "bg-emerald-400/20 text-emerald-200"
                          : potd.difficulty === "Medium"
                          ? "bg-amber-400/20 text-amber-200"
                          : "bg-red-400/20 text-red-200"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {potd ? potd.difficulty : "—"}
                  </span>
                  <span className="text-emerald-200 text-sm font-medium">+10 Points</span>
                </div>

                <Link to={`/problem/${potd ? potd.id : ""}`}>
                  <button className="w-full flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold text-sm rounded-xl px-4 py-2.5 hover:bg-slate-50 transition-all duration-200 mt-2 shadow-sm">
                    Solve now
                    <MoveRight size={16} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Trending Companies */}
            <div className="card-elevated p-5">
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={16} className="text-slate-400" />
                <h3 className="text-sm font-semibold text-slate-700">Trending Companies</h3>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {companies.map((company) => {
                  const Icon = company.icon;
                  return (
                    <button
                      key={company.name}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-200"
                    >
                      <Icon size={15} />
                      <span>{company.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contest Banner */}
            <div className="card-elevated overflow-hidden">
              <div className="relative h-40">
                <img
                  src="https://images.unsplash.com/photo-1592659762303-90081d34b277?q=80&w=1073&auto=format&fit=crop"
                  alt="Contest Background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-gradient-to-t from-black/60 to-black/20">
                  <h4 className="font-bold text-lg">Weekly Contest 298</h4>
                  <div className="flex items-center gap-1.5 mt-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
                    <Clock10 size={14} />
                    <Countdown targetTime="2026-06-18T22:30:00" />
                  </div>
                </div>
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
