import React, { useState, useEffect } from 'react';
import { EnhancedNavbar } from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useParams, Link } from "react-router-dom";
import { Trophy, Code2, MoveLeft, Medal, Star } from "lucide-react";
import axios from "axios";

const ContestRankings = () => {
    const { slug } = useParams();
    const [loading, setLoading] = useState(false); 
    
    // Mock Data for Rankings
    const mockRankings = [
        { rank: 1, username: "AlexCodeMaster", score: 15, time: "0h 42m", lang: "C++", status: "Accepted" },
        { rank: 2, username: "TechNinja_99", score: 15, time: "0h 48m", lang: "Python", status: "Accepted" },
        { rank: 3, username: "BinaryBeast", score: 14, time: "1h 05m", lang: "Java", status: "Accepted" },
        { rank: 4, username: "SystemArchitect", score: 12, time: "1h 12m", lang: "JavaScript", status: "Accepted" },
        { rank: 5, username: "shino_dev", score: 10, time: "1h 30m", lang: "C++", status: "Accepted" },
        { rank: 6, username: "algo_expert", score: 8, time: "0h 25m", lang: "Python", status: "Time Limit Exceeded" },
        { rank: 7, username: "code_warrior", score: 5, time: "1h 50m", lang: "Java", status: "Accepted" },
        { rank: 8, username: "bug_hunter", score: 5, time: "1h 55m", lang: "JavaScript", status: "Accepted" },
    ];

    // Simulated API call setup for when the user adds the actual endpoint
    /*
    useEffect(() => {
        const fetchRankings = async () => {
             try {
                const res = await axios.get(`http://localhost:8080/public/getContestRankings/${slug}`);
                // setRankings(res.data);
             } catch(err) { console.error(err) }
        }
    }, [slug])
    */

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#0b1120]">
            <EnhancedNavbar />
            <div className="max-w-6xl mx-auto px-4 pt-28 pb-16 min-h-[80vh]">
                <div className="mb-6">
                    <Link to="/contest" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <MoveLeft size={16} /> Back to Contests
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                           <Trophy className="text-yellow-500 h-8 w-8" />
                           <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-50">Global Leaderboard</h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400">Official rankings for {slug.includes("||") ? slug.split("||")[0] : slug}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
                   <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                          <thead>
                              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                  <th className="py-4 px-6 text-center w-24">Rank</th>
                                  <th className="py-4 px-6">Participant</th>
                                  <th className="py-4 px-6">Score</th>
                                  <th className="py-4 px-6">Finish Time</th>
                                  <th className="py-4 px-6">Language</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
                              {mockRankings.map((user, idx) => (
                                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                                      <td className="py-4 px-6 text-center font-medium">
                                          {user.rank === 1 && <Medal className="inline-block text-yellow-500 mr-1" size={20}/>}
                                          {user.rank === 2 && <Medal className="inline-block text-slate-400 mr-1" size={20}/>}
                                          {user.rank === 3 && <Medal className="inline-block text-amber-600 mr-1" size={20}/>}
                                          {user.rank > 3 && <span className="text-slate-500 dark:text-slate-400 font-mono">#{user.rank}</span>}
                                      </td>
                                      <td className="py-4 px-6">
                                          <Link to={`/profile/${user.username}`} className="font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                              {user.username}
                                          </Link>
                                      </td>
                                      <td className="py-4 px-6">
                                          <div className="flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400">
                                              <Star size={14} className="fill-current"/> {user.score}
                                          </div>
                                      </td>
                                      <td className="py-4 px-6 text-slate-600 dark:text-slate-400 font-mono text-sm">
                                          {user.time}
                                      </td>
                                      <td className="py-4 px-6">
                                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                              <Code2 size={12} /> {user.lang}
                                          </span>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                   </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default ContestRankings;
