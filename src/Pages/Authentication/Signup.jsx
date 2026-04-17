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
import Image from "../../assets/authentication.gif";

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
          {/* Left: Image */}
          <div className="w-full lg:w-1/2 relative bg-gray-900 min-h-[200px] lg:min-h-[600px]">
            <img
              src={Image}
              alt="Signup Visual"
              className="w-full h-full object-cover opacity-80 absolute inset-0"
            />

            {/* Sticky Note */}
            <div className="hidden lg:block w-full h-full relative z-10 pointer-events-none">
              <div className="bg-gray-800/90 backdrop-blur text-white w-60 text-center px-5 absolute top-10 left-10 rounded-xl -rotate-2 py-5 shadow-xl border border-gray-700/50">
                <h2 className="font-bold text-lg">Hold that thought</h2>
                <p className="font-medium text-gray-400 mt-2 text-xs leading-relaxed">
                  You can join the game of life once you sign up or sign into your account!
              </p>
                <p className="text-indigo-300 text-[11px] pt-3 font-medium">
                  This will only take a minute,{" "}
                  <span className="text-white">so hold on to that thought.</span>
                </p>
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

                  <div className="flex justify-center lg:justify-start pt-1 overflow-hidden">
                    <div className="scale-90 sm:scale-100 origin-center lg:origin-top-left">
                      <ReCAPTCHA
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                        onChange={(val) => setCapVal(val)}
                      />
                    </div>
                  </div>

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