import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Lightbulb,
  MessagesSquare,
  History
} from "lucide-react";
import { problemInfo } from "../../data/dsaProblem";
import { Button } from "../ui/button";
import CodeEditor from "./CodeEditor";
import Description from "./problemPages/Description";
import Solution from "./problemPages/Solution";
import Discussion from "./problemPages/Discussion";
import NotFound from "../../Pages/NotFound";
import Submission from "./problemPages/Submission";
import axios from "axios";
import Loading from "../../components/others/Loading"


const ProblemDetails = ({ isContest, problemId }) => {

  const { id: paramId } = useParams();

  const id = isContest ? problemId : paramId;


  const problem = problemInfo[id]; //to get problem info(desciption on the left)
  const [currentTopBar, setcurrentTopBar] = useState("Description"); //to manage between description ,solution and discussion 

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    setcurrentTopBar("Description");
  }, [id]);

  if (!problem) {
    return <NotFound />
  }


  const [problemDetailsInfo, setProblemDetailsInfo] = useState({})
  const [loading, setloading] = useState(true)

  const fetchProblemDetail = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/public/fetchProblemDetail/${id}`);
      setloading(false);
      //  console.log(response.data.data)
      setProblemDetailsInfo(response.data.data)

    } catch (error) {
      setloading(false)
      console.error("Failed to fetch submissions:", error);
      setProblemDetailsInfo([]);
    }
  }

  useEffect(() => {
    fetchProblemDetail();
  }, [id]);

  

  if(loading){
    return <Loading />
  }

  if(!problemDetailsInfo){
    return <NotFound />
  }

  const description = problemDetailsInfo?.description;
  const editorial = problemDetailsInfo?.editorial;
  const codeImplementation = problemDetailsInfo?.solutions;
  const codeTemplates = problemDetailsInfo?.templates;

  console.log(codeTemplates)

  const TabButton = ({ label, icon: Icon }) => { //its for description ,solution and discussion (gradient underline)
    const isActive = currentTopBar === label;
    return (
      <Button
        variant="ghost"
        onClick={() => setcurrentTopBar(label)}
        className={`relative rounded-none h-10 px-4 font-semibold hover:bg-transparent transition-all gap-2 ${isActive ? "text-pink-500" : "text-gray-500"
          }`}
      >
        <Icon size={16} />
        <h1 >{label}</h1>
        {/* Gradient Underline */}
        {isActive && (
          <div className="absolute bottom-0 left-0 w-full h-0.5  bg-linear-to-r from-blue-600 via-purple-600 to-pink-600" />
        )}
      </Button>
    );
  };

  return (
    <div className="flex h-auto lg:h-screen flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 px-3 md:px-5 lg:h-screen lg:overflow-y-auto">
        {/* left  */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-2 min-h-10 sticky top-0 z-10">
          {isContest ?
            <TabButton
              label="Description"
              icon={Lightbulb}
            />
            :
            <div className="flex items-center gap-1 overflow-x-auto">
              <TabButton
                label="Description"
                icon={FileText}
              />

              <TabButton
                label="Solution"
                icon={Lightbulb}
              />

              <TabButton
                label="Discussion"
                icon={MessagesSquare}
              />

              <TabButton label="Submissions" icon={History} />
            </div>
          }
        </div>

        {currentTopBar === "Description" ? (
          <Description description={description} />
        ) : currentTopBar === "Solution" ? (
          <Solution editorial={editorial} implementation={codeImplementation} />
          // <Solution editorial={""} implementation={""} setcurrentTopBar={setcurrentTopBar} />
        ) : currentTopBar === "Discussion" ? (
          <Discussion id={id} />
        ) : (
          <Submission id={id} />
        )}
      </div>

      <div className="w-full lg:w-1/2 md:border-l border-t md:border-t-0 h-auto md:h-screen md:overflow-y-auto">
        {/* right  */}
        <CodeEditor codeTemplates={codeTemplates} problemId={id} setcurrentTopBar={setcurrentTopBar} isContest={isContest} />
      </div>
    </div>
  );
};

export default ProblemDetails;
