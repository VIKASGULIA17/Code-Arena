import { CodeXml, UsersRound, Github, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="flex flex-col w-full bg-gray-800 text-white/80 px-6 lg:px-0">
      <div className="flex flex-col lg:flex-row w-full gap-10 lg:gap-0 justify-around py-16">
        {/* top */}
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <CodeXml className="bg-linear-to-r from-blue-600 via-purple-500 to-pink-500 text-white px-3 w-13 h-13 rounded-xl" />
              <h1 className="bg-linear-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text font-bold text-xl capitalize">
                CodeArena
              </h1>
            </div>
            <div>
              <p>
                AI-powered coding platform for practice, contests, <br /> and
                interviews.
              </p>
            </div>
          </div>

          <div className="">
            {/* 2nd */}
            <h3 className="py-1.5 text-white font-bold">Platform</h3>
            <Link to="/problem">
              <p className="py-1.5 hover:underline">Problem Set</p>
            </Link>
            <Link to="/contest">
              <p className="py-1.5 hover:underline">Contests</p>
            </Link>
            <Link to="/interview">
              <p className="py-1.5 hover:underline">Mock Interview</p>
            </Link>
          </div>
        </div>
        <div>
          {/* 3rd */}

          <h3 className="py-1.5 text-white font-bold">Community</h3>
          <Link to="/">
            <p className="py-1.5 hover:underline">Discussion</p>
          </Link>
          <Link to="/">
            <p className="py-1.5 hover:underline">Blog</p>
          </Link>
          <Link to="/">
            <p className="py-1.5 hover:underline">Help Center</p>
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {/* 4th */}
          <h3 className="py-1.5 text-white font-bold">Connect</h3>
          <div className="flex gap-2">
            <Link>
            <Github className="cursor-pointer "/>
            </Link>
            <Link>
            <Linkedin className="cursor-pointer "/>
            </Link>
            <Link>
            <Instagram className="cursor-pointer "/>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 lg:items-start lg:flex-row justify-around border-t text-md border-white/40 py-10">{/* bottom  */}
        <div className="">
          <p>© 2024 CodeArena. All rights reserved.</p>
        </div>
        <div>
          Built with React, TypeScript, and TailwindCSS
        </div>
      </div>
    </div>
  );
};

export default Footer;
