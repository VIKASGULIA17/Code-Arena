import React, { useState } from "react";
import {
  FaGoogle,
  FaDiscord,
  FaTwitch,
  FaFacebook,
  FaApple,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { EnhancedNavbar } from "../../components/Navbar";
import * as yup from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";
import AuthImage from "../../assets/auth-panel.png";

const Login = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [isHighlightOpen, setisHighlightOpen] = useState(false);
  const [bannedUser, setbannedUser] = useState("");
  const { setjwtToken, setisJwtExist, setuserDetails, setisLoggedIn, getUserData } = useAppContext();

  const validateData = yup.object({
    username: yup.string().required("**Username is required"),
    password: yup
      .string()
      .min(6, "Min 6 characters")
      .required("**Password is required"),
  });

  const checkToSpringBackend = async (values) => {
    const result = await axios.post(`${BACKEND_URL}/public/login`, values);
    return result.data;
  };

  const handleSubmit = async (values, helper) => {
    try {
      const res = await checkToSpringBackend(values);
      if (res.status === 1) {
        localStorage.setItem("jwtToken", res.jwtToken);
        setisJwtExist(true);
        setisLoggedIn(true);
        setjwtToken(res.jwtToken);
        getUserData();
        toast.success(`User logged in..`);
        navigate("/");
      } else if (res.status == -1) {
        setisHighlightOpen(true);
        setbannedUser(values.username);
      } else {
        throw new Error();
      }
    } catch (e) {
      toast.error("User failed to login");
    } finally {
      helper.resetForm();
    }
  };

  const socialButtons = [
    { icon: FaGoogle, className: "border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-green-500" },
    { icon: FaDiscord, className: "bg-[#5865F2] text-white hover:opacity-90" },
    { icon: FaTwitch, className: "bg-[#9146FF] text-white hover:opacity-90" },
    { icon: FaFacebook, className: "bg-[#1976D2] text-white hover:opacity-90" },
    { icon: FaApple, className: "bg-slate-900 dark:bg-slate-700 text-white hover:opacity-90" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#fafafa] dark:bg-[#0b1120] flex flex-col">
      <EnhancedNavbar />

      <div className="flex-1 flex items-center justify-center pt-24 pb-10 px-4 sm:px-6">
        <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-2xl shadow-xl shadow-gray-200/60 dark:shadow-black/40 overflow-hidden flex flex-col lg:flex-row border border-gray-100 dark:border-slate-700">
          {/* Left: Image Panel */}
          <div className="w-full lg:w-1/2 relative overflow-hidden" style={{ minHeight: "280px" }}>
            {/* Background image */}
            <img
              src={AuthImage}
              alt="Code Arena Visual"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-slate-900/70 to-purple-950/80" />

            {/* Content overlay */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-10" style={{ minHeight: "280px" }}>
              {/* Top: brand */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-900/50">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <span className="text-white font-bold text-lg tracking-tight">Code Arena</span>
              </div>

              {/* Middle: headline */}
              <div className="hidden lg:block">
                <h2 className="text-3xl font-extrabold text-white leading-tight mb-3">
                  Master the Art<br />of Algorithms
                </h2>
                <p className="text-indigo-200/80 text-sm leading-relaxed max-w-xs">
                  Compete, solve, and grow with thousands of curated problems across every difficulty level.
                </p>

                {/* Stats row */}
                <div className="flex gap-6 mt-6">
                  {[{ val: "2K+", label: "Problems" }, { val: "50K+", label: "Users" }, { val: "100+", label: "Contests" }].map(s => (
                    <div key={s.label}>
                      <p className="text-white font-bold text-xl">{s.val}</p>
                      <p className="text-indigo-300/70 text-xs mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: decorative pill */}
              <div className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/80 text-xs font-medium">Live contests running now</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-white dark:bg-slate-800">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">Sign In</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Enter your credentials to continue</p>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-wrap justify-start gap-2.5 mb-6">
              {socialButtons.map(({ icon: Icon, className }, i) => (
                <button key={i} className={`p-2.5 rounded-xl transition-all duration-200 ${className}`}>
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white dark:bg-slate-800 px-3 text-slate-400 dark:text-slate-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Form */}
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validateData}
              onSubmit={handleSubmit}
            >
              {({ values, isSubmitting }) => {
                const isFilled = values.username.length > 0 && values.password.length > 0;
                return (
                  <Form className="flex flex-col gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500 dark:text-slate-400 pl-1">Username</label>
                      <Field
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm text-slate-800 dark:text-slate-200"
                      />
                      <ErrorMessage component="p" name="username" className="text-xs text-red-500 pl-1" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500 dark:text-slate-400 pl-1">Password</label>
                      <Field
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm text-slate-800 dark:text-slate-200"
                      />
                      <ErrorMessage component="p" name="password" className="text-xs text-red-500 pl-1" />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full mt-1 font-semibold py-2.5 rounded-xl transition-all duration-200 text-sm flex justify-center items-center gap-2
                        ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}
                        ${isFilled
                          ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200/50 dark:shadow-indigo-900/30 hover:bg-indigo-700 hover:shadow-md"
                          : "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-400 dark:text-indigo-500"
                        }
                      `}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        "Log In"
                      )}
                    </button>
                    {isHighlightOpen && (
                      <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl px-4 py-2.5 text-center">
                        <p className="text-red-600 dark:text-red-400 text-xs font-semibold">
                          {bannedUser} is banned from this platform
                        </p>
                      </div>
                    )}
                  </Form>
                );
              }}
            </Formik>

            <div className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                Create One
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;