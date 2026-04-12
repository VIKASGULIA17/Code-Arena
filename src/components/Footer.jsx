import { Code2, Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Platform: [
      { label: "Problem Set", to: "/problem" },
      { label: "Contests", to: "/contest" },
      { label: "Algo Visualizer", to: "/algovisualizer" },
      { label: "DSA Revision", to: "/revision" },
    ],
    Resources: [
      { label: "Documentation", to: "/" },
      { label: "Blog", to: "/" },
      { label: "Help Center", to: "/" },
    ],
  };

  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 py-14">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Code2 size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg text-white">Code Arena</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              AI-powered coding platform for practice, contests, and interview preparation.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Github, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter / Connect */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-500 mb-4">
              Get weekly DSA tips and contest updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
              <button className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors shadow-sm">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {currentYear} Code Arena. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built with React & TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
