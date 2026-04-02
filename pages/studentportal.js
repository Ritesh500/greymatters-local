import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Mail, ArrowRight, Eye, EyeOff, 
  CheckCircle, Shield, Zap, BookOpen, Award, Target,
  Smartphone, Chrome
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/Components/ui/tabs';

export default function StudentPortal() {
  const [loginMethod, setLoginMethod] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  const portalFeatures = [
    { icon: BookOpen, text: 'Live Classes & Recordings' },
    { icon: Target, text: 'Mock Tests & Analytics' },
    { icon: Award, text: 'Progress Tracking' },
    { icon: CheckCircle, text: 'Assignments & Feedback' }
  ];

  const trustStats = [
    { value: '25,00,000+', label: 'Active Students' },
    { value: '98%', label: 'Success Rate' },
    { value: '24/7', label: 'Portal Access' }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding & Features */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200 mb-6"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-slate-700">Secure Student Portal</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight"
              >
                Welcome Back to Your{' '}
                <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                  Learning Journey
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg text-slate-600 mb-8"
              >
                Access your classes, practice tests, progress analytics, and personalized study materials—all in one place.
              </motion.p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {portalFeatures.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.6 }}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100"
                  >
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-red-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Trust Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="flex items-center gap-8 pt-8 border-t border-slate-200"
              >
                {trustStats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  Student Login
                </h2>
                <p className="text-slate-600">
                  Access your personalized learning dashboard
                </p>
              </div>

              {/* Login Method Tabs */}
              <Tabs value={loginMethod} onValueChange={setLoginMethod} className="mb-6">
                <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1">
                  <TabsTrigger value="password" className="rounded-lg">
                    Password
                  </TabsTrigger>
                  <TabsTrigger value="otp" className="rounded-lg">
                    OTP Login
                  </TabsTrigger>
                </TabsList>

                {/* Password Login */}
                <TabsContent value="password" className="mt-6">
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="student@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <button
                          type="button"
                          className="text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          Forgot?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 h-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 text-red-600 border-slate-300 rounded focus:ring-red-500"
                      />
                      <label htmlFor="remember" className="text-sm text-slate-600">
                        Remember me on this device
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 text-base"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Signing in...
                        </div>
                      ) : (
                        <>
                          Sign In to Portal
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* OTP Login */}
                <TabsContent value="otp" className="mt-6">
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email-otp">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="email-otp"
                          type="email"
                          placeholder="student@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 border-2 border-slate-200 hover:border-red-600 hover:bg-red-50 hover:text-red-600 font-semibold rounded-xl transition-all"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Send OTP to Email
                    </Button>

                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="h-12 text-center text-2xl tracking-widest"
                        maxLength={6}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg shadow-red-500/25 transition-all text-base"
                    >
                      Verify & Login
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">New to Grey Matters?</span>
                </div>
              </div>

              {/* Sign Up CTA */}
              <div className="text-center">
                <p className="text-slate-600 mb-4">
                  Don't have an account yet?
                </p>
                <a
                  href="/bookconsultation"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all"
                >
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Security Badge */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Secure Login</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span>Encrypted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Features (Below form on mobile) */}
            <div className="lg:hidden mt-8 grid grid-cols-2 gap-4">
              {portalFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100"
                >
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-slate-500 mb-4">Trusted by 25,00,000+ students worldwide since 1997</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-slate-600">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">98% Success Rate</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Shield className="w-5 h-5 text-blue-500" />
              <span className="text-sm">Authorized Education & Immigration Institution</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="text-sm">IDP Partner</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}