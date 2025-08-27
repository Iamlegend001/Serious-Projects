import React from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Info } from "lucide-react"; // Added Info icon for password strength

const Register = () => {
  const {
    register,
    handleSubmit,
    watch, // To watch password field for strength
    formState: { errors },
  } = useForm({
    mode: "onBlur", // Validate on blur for better UX
  });

  const password = watch("password"); // Watch password field

  const onSubmit = (data) => {
    console.log("Register form data:", data);
    // Here you would typically send data to your backend
    alert("Registration successful! Check console for data.");
  };

  // Basic password strength checker
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^A-Za-z0-9]/)) strength += 1;

    switch (strength) {
      case 0:
      case 1:
        return { text: "Very Weak", color: "text-red-500" };
      case 2:
        return { text: "Weak", color: "text-orange-500" };
      case 3:
        return { text: "Moderate", color: "text-yellow-500" };
      case 4:
        return { text: "Good", color: "text-green-600" };
      case 5:
        return { text: "Strong", color: "text-green-700" };
      default:
        return { text: "", color: "" };
    }
  };

  const passwordStrength = password ? getPasswordStrength(password) : null;

  return (
    <section className="flex h-screen p-4 items-center justify-center bg-gray-50">
      {/* Left side with wallpaper - Enhanced styling */}
      <div className="hidden md:block w-1/2 min-h-[calc(100vh-2rem)]">
        <img
          src="/Images/Crypto.png"
          alt="Abstract crypto background"
          className="h-full w-full object-cover rounded-l-3xl shadow-lg" // Changed to rounded-l-3xl
        />
      </div>

      {/* Right side with form - Enhanced styling */}
      <div className="flex w-full md:w-1/2 min-h-[calc(100vh-2rem)] items-center justify-center bg-white rounded-r-3xl shadow-xl p-6 md:p-8 lg:p-10 relative overflow-hidden">
        {/* Decorative background elements (optional) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 z-0"></div>
        <div className="absolute top-10 right-10 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob z-0"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 z-0"></div>

        <Card className="w-full max-w-[480px] shadow-2xl rounded-2xl border-none backdrop-blur-md bg-white/80 z-10">
          <CardHeader className="pt-8 pb-4 px-6">
            <CardTitle className="text-4xl font-extrabold text-center text-gray-900 leading-tight">
              Create Your <span className="text-blue-600">Account</span>
            </CardTitle>
            <p className="text-center text-md text-gray-600 mt-2 font-light">
              Join our community and start your crypto journey! 🚀
            </p>
          </CardHeader>
          <CardContent className="px-6 pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1 block">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="h-12 text-base px-4 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                    {...register("firstName", { required: "First name is required." })}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-600 mt-1 flex items-center">
                      <Info className="h-4 w-4 mr-1" />
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1 block">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className="h-12 text-base px-4 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                    {...register("lastName", { required: "Last name is required." })}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-600 mt-1 flex items-center">
                      <Info className="h-4 w-4 mr-1" />
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Username */}
              <div>
                <Label htmlFor="username" className="text-sm font-medium text-gray-700 mb-1 block">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="username"
                    placeholder="johndoe123"
                    className="h-12 text-base pl-10 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                    {...register("username", {
                      required: "Username is required.",
                      minLength: { value: 3, message: "Min 3 characters." },
                    })}
                  />
                </div>
                {errors.username && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <Info className="h-4 w-4 mr-1" />
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 text-base pl-10 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address.",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <Info className="h-4 w-4 mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1 block">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="h-12 text-base pl-10 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                    {...register("password", {
                      required: "Password is required.",
                      minLength: { value: 8, message: "Min 8 characters." },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "Password must include uppercase, lowercase, number, and special character.",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <Info className="h-4 w-4 mr-1" />
                    {errors.password.message}
                  </p>
                )}
                {password && (
                  <div className={`text-xs mt-1 ${passwordStrength?.color}`}>
                    Password Strength: {passwordStrength?.text}
                  </div>
                )}
              </div>

              {/* Confirm Password (New Field) */}
              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1 block">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    className="h-12 text-base pl-10 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-gray-400"
                    {...register("confirmPassword", {
                      required: "Please confirm your password.",
                      validate: (value) =>
                        value === password || "Passwords do not match.",
                    })}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <Info className="h-4 w-4 mr-1" />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 text-lg mt-6 rounded-lg shadow-lg transition-all transform hover:scale-[1.01] bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Register Account
              </Button>

              {/* Login link */}
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-600 font-semibold hover:underline hover:text-blue-700"
                >
                  Log in
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Register;