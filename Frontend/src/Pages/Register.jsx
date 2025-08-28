import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import api from "@/lib/api";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit handler
  const onSubmit = async (data) => {
    const payload = {
      userName: data.username,
      fullName: { firstName: data.firstName, lastName: data.lastName || "" },
      email: data.email,
      password: data.password,
    };

    try {
      const res = await api.post("/auth/register", payload);
      console.log("Registered:", res.data);
    } catch (err) {
      const message = err?.response?.data?.message || "Registration failed";
      console.error(message, err?.response?.data);
    }
  };

  return (
    <section className="h-screen w-screen flex justify-center items-center bg-gradient-to-br overflow-hidden from-violet-700 to-black dark:from-black dark:to-violet-700 transition-colors duration-500">
      {/* Card Container */}
      <div className="flex w-[1240px] h-[700px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Image */}
        <div className="w-[60%] relative">
          <img
            src="/images/Image1.jpg"
            alt="Register"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-8">
            <h2 className="text-4xl font-extrabold mb-4">
              Create your Account
            </h2>
            <p className="text-lg font-light">
              Join us today and get started right away!
            </p>
          </div>
        </div>

        {/* Right Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 flex flex-col gap-6 p-12 bg-white"
        >
          {/* Title */}
          <h1 className="text-3xl font-extrabold text-center text-gray-800">
            Sign Up
          </h1>
          <p className="text-center text-gray-500 text-sm -mt-4">
            Please fill in the details to continue
          </p>

          {/* Username */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="text-gray-700 font-medium">
              Username
            </Label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
              className="border border-gray-300 h-12 px-4 rounded-lg focus:ring-2 focus:ring-violet-400 outline-none"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* First & Last Name */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-1/2">
              <Label htmlFor="firstName" className="text-gray-700 font-medium">
                First Name
              </Label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="border border-gray-300 h-12 px-4 rounded-lg focus:ring-2 focus:ring-violet-400 outline-none"
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <Label htmlFor="lastName" className="text-gray-700 font-medium">
                Last Name
              </Label>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
                className="border border-gray-300 h-12 px-4 rounded-lg focus:ring-2 focus:ring-violet-400 outline-none"
              />
            </div>
          </div>

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
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
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
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-violet-500 hover:bg-violet-600 text-white py-3 text-lg font-semibold rounded-lg shadow-md transition-all"
          >
            Register
          </Button>

          {/* Already have account */}
          <p className="text-sm text-center text-gray-600 mt-2">
            Already have an account? ...
            <Link to="/login" className="text-violet-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
