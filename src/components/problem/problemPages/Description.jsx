import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"; 
import { ArrowLeft, Clock, Code, Copy, Cpu, FileQuestion, TrendingUp } from "lucide-react";

const Description = ({ description }) => {

  const isAvailable= (description!==undefined)&& (description!=="");
  // console.log(description)

  if(!isAvailable){

    
    return <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 p-8 m-4 transition-all">
      
      <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mb-5 text-gray-400 border border-gray-100 relative">
        <FileQuestion size={32} />
        <div className="absolute top-0 right-0 w-3 h-3 bg-red-400 rounded-full border-2 border-white"></div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Description Not Yet Available
      </h2>
      <p className="text-gray-500 max-w-sm text-center mb-6 text-sm leading-relaxed">
        We haven't published the official Description for this problem yet or there might be some Network. Check back later or try logout and logging again!
      </p>

      <div className="flex items-center gap-3 mt-2">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
        
        <button 
            onClick={() => setcurrentTopBar("Description")}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
          >
            <Code size={16} />
            Write Code
          </button>
      </div>
      
    </div>

}
  return (
    <div className="mt-10 text-gray-700 mx-3 text-justify mb-10 font-sans 
        [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-800 [&>h3]:mt-8 [&>h3]:mb-4
        [&>p]:mb-4 [&>p]:leading-relaxed
        [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6
        [&>li]:mb-2 [&>li]:marker:text-gray-400
        [&>pre]:bg-gray-100 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:mb-6 [&>pre]:border [&>pre]:border-gray-200
        [&_code]:bg-gray-100 [&_code]:text-gray-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:font-mono [&_code]:text-sm
        [&>strong]:font-semibold [&>strong]:text-gray-900
      ">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {description}
        </ReactMarkdown>
    </div>
  );
};

export default Description;