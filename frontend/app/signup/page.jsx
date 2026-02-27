"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import globalConstantUtil from "../../globalConstantUtils";

const SignupForm = () => {

  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "Editor",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6).required("Required"),
      role: Yup.string().required(),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {

      try {

        await axios.post(
          globalConstantUtil.baseUrl + "/auth/register",
          values
        );

        resetForm();

        router.push("/login");

      } catch (err) {

        alert("Signup failed");

      } finally {

        setSubmitting(false);

      }

    },

  });

  return (

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-3">

      {/* Glow Effect */}
      <div className="absolute w-72 h-72 bg-purple-500 opacity-20 blur-3xl rounded-full -top-16 -left-16"></div>

      <div className="absolute w-72 h-72 bg-green-500 opacity-20 blur-3xl rounded-full bottom-0 right-0"></div>


      <div className="relative w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-xl 
                      bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-1">
          Sign Up
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">


          {/* NAME */}
          <div>

            <div className="flex items-center bg-gray-900/70 border border-gray-600 
                            rounded-lg px-3 focus-within:ring-2 focus-within:ring-green-500">

              <i className="fas fa-user text-gray-400 text-sm"></i>

              <input
                name="name"
                placeholder="Full name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="w-full bg-transparent p-2.5 text-sm text-white outline-none"
              />

            </div>

            {formik.touched.name && formik.errors.name && (
              <p className="text-red-400 text-xs mt-1">
                {formik.errors.name}
              </p>
            )}

          </div>


          {/* EMAIL */}
          <div>

            <div className="flex items-center bg-gray-900/70 border border-gray-600 
                            rounded-lg px-3 focus-within:ring-2 focus-within:ring-green-500">

              <i className="fas fa-envelope text-gray-400 text-sm"></i>

              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full bg-transparent p-2.5 text-sm text-white outline-none"
              />

            </div>

            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {formik.errors.email}
              </p>
            )}

          </div>


          {/* PASSWORD */}
          <div>

            <div className="flex items-center bg-gray-900/70 border border-gray-600 
                            rounded-lg px-3 focus-within:ring-2 focus-within:ring-green-500">

              <i className="fas fa-lock text-gray-400 text-sm"></i>

              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full bg-transparent p-2.5 text-sm text-white outline-none"
              />

              <i
                className={`fas ${showPass ? "fa-eye-slash" : "fa-eye"} 
                text-gray-400 text-sm cursor-pointer`}
                onClick={() => setShowPass(!showPass)}
              />

            </div>

            {formik.touched.password && formik.errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}

          </div>


          {/* ROLE */}
          <select
            name="role"
            onChange={formik.handleChange}
            value={formik.values.role}
            className="w-full bg-gray-900/70 border border-gray-600 
                       rounded-lg p-2.5 text-sm text-white 
                       focus:ring-2 focus:ring-green-500 outline-none"
          >

            <option value="Editor">Editor</option>

            <option value="Admin">Admin</option>

          </select>


          {/* BUTTON */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-2.5 text-sm rounded-lg font-semibold text-white 
                       bg-gradient-to-r from-purple-500 to-green-500
                       hover:from-purple-600 hover:to-green-600
                       transition transform hover:scale-[1.02]"
          >

            {formik.isSubmitting ? "Creating..." : "Create Account"}

          </button>


          <p className="text-center text-gray-400 text-xs">

            Already have account?

            <span
              onClick={() => router.push("/login")}
              className="text-green-400 ml-1 cursor-pointer hover:underline"
            >
              Login
            </span>

          </p>


        </form>

      </div>

    </div>

  );

};

export default SignupForm;