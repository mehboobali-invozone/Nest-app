"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import globalConstantUtil from "../../globalConstantUtils";
import { useRouter } from "next/navigation";

export default function Login() {

  const dispatch = useDispatch();
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);

  const formik = useFormik({

    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string().required("Required"),
    }),

onSubmit: async (values, { setSubmitting }) => {

  try {

    const res = await axios.post(
      globalConstantUtil.baseUrl + "/auth/login",
      values
    );

    // console.log("LOGIN RESPONSE =", res.data);

    dispatch(loginSuccess(res.data)); // ✅ FIX

    router.push("/dashboard");

  } catch (error) {

    console.log(error);
    alert("Login Failed");

  } finally {

    setSubmitting(false);

  }

},
  });

  return (

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">

      {/* Glow Effect */}

      <div className="absolute w-96 h-96 bg-green-500 opacity-20 blur-3xl rounded-full -top-20 -left-20"></div>

      <div className="absolute w-96 h-96 bg-blue-500 opacity-20 blur-3xl rounded-full bottom-0 right-0"></div>


      <div className="relative w-full max-w-md p-10 rounded-2xl 
      bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">

        <h2 className="text-4xl font-bold text-center text-white mb-2">
          Login
        </h2>


        <form className="space-y-6" onSubmit={formik.handleSubmit}>


          {/* EMAIL */}

          <div>

            <label className="text-sm text-gray-300">
              Email
            </label>

            <div className="flex items-center mt-1 bg-gray-900/70 
            border border-gray-600 rounded-xl px-3
            focus-within:ring-2 focus-within:ring-green-500">

              <i className="fas fa-envelope text-gray-400"></i>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full bg-transparent p-3 outline-none text-white"
              />

            </div>

            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.email}
              </p>
            )}

          </div>


          {/* PASSWORD */}

          <div>

            <label className="text-sm text-gray-300">
              Password
            </label>

            <div className="flex items-center mt-1 bg-gray-900/70 
            border border-gray-600 rounded-xl px-3
            focus-within:ring-2 focus-within:ring-green-500">

              <i className="fas fa-lock text-gray-400"></i>

              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full bg-transparent p-3 outline-none text-white"
              />

              <i
                className={`fas ${showPass ? "fa-eye-slash" : "fa-eye"} 
                text-gray-400 cursor-pointer`}
                onClick={() => setShowPass(!showPass)}
              />

            </div>

            {formik.touched.password && formik.errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}

          </div>


          {/* BUTTON */}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-3 rounded-xl font-semibold text-white 
            bg-gradient-to-r from-green-500 to-emerald-600
            hover:from-green-600 hover:to-emerald-700
            shadow-lg hover:shadow-green-500/40
            transition duration-300 transform hover:scale-[1.02]"
          >

            {formik.isSubmitting ? "Logging in..." : "Login"}

          </button>


          <p className="text-center text-gray-400 text-sm">

            Don’t have an account?

            <span
              onClick={() => router.push("/signup")}
              className="text-green-400 hover:underline ml-1 cursor-pointer"
            >
              Sign up
            </span>

          </p>


        </form>

      </div>

    </div>

  );

}