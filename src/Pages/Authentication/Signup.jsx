import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaDiscord,
  FaTwitch,
  FaFacebook,
  FaApple,
} from "react-icons/fa";
import Navbar from "../../components/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import Image from '../../assets/authentication.gif'

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

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center my-20 p-4 sm:p-6 lg:py-10">
        
        <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100 relative">
          
          <div className="w-full lg:w-1/2 relative bg-black min-h-[200px] lg:min-h-[600px]">

            <img
              src={Image}
              alt="Signup Visual"
              className="w-full h-full object-cover opacity-90 absolute inset-0"
            />
            
            <div className="hidden lg:block w-full h-full relative z-10 pointer-events-none">

                
                {/* Sticky Note */}
                <div className="bg-[#2d2d3a] text-white w-64 text-center px-4 absolute top-10 left-10 rounded-lg -rotate-3 py-5 shadow-xl border border-gray-700">
                    <h1 className="font-bold text-xl">Hold that thought</h1>
                    <p className="font-semibold text-gray-400 mt-2 text-sm">
                        You can join a game of life once you sign up or sign into your account!
                    </p>
                    <p className="text-amber-300 text-xs pt-3 font-medium">
                        This will only take a minute,{" "}
                        <span className="text-white">so hold on to that thought.</span>
                    </p>
                </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 bg-white flex flex-col justify-center">
            
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign Up</h1>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <button className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
                  <FaGoogle className="w-6 h-6 text-green-500" />
                </button>
                <button className="p-3 rounded-xl bg-[#7289DA] text-white hover:opacity-90 transition">
                  <FaDiscord className="w-6 h-6" />
                </button>
                <button className="p-3 rounded-xl bg-[#B07BFF] text-white hover:opacity-90 transition">
                  <FaTwitch className="w-6 h-6" />
                </button>
                <button className="p-3 rounded-xl bg-[#1976D2] text-white hover:opacity-90 transition">
                  <FaFacebook className="w-6 h-6" />
                </button>
                <button className="p-3 rounded-xl bg-black text-white hover:opacity-90 transition">
                  <FaApple className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200 mb-6"></div>

            <Formik
              initialValues={{ username: "", email: "", password: "" }}
              validationSchema={validateData}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-4">
                  <div className="space-y-1">
                    <Field
                      name="username"
                      type="text"
                      placeholder="Username"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all placeholder:text-gray-400 text-black"
                    />
                    <ErrorMessage component="p" name="username" className="text-sm text-red-500 pl-1" />
                  </div>

                  <div className="space-y-1">
                    <Field
                      name="email"
                      type="text"
                      placeholder="Email address"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all placeholder:text-gray-400 text-black"
                    />
                    <ErrorMessage component="p" name="email" className="text-sm text-red-500 pl-1" />
                  </div>

                  <div className="space-y-1">
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all placeholder:text-gray-400 text-black"
                    />
                    <ErrorMessage component="p" name="password" className="text-sm text-red-500 pl-1" />
                  </div>

                  <div className="flex justify-center lg:justify-start pt-2 overflow-hidden">
                    <div className="scale-90 sm:scale-100 origin-center lg:origin-top-left">
                        <ReCAPTCHA
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={(val) => setCapVal(val)}
                        />
                    </div>
                  </div>

                  <p className="w-full text-center lg:text-left text-sm text-gray-500 px-2">
                    By signing up, you agree with our{" "}
                    <span className="text-black font-semibold hover:underline cursor-pointer">ToS,</span>{" "}
                    <span className="text-black font-semibold hover:underline cursor-pointer">Community Guidelines</span>{" "}
                    and{" "}
                    <span className="text-black font-semibold hover:underline cursor-pointer">Privacy Policy</span>
                  </p>

                  <button
                    className={`w-full mt-2 font-bold py-3 rounded-xl transition-all duration-200 ${
                        capVal && !isSubmitting
                        ? "bg-amber-300 hover:bg-amber-400 text-amber-900 cursor-pointer" 
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!capVal || isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Creating account..." : "Sign Up"}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-amber-500 font-bold hover:underline">
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