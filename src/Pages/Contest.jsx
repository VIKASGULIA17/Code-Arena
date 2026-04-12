import {
  AlarmClock,
  ArrowRight,
  TrendingUp,
  TrophyIcon,
  Zap,
} from "lucide-react";
import Countdown from "../components/others/CountDown";
import { Button } from "../components/ui/button";
import { EnhancedNavbar } from "../components/Navbar";
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
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Contest = () => {
  const [contestData, setcontestData] = useState([]);

  const fetchContest = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/public/fetchAllContest`
      );
      if (response.data) {
        setcontestData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closestUpcomingContest = useMemo(() => {
    if (!contestData || contestData.length === 0) return null;
    const now = new Date();
    const futureContests = contestData.filter((contest) => {
      const startTime = new Date(contest.startTime);
      return startTime > now || contest.contestStatus === "UPCOMING" || contest.contestStatus === "ONGOING";
    });
    if (futureContests.length === 0) return null;
    futureContests.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    return futureContests[0];
  }, [contestData]);

  useEffect(() => {
    fetchContest();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <EnhancedNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {closestUpcomingContest ? (
              <>
                {/* Featured Contest Card */}
                <div className="card-elevated overflow-hidden mb-8">
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="lg:w-[280px] shrink-0 relative bg-gray-100">
                      <img
                        src="https://images.unsplash.com/photo-1757101782354-d7988295617c"
                        className="h-52 lg:h-full w-full object-cover"
                        alt="Contest Cover"
                      />
                      <span className="absolute bottom-4 left-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                        Featured Event
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 lg:p-8 space-y-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">
                            {closestUpcomingContest.contestName}
                          </h2>
                          <p className="text-sm text-gray-500 mt-0.5">Sponsored by TechGiant</p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                          <TrophyIcon size={20} className="text-indigo-600" />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 w-fit">
                        <AlarmClock size={18} className="text-indigo-600" />
                        <span className="text-lg font-bold text-gray-900">
                          <Countdown targetTime={closestUpcomingContest.startTime} />
                        </span>
                        <span className="text-sm text-gray-500">until start</span>
                      </div>

                      <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
                        {closestUpcomingContest.contestDescription}
                      </p>

                      <div className="flex items-center gap-3 pt-2">
                        <Link to="registration" state={{ contest: closestUpcomingContest }}>
                          <Button variant="outline" className="rounded-xl text-sm font-medium h-10 border-gray-200">
                            Details
                          </Button>
                        </Link>
                        <Link to="registration" state={{ contest: closestUpcomingContest }}>
                          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm font-medium h-10 shadow-sm shadow-indigo-200">
                            Register Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <ContestList contestData={contestData} />
              </>
            ) : (
              <div className="card-elevated p-12 text-center">
                <TrophyIcon size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700">No Upcoming Contests</h3>
                <p className="text-sm text-gray-500 mt-1">Check back later for new contests.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[300px] shrink-0 space-y-6">
            {/* Rating Card */}
            <div className="card-elevated p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <TrendingUp size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Your Rating</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">1,540</span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <BsTriangleFill size={8} />
                      12
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                  <p className="text-[11px] text-gray-500 font-medium">Global Rank</p>
                  <p className="text-lg font-bold text-gray-900">#14,023</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                  <p className="text-[11px] text-gray-500 font-medium">Contests</p>
                  <p className="text-lg font-bold text-gray-900">24</p>
                </div>
              </div>

              <Button variant="outline" className="w-full rounded-xl text-sm font-medium h-9 border-gray-200">
                View Full History
                <ArrowRight size={15} className="ml-1" />
              </Button>
            </div>

            {/* Top Solvers */}
            <div className="card-elevated overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-800">Top Solvers</h3>
                <span className="text-[11px] text-gray-400 font-medium">Last Contest</span>
              </div>
              <div>
                {topSolvers.map((obj, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      idx !== topSolvers.length - 1 ? "border-b border-gray-50" : ""
                    }`}
                  >
                    <span className="w-6 text-sm font-bold text-gray-400 text-center">{obj.rank}</span>
                    <img
                      src={obj.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full bg-gray-100"
                    />
                    <span className="flex-1 text-sm font-medium text-gray-700 truncate">{obj.name}</span>
                    <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                      <Zap size={13} className="fill-emerald-500 text-emerald-500" />
                      {obj.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contest;
