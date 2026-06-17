import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaDiscord,
  FaTwitch,
  FaFacebook,
  FaApple,
} from "react-icons/fa";
import { EnhancedNavbar } from "../../components/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import AuthImage from "../../assets/auth-panel.png";

const Signup = () => {
  const navigate = useNavigate();
  const [capVal, setCapVal] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const validateData = yup.object({
    username: yup.string().required("**Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("**Email is required"),
    password: yup
      .string()
      .min(6, "Min 6 characters")
      .required("**Password is required"),
  });

  const saveToSpringboot = async (values) => {
    const res = await axios.post(`${BACKEND_URL}/public/register`, values);
    return res.data;
  };

  const handleSubmit = async (values, helper) => {
    try {
      const result = await saveToSpringboot(values);
      if (result.status === 1) {
        toast.success(`Form submitted`);
        navigate("/login");
      } else {
        throw new Error();
      }
    } catch (e) {
      toast.error(`Form not submitted`);
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
        <div className="bg-white dark:bg-slate-800 w-full max-w-5xl rounded-2xl shadow-xl shadow-gray-200/60 dark:shadow-black/40 overflow-hidden flex flex-col lg:flex-row border border-gray-100 dark:border-slate-700 relative">
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
                  Join the Arena.<br />Prove Your Skills.
                </h2>
                <p className="text-indigo-200/80 text-sm leading-relaxed max-w-xs">
                  Create your account in seconds and start solving problems, competing in live contests, and climbing the leaderboard.
                </p>

                {/* Feature list */}
                <div className="flex flex-col gap-2.5 mt-6">
                  {[
                    "Access 2,000+ curated problems",
                    "Compete in weekly live contests",
                    "Track your progress & stats",
                  ].map(f => (
                    <div key={f} className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center flex-shrink-0">
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#a5b4fc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-indigo-100/80 text-xs">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: decorative pill */}
              <div className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/80 text-xs font-medium">Free forever — no credit card needed</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 bg-white dark:bg-slate-800 flex flex-col justify-center">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-1">Create an account</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Start your coding journey today</p>
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
                <span className="bg-white dark:bg-slate-800 px-3 text-slate-400 dark:text-slate-500 font-medium">Or sign up with email</span>
              </div>
            </div>

            <Formik
              initialValues={{ username: "", email: "", password: "" }}
              validationSchema={validateData}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 pl-1">Username</label>
                    <Field
                      name="username"
                      type="text"
                      placeholder="Choose a username"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm text-slate-800 dark:text-slate-200"
                    />
                    <ErrorMessage component="p" name="username" className="text-xs text-red-500 pl-1" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 pl-1">Email</label>
                    <Field
                      name="email"
                      type="text"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm text-slate-800 dark:text-slate-200"
                    />
                    <ErrorMessage component="p" name="email" className="text-xs text-red-500 pl-1" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 pl-1">Password</label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Min 6 characters"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm text-slate-800 dark:text-slate-200"
                    />
                    <ErrorMessage component="p" name="password" className="text-xs text-red-500 pl-1" />
                  </div>

                  {/* <div className="flex justify-center lg:justify-start pt-1 overflow-hidden">
                    <div className="scale-90 sm:scale-100 origin-center lg:origin-top-left">
                      <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={(val) => setCapVal(val)}
                      />
                    </div>
                  </div> */}

                  <p className="text-xs text-slate-500 dark:text-slate-400 px-1 leading-relaxed">
                    By signing up, you agree with our{" "}
                    <span className="text-slate-800 dark:text-slate-200 font-semibold hover:underline cursor-pointer">ToS</span>,{" "}
                    <span className="text-slate-800 dark:text-slate-200 font-semibold hover:underline cursor-pointer">Community Guidelines</span>{" "}
                    and{" "}
                    <span className="text-slate-800 dark:text-slate-200 font-semibold hover:underline cursor-pointer">Privacy Policy</span>
                  </p>

                  <button
                    className={`w-full mt-1 font-semibold py-2.5 rounded-xl transition-all duration-200 text-sm ${
                      capVal && !isSubmitting
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200/50 dark:shadow-indigo-900/30 cursor-pointer hover:shadow-md"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                    }`}
                    disabled={!capVal || isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Creating account..." : "Sign Up"}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;