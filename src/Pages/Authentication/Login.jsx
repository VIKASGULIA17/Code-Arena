import React from "react";
import {
  FaGoogle,
  FaDiscord,
  FaTwitch,
  FaFacebook,
  FaApple,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import * as yup from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";
import Image from "../../assets/authentication.gif"

const Login = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { setjwtToken, setisJwtExist } = useAppContext();

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
      if (res.jwtToken) {
        localStorage.setItem("jwtToken", res.jwtToken);
        setisJwtExist(true);
        setjwtToken(res.jwtToken);
        toast.success(`User logged in..`);
        navigate("/");
      } else {
        throw new Error();
      }
    } catch (e) {
      toast.error("User failed to login");
    } finally {
      helper.resetForm();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center my-20 p-4 sm:p-6">
        
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          
          <div className="w-full lg:w-1/2 h-48 lg:h-auto relative bg-black">
            <img
              src={Image}
              alt="Login Visual"
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center bg-white">
            
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Login</h1>
              
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

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or login with credentials</span>
              </div>
            </div>

            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validateData}
              onSubmit={handleSubmit}
            >
              {({ isSubmitted }) => (
                <Form className="flex flex-col gap-4">
                  <div className="space-y-1">
                    <Field
                      name="username"
                      type="text"
                      placeholder="Username"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all placeholder:text-gray-400 text-black"
                    />
                    <ErrorMessage
                      component="p"
                      name="username"
                      className="text-sm text-red-500 pl-1"
                    />
                  </div>

                  <div className="space-y-1">
                    <Field
                      name="password"
                      type="password"
                      placeholder="••••••"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all placeholder:text-gray-400 text-black"
                    />
                    <ErrorMessage
                      component="p"
                      name="password"
                      className="text-sm text-red-500 pl-1"
                    />
                  </div>

                  <button
                    disabled={isSubmitted}
                    type="submit"
                    className="w-full mt-2 bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold py-3 rounded-xl transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitted ? "Logging in..." : "Log In"}
                  </button>
                </Form>
              )}
            </Formik>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-amber-500 font-bold hover:underline">
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