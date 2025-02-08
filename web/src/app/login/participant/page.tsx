"use client";

import Link from "next/link";
import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        <form className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <Link
            href="/home-participant"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </Link>
        </form>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="text-gray-500">or</span>
          <div className="w-full h-px bg-gray-300"></div>
        </div>
        <button
          type="button"
          className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.049 6.577c6.036 0 9.345 5.562 9.345 9.34 0 2.391-.799 4.646-2.182 6.318.963.267 1.908.401 2.875.401 5.825 0 9.283-4.963 9.283-9.283 0-5.825-4.458-9.283-9.283-9.283-1.832 0-3.512.646-4.89 1.808z" />
              <path d="M12.049 22c1.303 0 2.414-.07 3.44-.213v-2.29h-2.004c-.569 0-1.028-.222-1.465-.599-.437-.377-.653-.895-.653-1.482v-1.917c0-1.11.894-2 2-2 .653 0 1.234.294 1.707.83l1.112-1.11c-.825-.859-1.82-1.303-2.875-1.303-2.595 0-4.63.995-6.14 2.639-.328.32-.696.608-1.055.895v4.08c0 .354.275.62.629.62h3.441v3.774h-2.82c-.399.003-.754.15-.99.424-.236.273-.363.654-.363 1.056v2.287c0 .542.456 1 .999 1 .542 0 1-.458 1-.999v-2.13c.678.513 1.436.811 2.245.811z" />
            </svg>
            <span>Sign in with Google</span>
          </div>
        </button>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Dont have an account?{" "}
            <Link href="/#" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
