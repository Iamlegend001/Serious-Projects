import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import api from "@/lib/api";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      console.log("Logged in:", res.data);
    } catch (err) {
      const message = err?.response?.data?.message || "Login failed";
      console.error(message, err?.response?.data);
    }
  };

  return (
    <section className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-violet-100 to-violet-300 dark:from-violet-900 dark:to-violet-700 transition-colors duration-500">
      {/* Card Container */}
      <div className="flex w-[1000px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Image */}
        <div className="w-1/2 relative">
          <img
            src="/images/Image1.jpg"
            alt="Login"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-8">
            <h2 className="text-4xl font-extrabold mb-4">Welcome Back</h2>
            <p className="text-lg font-light">
              Log in to continue your journey with us
            </p>
          </div>
        </div>

        {/* Right Form */}
        <form
          className="w-1/2 flex flex-col gap-6 p-12 bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Title */}
          <h1 className="text-3xl font-extrabold text-center text-gray-800">
            Login
          </h1>
          <p className="text-center text-gray-500 text-sm -mt-4">
            Please enter your credentials to continue
          </p>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </Label>
            <input
              id="email"
              type="email"
              placeholder="example@mail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="border border-gray-300 h-12 px-4 rounded-lg focus:ring-2 focus:ring-violet-400 outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="border border-gray-300 h-12 px-4 rounded-lg focus:ring-2 focus:ring-violet-400 outline-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-violet-500 hover:bg-violet-600 text-white py-3 text-lg font-semibold rounded-lg shadow-md transition-all"
          >
            Login
          </Button>

          {/* Don't have account */}
          <p className="text-sm text-center text-gray-600 mt-2">
            Don’t have an account?{" "}
            <Link to="/register" className="text-violet-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
