import React, { useEffect, useState } from "react";
import { Code2, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [MenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setuser] = useState(null);
  const { isJwtExist, setisJwtExist, setjwtToken, isAdmin, userDetails,setisLoggedIn,getUserData } =
    useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navBarContent = [
    { label: "Home", path: "/" },
    { label: "Problem Arena", path: "/problem" },
    { label: "Contest", path: "/Contest" },
    { label: "algo visualizer", path: "/algovisualizer" },
    { label: "Interview", path: "/interview" },
    { label: "Profile", path: "/profile" },
    { label: "Admin Panel", path: "/admin" },
  ];

  const location = useLocation();

  function isActive(path) {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  }

  function clearJwtToken() {
    localStorage.removeItem("jwtToken");
    setisJwtExist(false);
    setisLoggedIn(false);
    setjwtToken(null);
  }

  const NAVBAR_HEIGHT = "64px";

  return (
    <>
      {/* 1. Main Navbar Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ height: NAVBAR_HEIGHT }}
        className="w-full fixed top-0 z-50 text-sm bg-white/80 flex justify-around border-b border-border/50 border-grey-100 backdrop-blur-xl duration-200"
      >
        <div className="flex gap-10 py-4 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg">
              <Code2 className="w-10 h-10 px-2 py-2 text-white" />
            </div>
            <h1 className="font-bold text-center text-xl bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Code Arena
            </h1>
          </div>
          {/* Desktop Links */}
          <div className="hidden lg:flex gap-4">
            {navBarContent.map((obj, idx) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={idx}
                className={`flex cursor-pointer ${obj.label!="Admin Panel" || (obj.label == "Admin Panel" && (userDetails?.roles || []).includes("ADMIN")) ? "" : "hidden"} capitalize rounded-sm text-white`}
              >
                <Link to={obj.path}>
                  <p
                    className={`rounded-sm px-3 py-2 ${
                      isActive(obj.path)
                        ? "bg-blue-400 text-white"
                        : "text-black hover:bg-blue-400 duration-200 hover:text-white"
                    }`}
                  >
                    {obj.label}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/*  Mobile Icons */}
        <div className="hidden lg:flex py-4">
          {user ? (
            <div className="">
              <img
                src="https://i.pravatar.cc"
                alt=""
                className="w-8 h-8 rounded-full"
              />
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">
                <Button
                  className={`${isJwtExist ? "hidden" : "block"} border bg-black text-white`}
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  className={`${isJwtExist ? "hidden" : "block"} border bg-white border-black text-black`}
                >
                  Signup
                </Button>
              </Link>
              <Button
                onClick={clearJwtToken}
                className={`${isJwtExist ? "block" : "hidden"} border bg-white border-black text-black hover:bg-black hover:text-white`}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
        <div
          className={` ${MenuOpen ? "hidden" : "flex"} items-center my-4 px-2 lg:hidden rounded-lg hover:text-white`}
        >
          <Menu
            onClick={() => {
              setMenuOpen(true);
            }}
            className="cursor-pointer hover:text-blue-400"
          />
        </div>
        <div
          className={` ${MenuOpen ? "flex" : "hidden"} items-center my-4 px-2 rounded-lg hover:text-white`}
        >
          <X
            onClick={() => {
              setMenuOpen(false);
            }}
            className="cursor-pointer hover:text-blue-400"
          />
        </div>
      </motion.div>

      {/* 3. Mobile Menu Content */}
      <div
        style={{ paddingTop: NAVBAR_HEIGHT }}
        className={` 
          w-screen fixed top-0 left-0 h-auto lg:hidden bg-white z-40 
          transform transition-transform duration-500 ease-in-out
          ${MenuOpen ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="w-full pb-4">
          {navBarContent.map((obj, idx) => (
            <div
              key={idx}
              className={`w-full flex py-1 cursor-pointer capitalize text-white ${obj.adminOnly && !isAdmin ? "hidden" : ""}`}
            >
              <Link
                to={obj.path}
                className="w-full mx-10"
                onClick={() => setMenuOpen(false)}
              >
                <p
                  className={`rounded-md px-3 py-2 ${
                    isActive(obj.path)
                      ? "bg-blue-400 text-white"
                      : "text-black hover:bg-blue-400 duration-200 hover:text-white"
                  }`}
                >
                  {obj.label}
                </p>
              </Link>
            </div>
          ))}
          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-2 border-t py-3 border-gray-500 mx-10 mt-2">
              <Link to="/login">
                <h2
                  className={`hover:bg-blue-400 duration-200 hover:text-white px-3 py-2 rounded-lg cursor-pointer text-center border bg-black text-white ${isJwtExist ? "hidden" : "block"}`}
                >
                  Login
                </h2>
              </Link>
              <Link to="/signup">
                <h2
                  className={`bg-blue-400 text-white text-center px-3 py-2 rounded-lg cursor-pointer ${isJwtExist ? "hidden" : "block"}`}
                >
                  Sign up
                </h2>
              </Link>
              <Button
                onClick={clearJwtToken}
                className={`${isJwtExist ? "block" : "hidden"} border bg-white border-black text-black hover:bg-black hover:text-white`}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
