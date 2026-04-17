import React, { useEffect, useMemo, useState } from 'react'
import {EnhancedNavbar} from '../Navbar'
import ProblemDetails from '../problem/ProblemDetails'
import { dsaProblems } from '../../data/dsaProblem'
import { Button } from '../ui/button'
import { useParams, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'



const OngoingContestPage = () => {
    const { contestName } = useParams()
    const location = useLocation()
    const { allProblem } = useAppContext()
    
    const contestParts = contestName.split("||")
    const contestData = location.state?.contest || null;

    const ContestProblems = useMemo(() => {
        const sourceData = allProblem && allProblem.length > 0 ? allProblem : dsaProblems;
        let selectedProblems = [];
        
        // If the admin assigned specific problems to this contest, use them
        if (contestData && contestData.problemIds && contestData.problemIds.length > 0) {
             selectedProblems = contestData.problemIds.map(id => sourceData.find(p => p.id === id)).filter(Boolean);
        } else {
             // Fallback logic if no contest explicitly assigned problems
             const getRandom = (arr) => {
                 return arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;
             }
             const easyProb = sourceData.filter((p) => p.difficulty === "Easy");
             const MediumProb = sourceData.filter((p) => p.difficulty === "Medium");
             const HardProb = sourceData.filter((p) => p.difficulty === "Hard");
     
             const problem1 = getRandom(easyProb);
             const problem2 = getRandom(MediumProb);
             const problem3 = getRandom(HardProb);
             selectedProblems = [problem1, problem2, problem3].filter(Boolean);
        }

        return selectedProblems.map((problem, idx) => ({
            ...problem,
            label: String.fromCharCode(65 + idx),
            score: (idx === 0 ? 2 : (idx === 1 ? 3 : 5)),
            status: false
        }))
    }, [allProblem, contestData]);


    const [activeIndex, setactiveIndex] = useState(0)



    if (!ContestProblems.length) {
        return <div>Contest problem loading</div>
    }
    const activeProblem = ContestProblems[activeIndex];

    useEffect(() => {
        const activeProblem = ContestProblems[activeIndex];
    }, [activeIndex])



    return (
        <div className='flex flex-col lg:flex-row h-auto'>
            {/* <Navbar /> */}
            <div className='lg:w-80 lg:min-h-screen border-r border-slate-200 dark:border-slate-800 h-auto w-full bg-white dark:bg-[#0b1120]'>
                <h1 className="text-brand-gradient text-center pt-8 px-4 text-2xl font-bold text-wrap line-clamp-2">
                    {contestData?.contestName || contestParts[0] || "Ongoing Contest"}
                </h1>
                
                <h2 className='text-gray-500 dark:text-slate-400 text-center font-medium px-2 pt-6 pb-2 my-2 border-b border-slate-200 dark:border-slate-800 text-sm uppercase tracking-wider'>
                    Contest Problems
                </h2>
                <div className='flex flex-col px-3 gap-2 '>


                    {ContestProblems.map((obj, idx) => {
                        const isActive = idx === activeIndex

                        return (
                            <Button
                                key={idx}
                                onClick={() => setactiveIndex(idx)}
                                variant="ghost"
                                className={`w-full justify-start text-left h-auto py-3 px-4 border ${
                                    isActive 
                                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-600 dark:border-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-md' 
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                } rounded-xl mb-1 transition-all duration-200`}
                            >
                                <div className='flex items-start gap-3 w-full'>
                                    <span className={`font-bold ${isActive ? 'text-indigo-200' : 'text-slate-400 dark:text-slate-500'}`}>
                                        {obj.label}.
                                    </span>
                                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                                         <span className="font-medium whitespace-break-spaces leading-tight">{obj.title}</span>
                                         <span className={`text-[10px] uppercase tracking-wider font-bold ${isActive ? 'text-indigo-200' : 'text-indigo-500 dark:text-indigo-400'}`}>
                                             {obj.score} Points
                                         </span>
                                    </div>
                                </div>
                            </Button>
                        )
                    })}
                </div>
            </div>
            <div className='w-full'>

                <ProblemDetails isContest={true} problemId={activeProblem.id} />
            </div>
        </div>
    )
}

export default OngoingContestPage