import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {dsaProblems} from '../../data/dsaProblem'

const ProblemDetails = () => {
  const { id } = useParams();

  const problem = dsaProblems.find((p) => p.id === parseInt(id));

  if (!problem) {
    return <div className="p-10 text-center">Problem not found!</div>;
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <Link to="/problem" className="flex items-center gap-2 text-blue-600 mb-6">
        <ArrowLeft size={18} /> Back to List
      </Link>
      
      <h1 className="text-4xl font-bold mb-4">{problem.id}. {problem.title}</h1>
      
      <div className="flex gap-3 mb-6">
        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
          problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
          problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
        }`}>
          {problem.difficulty}
        </span>
        {problem.tags.map((tag, i) => (
          <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[300px]">
        <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
        <p className="text-gray-600 leading-relaxed">
          This is where the detailed content for <strong>{problem.title}</strong> would go. 
          Since you are using random pages, you can generate a template here that explains 
          constraints, examples, and edge cases.
        </p>
      </div>
    </div>
  );
};

export default ProblemDetails;