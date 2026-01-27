import React, { useState } from "react";
import {
  FaGoogle,
  FaDiscord,
  FaTwitch,
  FaFacebook,
  FaApple,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import * as yup from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Login = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { setjwtToken, setisJwtExist } = useAppContext();

  const validateData = yup.object({
    username: yup.string().required("**username is required"),
    password: yup
      .string()
      .min(6, "Min 6 characters")
      .required("**password is required"),
  });

  const checkToSpringBackend = async (values) => {
    const result = await axios.post(`${BACKEND_URL}/public/login`, values);
    return result.data;
  };

  const handleSubmit = async (values, helper) => {
    try {
      const res = await checkToSpringBackend(values);
      if (res.jwtToken) {
        // localStorage.setItem("jwtToken", res.jwtToken);
        setisJwtExist(true);
        setjwtToken(res.jwtToken);
        toast.success(`User logged in..`);
        setTimeout(() => {
          navigate("/");
        }, 200);
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
    <div
      className={`
        w-full h-screen
         absolute top-0 left-0 duration-1000 text-black flex bg-white/50
         flex-row
         lg:flex-row
         `}
    >
      <Navbar />

      <div
        className="h-[40vh] lg:shadow-2xl border border-cardbg rounded-2xl 
            top-0 left-0 bg-grey
            lg:w-[55vw] absolute lg:top-40 lg:left-120 lg:flex-row
            flex flex-col lg:h-[59vh] lg:my-10
            "
      >
        <div
          className="
                w-full
                lg:w-1/2 h-full "
        >
          <div
            className="h-full w-full
                    lg:w-full lg:h-full mx-2 lg:mx-0"
          >
            <img
              src="src/assets/authentication.gif"
              alt=""
              className="w-full bg-cover  h-full bg-black"
            />
          </div>

          {/* right */}
        </div>
        <div
          className=" pl-4 w-full
                lg:w-1/2 h-full"
        >
          <div className=" flex flex-col px-10 justify-end h-[40%]  gap-5 w-full">
            <h1 className="text-3xl font-bold text-black text-center lg:text-start">
              Login
            </h1>
            <div className="flex gap-2">
              <FaGoogle className="w-12 h-12 rounded-xl text-green-500 border px-3 py-3" />
              <FaDiscord className="w-12 h-12 rounded-xl bg-[#7289DA] text-white px-3 py-3" />
              <FaTwitch className="w-12 h-12 rounded-xl bg-[#B07BFF] text-white px-3 py-3" />
              <FaFacebook className="w-12 h-12 rounded-xl bg-[#1976D2] text-white px-3 py-3" />
              <FaApple className="w-12 h-12 rounded-xl bg-black text-white px-3 py-3" />
            </div>
          </div>
          <div className="w-[70%] h-px bg-cardbg my-5"></div>

          <div className="w-full h-[54.7%]  ">
            {/* bottom */}
            <div
              className="flex flex-col w-full
                         lg:w-[75%] py-5 gap-10 px-3 lg:mx-5"
            >
              <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={validateData}
                onSubmit={handleSubmit}
              >
                {({ isSubmitted }) => {
                  return (
                    <Form className="flex flex-col gap-5">
                      <Field
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="placeholder:text-primary outline-2 text-black px-4 py-3 rounded-xl    bg-cardbg"
                      />
                      <ErrorMessage
                        component="p"
                        name="username"
                        className="text-sm text-red-600"
                      />
                      <Field
                        name="password"
                        type="password"
                        placeholder="••••••"
                        className="placeholder:text-primary outline-2 text-black px-4 py-3 rounded-xl bg-cardbg"
                      />
                      <ErrorMessage
                        component="p"
                        name="password"
                        className="text-sm text-red-600"
                      />

                      <button
                        disabled={isSubmitted}
                        type="submit"
                        className="w-full rounded-lg bg-amber-200 h-10"
                      >
                        {isSubmitted ? "Logging in..." : "Log In"}
                      </button>
                    </Form>
                  );
                }}
              </Formik>
              <p className="text-black font-semibold">
                Don't have an account?
                <Link to="/signup">
                  <span className="text-yellow-400 font-bold ">
                    {" "}
                    Create One{" "}
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
