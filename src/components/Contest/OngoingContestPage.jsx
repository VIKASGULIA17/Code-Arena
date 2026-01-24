import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../Navbar'
import ProblemDetails from '../problem/ProblemDetails'
import { dsaProblems } from '../../data/dsaProblem'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom'


const OngoingContestPage = () => {

    const { contestName } = useParams()

    const contest= contestName.split("||")

    console.log(contestName);

    const ContestProblems = useMemo(() => {
        const getRandom = (arr) => {
            return arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;

        }
        const easyProb = dsaProblems.filter((p) => p.difficulty === "Easy");
        const MediumProb = dsaProblems.filter((p) =>
            p.difficulty === "Medium"
        );
        const HardProb = dsaProblems.filter((p) =>
            p.difficulty === "Hard"
        );


        //getting 1 problem each 

        const problem1 = getRandom(easyProb);
        const problem2 = getRandom(MediumProb);
        const problem3 = getRandom(HardProb);

        const result = [problem1, problem2, problem3].filter(Boolean).map((problem, idx) => ({
            ...problem,
            label: String.fromCharCode(65 + idx),
            score: (idx === 0 ? 2 : (idx === 1 ? 3 : 5)),
            status: false
        }))
        return result
    }, []);


    const [activeIndex, setactiveIndex] = useState(0)



    if (!ContestProblems.length) {
        return <div>Contest problem loading</div>
    }
    const activeProblem = ContestProblems[activeIndex];

    useEffect(() => {
      const activeProblem = ContestProblems[activeIndex];
    }, [activeIndex])
    


    return (
        <div className='flex'>
            {/* <Navbar /> */}
            <div className='w-80 border h-screen'>
                {contest.map((obj,idx)=>{
                    console.log(obj)

                   return  <h1 key={idx} className={` ${obj===" Virtual Contest"? 'text-black font-medium  ':'text-brand-gradient '} text-center  pt-6 px-4 text-3xl text-wrap`}>{obj || "Ongoing Contest"}</h1>
                })}

                <h2 className='text-gray-600 text-center font-medium px-2 pt-4 my-6 border-t-2'>
                    Contest Problems
                </h2>
                <div className='flex flex-col px-3 gap-2 '>


                    {ContestProblems.map((obj, idx) => {
                        const isActive = idx === activeIndex

                        return <Button
                            key={idx}
                            onClick={() => setactiveIndex(idx)}
                            className={`border-2 text-start ${isActive ? '  bg-brand-gradient  ' : ' bg-white text-black'} ${obj.status ? 'bg-green-200 text-green-700 ' : ' '} flex-wrap text-wrap h-auto`}
                        >
                            <h1 className='text-start text-wrap flex gap-2'>
                                {obj.label}
                                <span>
                                    {obj.title}
                                </span>

                                <span className={` ${isActive?'text-green-200' :' text-green-400 '} font-bold`}>{obj.score}</span>
                            </h1>
                        </Button>
                    })}
                </div>
            </div>
            <div className='w-full'>

                <ProblemDetails isContest={true}  problemId={activeProblem.id} />
            </div>
        </div>
    )
}

export default OngoingContestPage