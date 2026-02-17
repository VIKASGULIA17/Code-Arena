

import React, { useEffect, useMemo, useState } from 'react'
import { dsaProblems } from '../data/dsaProblem'
import { Button } from '../components/ui/button'
import { Trophy, Zap, Bug, Lock, MapPin, School, BarChart3, User2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useAppContext } from '../context/AppContext'

const Donut = ({ percent = 0, color = '#4f46e5' }) => {
  const radius = 42
  const stroke = 10
  const c = 2 * Math.PI * radius
  const dash = (percent / 100) * c
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={radius} stroke="#e5e7eb" strokeWidth={stroke} fill="none" />
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c - dash}`}
        transform="rotate(-90 60 60)"
      />
      <text x="60" y="64" textAnchor="middle" className="fill-zinc-700 dark:fill-zinc-200" fontSize="18" fontWeight="700">
        {Math.round(percent)}%
      </text>
    </svg>
  )
}

const Profile = () => {
  const solved = useMemo(() => dsaProblems.filter(p => p.status), [])
  const total = dsaProblems.length
  const easy = useMemo(() => dsaProblems.filter(p => p.difficulty === 'Easy'), [])
  const medium = useMemo(() => dsaProblems.filter(p => p.difficulty === 'Medium'), [])
  const hard = useMemo(() => dsaProblems.filter(p => p.difficulty === 'Hard'), [])

  const solvedEasy = solved.filter(p => p.difficulty === 'Easy').length
  const solvedMed = solved.filter(p => p.difficulty === 'Medium').length
  const solvedHard = solved.filter(p => p.difficulty === 'Hard').length

  const solvedPercent = (solved.length / total) * 100

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const {getUserProfileData} = useAppContext();
  const {userProfile} = useAppContext();

  return (
    <div className="p-6 bg-linear-to-b from-violet-50/60 to-blue-50/60 dark:from-zinc-900 dark:to-zinc-950 min-h-screen">
        <Navbar />
      <div className="max-w-7xl mt-17 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="flex items-center gap-4">
              <img src="https://i.pravatar.cc/100?img=5" alt="avatar" className="h-16 w-16 rounded-xl object-cover" />
              <div>
                <div className="inline-flex items-center gap-2">
                  <h2 className="text-lg font-bold">{userProfile?.fullName}</h2>
                </div>
                <p className="text-xs text-indigo-600">{userProfile?.username}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">{userProfile?.bio}</p>
            <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white">Edit Profile</Button>
            <div className="mt-4 space-y-2 text-sm text-zinc-600">
              <div className="flex items-center gap-2"><BarChart3 className="h-4 w-4"/> Rank <span className="ml-auto font-semibold">#{userProfile?.overallRank}</span></div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Country <span className="ml-auto font-semibold">{userProfile?.location}</span></div>
              <div className="flex items-center gap-2"><School className="h-4 w-4"/> School <span className="ml-auto font-semibold">{userProfile?.schoolName}</span></div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
            <h3 className="font-semibold mb-4">Languages</h3>
            <div className="space-y-4">
              {[
                {name:'Python', pct:75, color:'bg-emerald-500'},
                {name:'C++', pct:45, color:'bg-sky-500'},
                {name:'JavaScript', pct:30, color:'bg-amber-500'},
              ].map((l)=> (
                <div key={l.name}>
                  <div className="flex justify-between text-sm mb-1"><span>{l.name}</span><span>{l.pct}%</span></div>
                  <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
                    <div className={`h-full ${l.color}`} style={{width:`${l.pct}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
            <h3 className="font-semibold mb-4">Community</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><User2 className="h-4 w-4 text-emerald-600"/> 15.2k <span className="text-zinc-500">Profile views</span></div>
              <div className="flex items-center gap-2"><Trophy className="h-4 w-4 text-indigo-600"/> 1,250 <span className="text-zinc-500">Reputation</span></div>
              <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-amber-500"/> 85 <span className="text-zinc-500">Discussions</span></div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">Solved Problems</h3>
                  <p className="text-xs text-zinc-500">Total solved</p>
                </div>
                <div className="text-3xl font-extrabold">{solved.length}</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 items-center">
                <Donut percent={solvedPercent} />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-emerald-500"/> Easy <span className="ml-auto">{solvedEasy} / {easy.length}</span></div>
                  <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-amber-500"/> Medium <span className="ml-auto">{solvedMed} / {medium.length}</span></div>
                  <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-rose-500"/> Hard <span className="ml-auto">{solvedHard} / {hard.length}</span></div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Contest Rating</h3>
                  <p className="text-xs text-emerald-600">Top 5%</p>
                </div>
                <div className="text-3xl font-extrabold">1,850</div>
              </div>
              <div className="mt-6 h-28 w-full rounded-lg bg-linear-to-t from-indigo-50 to-white dark:from-zinc-800 dark:to-zinc-900 relative overflow-hidden">
                <div className="absolute inset-0 flex items-end gap-2 p-3">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="flex-1 bg-indigo-500/20 rounded-t" style={{height: `${30 + (i*5)%70}%`}}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
            <h3 className="font-semibold">Submission Activity</h3>
            <MonthActivityGrid />
          </div>

          <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Badges & Achievements</h3>
              <button className="text-xs text-indigo-600">View All</button>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
              <div className="flex flex-col items-center justify-center rounded-xl p-4 bg-orange-50 text-orange-600">
                <Trophy className="h-8 w-8"/>
                <p className="mt-2 text-sm font-medium">Winner 2023</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl p-4 bg-blue-50 text-blue-600">
                <Zap className="h-8 w-8"/>
                <p className="mt-2 text-sm font-medium">100 Streak</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl p-4 bg-violet-50 text-violet-600">
                <BarChart3 className="h-8 w-8"/>
                <p className="mt-2 text-sm font-medium">Problem Solver</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl p-4 bg-emerald-50 text-emerald-600">
                <Bug className="h-8 w-8"/>
                <p className="mt-2 text-sm font-medium">Bug Hunter</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl p-4 bg-zinc-100 text-zinc-400">
                <Lock className="h-8 w-8"/>
                <p className="mt-2 text-sm font-medium">Locked</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-6">
            <h3 className="font-semibold mb-4">Recent Submissions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-zinc-600">
                  <tr>
                    <th className="py-2">Problem</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Language</th>
                    <th className="py-2">Time</th>
                    <th className="py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {solved.slice(0,10).map((p,idx) => (
                    <tr key={p.id} className="border-t border-zinc-200 dark:border-zinc-800">
                      <td className="py-3">{p.title}</td>
                      <td className="py-3"><span className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-700">Accepted</span></td>
                      <td className="py-3">Python 3</td>
                      <td className="py-3">{10+idx*3}ms</td>
                      <td className="py-3">{idx === 0 ? '2 hours ago' : `${idx} days ago`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const daysInMonth = (year, monthIndex) => new Date(year, monthIndex + 1, 0).getDate()

const MonthActivityGrid = () => {
  const year = new Date().getFullYear()
  return (
    <div className="mt-4 overflow-x-auto">
      <div className="flex items-start gap-8 min-w-max pr-2">
        {monthNames.map((m, idx) => {
          const dim = daysInMonth(year, idx)
          const cols = Math.ceil(dim / 7)
          return (
            <div key={m} className="flex flex-col items-center">
              <div
                className="grid gap-1"
                style={{
                  gridAutoFlow: 'column',
                  gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                }}
              >
                {[...Array(dim)].map((_, d) => (
                  <div
                    key={d}
                    className="h-2.5 w-2.5 rounded-[3px]"
                    style={{ backgroundColor: `hsl(142, 70%, ${80 - (d % 5) * 10}%)` }}
                    title={`${m} ${d + 1}, ${year}`}
                  />
                ))}
              </div>
              <span className="mt-2 text-[11px] text-zinc-500">{m}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Profile