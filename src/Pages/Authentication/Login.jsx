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
import Image from "../../assets/authentication.gif";

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
    { icon: FaGoogle, className: "border border-slate-200 hover:bg-slate-50 text-green-500" },
    { icon: FaDiscord, className: "bg-[#5865F2] text-white hover:opacity-90" },
    { icon: FaTwitch, className: "bg-[#9146FF] text-white hover:opacity-90" },
    { icon: FaFacebook, className: "bg-[#1976D2] text-white hover:opacity-90" },
    { icon: FaApple, className: "bg-slate-900 text-white hover:opacity-90" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#fafafa] flex flex-col">
      <EnhancedNavbar />

      <div className="flex-1 flex items-center justify-center pt-24 pb-10 px-4 sm:px-6">
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl shadow-gray-200/60 overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2 h-48 lg:h-auto relative bg-gray-900">
            <img
              src={Image}
              alt="Login Visual"
              className="w-full h-full object-cover opacity-80"
            />
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-white">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Sign In</h1>
              <p className="text-sm text-slate-500">Enter your credentials to continue</p>
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
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-slate-400 font-medium">Or continue with</span>
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
                      <label className="text-xs font-medium text-slate-500 pl-1">Username</label>
                      <Field
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 placeholder:text-slate-400 text-sm text-slate-800"
                      />
                      <ErrorMessage component="p" name="username" className="text-xs text-red-500 pl-1" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-500 pl-1">Password</label>
                      <Field
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 placeholder:text-slate-400 text-sm text-slate-800"
                      />
                      <ErrorMessage component="p" name="password" className="text-xs text-red-500 pl-1" />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full mt-1 font-semibold py-2.5 rounded-xl transition-all duration-200 text-sm flex justify-center items-center gap-2
                        ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}
                        ${isFilled
                          ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200/50 hover:bg-indigo-700 hover:shadow-md"
                          : "bg-indigo-100 text-indigo-400"
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
                      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-center">
                        <p className="text-red-600 text-xs font-semibold">
                          {bannedUser} is banned from this platform
                        </p>
                      </div>
                    )}
                  </Form>
                );
              }}
            </Formik>

            <div className="mt-7 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
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