import React from "react";
// import ReactMarkdown from "react-markdown";
// import rehypeRaw from "rehype-raw"; 

const Description = ({ description }) => {
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