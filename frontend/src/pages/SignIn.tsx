import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
      title: "Unlock Your Potential",
      desc: "Connect with top organizations and discover opportunities that match your professional ambitions.",
    },
    {
      image:
        "https://img.freepik.com/free-photo/team-business-people-collaborating-plan-financial-strategy-doing-teamwork-create-sales-report-laptop-office-employees-working-project-strategy-analyze-career-growth_482257-39530.jpg?semt=ais_hybrid&w=740&q=80",
      title: "Collaborate & Grow",
      desc: "Join a community of experts and innovators shaping the future of Rwanda's professional landscape.",
    },
    {
      image:
        "https://goodthingsaustralia.org/wp-content/uploads/2024/05/try_finding_your_dream_job-1024x683.webp",
      title: "Find Your Dream Role",
      desc: "From internships to senior management, your next career milestone starts right here.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data?.message || "Sign in failed");
        return;
      }

      if (!data?.token) {
        setError("Sign in failed");
        return;
      }

      if (rememberMe) {
        localStorage.setItem("token", data.token);
        sessionStorage.removeItem("token");
      } else {
        sessionStorage.setItem("token", data.token);
        localStorage.removeItem("token");
      }

      navigate("/admin/dashboard", { replace: true });
    } catch {
      setError("Unable to connect to server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
        <div className="absolute top-8 left-8 z-20">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all group text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return Home</span>
          </Link>
        </div>

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt="Slide"
              className="w-full h-full object-cover opacity-60 scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent"></div>

            <div className="absolute bottom-16 left-16 right-16 text-white max-w-md">
              <h2 className="text-3xl font-bold mb-4 transform transition-all duration-700">
                {slide.title}
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm">
                {slide.desc}
              </p>
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-16 flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-blue-500" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
            <p className="text-slate-500 text-sm mt-1">
              Please enter your details to sign in.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400 group-focus-within:text-[#2b6cb0] transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#2b6cb0] transition-all outline-none text-slate-700"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-[#2b6cb0] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-[#2b6cb0] transition-all outline-none text-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#2b6cb0] focus:ring-[#2b6cb0]"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-xs text-slate-600 font-medium"
              >
                Keep me signed in
              </label>
            </div>

            {error && (
              <p className="text-sm font-medium text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2b6cb0] text-white py-2.5 rounded-lg font-bold text-sm shadow-md hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
