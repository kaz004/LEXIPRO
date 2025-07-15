"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  FileText,
  Calendar,
  Shield,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Zap,
  Award,
  Scale,
  Video,
  Globe,
  Mic,
  TrendingUp,
  UserCheck,
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const features = [
    {
      icon: Brain,
      title: "AI Legal Assistant",
      description: "Advanced GPT-4 powered legal research and consultation with Indian law expertise",
      gradient: "from-yellow-400 to-yellow-600",
      demo: "Ask complex legal questions and get instant, accurate responses",
    },
    {
      icon: FileText,
      title: "Smart Document Generator",
      description: "Generate professional legal documents with AI-powered customization and templates",
      gradient: "from-yellow-500 to-amber-600",
      demo: "Create NDAs, contracts, and legal notices in minutes",
    },
    {
      icon: Users,
      title: "Client-Lawyer Marketplace",
      description: "Connect clients with verified lawyers through our secure bidding platform",
      gradient: "from-amber-400 to-orange-500",
      demo: "Post cases, receive bids, and hire the best lawyers",
    },
    {
      icon: Calendar,
      title: "Intelligent Scheduling",
      description: "Automated appointment booking with integrated payment processing and reminders",
      gradient: "from-yellow-600 to-yellow-800",
      demo: "Schedule consultations with smart calendar integration",
    },
    {
      icon: Shield,
      title: "Blockchain Notarization",
      description: "Secure document verification and timestamping using blockchain technology",
      gradient: "from-amber-500 to-yellow-600",
      demo: "Immutable proof of document authenticity",
    },
    {
      icon: Zap,
      title: "Story Mode AI",
      description: "Transform complex cases into interactive, step-by-step legal strategies",
      gradient: "from-yellow-400 to-amber-500",
      demo: "Upload cases and get AI-powered strategy trees",
    },
  ]

  const stats = [
    { number: "50,000+", label: "Legal Professionals", icon: Users },
    { number: "2M+", label: "Documents Generated", icon: FileText },
    { number: "99.9%", label: "Accuracy Rate", icon: Award },
    { number: "24/7", label: "AI Availability", icon: Brain },
  ]

  const pricingPlans = [
    {
      name: "Client",
      price: "₹0",
      period: "/month",
      description: "Perfect for individuals seeking legal help",
      features: [
        "Post 1 case/month for free",
        "Access to verified lawyers",
        "Basic document templates",
        "Secure messaging",
        "Case tracking",
      ],
      popular: false,
      buttonText: "Start Free",
      userType: "client",
    },
    {
      name: "Lawyer Basic",
      price: "₹999",
      period: "/month",
      description: "Essential tools for solo practitioners",
      features: [
        "Unlimited case bidding",
        "Client management dashboard",
        "Basic AI assistant",
        "Document generator",
        "Calendar integration",
      ],
      popular: false,
      buttonText: "Choose Basic",
      userType: "lawyer",
    },
    {
      name: "Lawyer Pro",
      price: "₹1,999",
      period: "/month",
      description: "Advanced features for growing practices",
      features: [
        "Everything in Basic",
        "Advanced AI assistant",
        "Story Mode AI",
        "Blockchain notarization",
        "Video consultations",
        "Priority support",
      ],
      popular: true,
      buttonText: "Choose Pro",
      userType: "lawyer",
    },
    {
      name: "Enterprise",
      price: "₹25,000",
      period: "/month",
      description: "Complete solution for law firms",
      features: [
        "Everything in Pro",
        "White-label platform",
        "Custom AI training",
        "Advanced analytics",
        "Multi-tenant architecture",
        "Dedicated support",
      ],
      popular: false,
      buttonText: "Contact Sales",
      userType: "enterprise",
    },
  ]

  const testimonials = [
    {
      name: "Adv. Priya Sharma",
      role: "Senior Partner, Sharma & Associates",
      image: "/placeholder.svg?height=60&width=60",
      content: "LexiPro has revolutionized our practice. The AI assistant saves us hours of research time.",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      image: "/placeholder.svg?height=60&width=60",
      content: "Found the perfect lawyer for my startup's legal needs. The platform is incredibly user-friendly.",
      rating: 5,
    },
    {
      name: "Adv. Meera Patel",
      role: "Corporate Lawyer",
      image: "/placeholder.svg?height=60&width=60",
      content: "The document automation feature is a game-changer. Professional documents in minutes!",
      rating: 5,
    },
  ]

  const labsFeatures = [
    {
      icon: Brain,
      title: "Legal Triage AI",
      description: "Auto-categorizes cases by domain, urgency, and cost range",
      status: "Live",
    },
    {
      icon: TrendingUp,
      title: "Outcome Predictor",
      description: "Predicts case outcomes based on historical data and precedents",
      status: "Beta",
    },
    {
      icon: Video,
      title: "Virtual Courtroom",
      description: "AI-powered simulation for legal training and practice",
      status: "Coming Soon",
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Real-time translation for cross-language legal communication",
      status: "Live",
    },
    {
      icon: Mic,
      title: "Voice-to-Case",
      description: "Convert spoken case descriptions into structured legal documents",
      status: "Beta",
    },
    {
      icon: UserCheck,
      title: "Trust Layer",
      description: "Blockchain-based reputation system for lawyers and clients",
      status: "Live",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-gray-900 to-black text-white overflow-x-hidden">
      <Navbar />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-[#FCD34D]/5 rounded-full blur-3xl transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#FCD34D]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20"
        style={{ y, opacity }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <Badge className="mb-6 bg-gradient-to-r from-[#FCD34D]/20 to-yellow-600/20 text-[#FCD34D] border-[#FCD34D]/30 px-6 py-3 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Legal Operating System & Marketplace
            </Badge>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-[#FCD34D] bg-clip-text text-transparent">
                LexiPro
              </span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-[#FCD34D] to-yellow-600 bg-clip-text text-transparent">
                Legal OS & Marketplace
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              The world's most advanced AI-powered legal platform connecting clients with lawyers, automating legal
              workflows, and revolutionizing legal practice with blockchain technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold px-10 py-4 text-lg rounded-xl shadow-2xl hover:shadow-[#FCD34D]/25 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/auth/signup?type=client">
                I Need Legal Help
                <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold px-10 py-4 text-lg rounded-xl shadow-2xl hover:shadow-amber-600/25 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/auth/signup?type=lawyer">
                I'm a Lawyer
                <Scale className="ml-3 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FCD34D]/20 to-yellow-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#FCD34D]/30">
                  <stat.icon className="w-8 h-8 text-[#FCD34D]" />
                </div>
                <div className="text-3xl font-bold text-[#FCD34D] mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-[#FCD34D] bg-clip-text text-transparent">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of legal practice with our comprehensive suite of AI-powered tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group"
              >
                <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl hover:border-[#FCD34D]/60 transition-all duration-500 h-full hover:shadow-2xl hover:shadow-[#FCD34D]/10">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <feature.icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#FCD34D] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">{feature.description}</p>
                    <p className="text-[#FCD34D] text-sm font-medium">{feature.demo}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <Badge className="mb-6 bg-gradient-to-r from-[#FCD34D]/20 to-amber-600/20 text-[#FCD34D] border-[#FCD34D]/30 px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Legal Marketplace
              </Badge>
              <h2 className="text-4xl sm:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-[#FCD34D] bg-clip-text text-transparent">
                Connect. Collaborate. Succeed.
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Our revolutionary marketplace connects clients with verified lawyers through a secure bidding system.
                Post your case, receive competitive bids, and choose the perfect legal expert for your needs.
              </p>
              <div className="space-y-6 mb-10">
                {[
                  "Verified lawyer profiles with ratings and reviews",
                  "Secure bidding system with transparent pricing",
                  "Escrow payment protection for both parties",
                  "Real-time messaging with confidentiality",
                  "Case tracking and milestone management",
                  "Integrated video consultations",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#FCD34D] to-yellow-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-gray-300 text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FCD34D] to-amber-600 hover:from-yellow-500 hover:to-amber-700 text-black font-bold px-8 py-4 text-lg rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link href="/marketplace">
                    Explore Marketplace
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#FCD34D]/50 text-[#FCD34D] hover:bg-[#FCD34D]/10 hover:border-[#FCD34D] px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm bg-transparent transition-all duration-300"
                  asChild
                >
                  <Link href="/post-case">Post a Case</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#FCD34D]/10 to-amber-600/10 rounded-3xl p-8 backdrop-blur-sm border border-[#FCD34D]/20 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold text-white">Active Case Bids</h4>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Live</Badge>
                  </div>

                  {[
                    { lawyer: "Adv. Priya Sharma", bid: "₹25,000", rating: 4.9, cases: 150 },
                    { lawyer: "Adv. Rajesh Kumar", bid: "₹22,000", rating: 4.8, cases: 120 },
                    { lawyer: "Adv. Meera Patel", bid: "₹28,000", rating: 5.0, cases: 200 },
                  ].map((bid, index) => (
                    <div key={index} className="bg-black/30 rounded-xl p-4 border border-[#FCD34D]/20">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-white">{bid.lawyer}</h5>
                        <span className="text-[#FCD34D] font-bold">{bid.bid}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{bid.rating}</span>
                        </div>
                        <span>{bid.cases} cases</span>
                        <Badge className="bg-[#FCD34D]/20 text-[#FCD34D] border-[#FCD34D]/30 text-xs">Verified</Badge>
                      </div>
                    </div>
                  ))}

                  <Button className="w-full bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold">
                    View All Bids
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Labs Section */}
      <section className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30 px-6 py-3 text-sm font-medium">
              <Zap className="w-4 h-4 mr-2" />
              LexiPro AI Labs
            </Badge>
            <h2 className="text-4xl sm:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Future of Legal Technology
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Cutting-edge AI tools that push the boundaries of legal practice and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {labsFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/20 backdrop-blur-sm hover:border-purple-400/40 transition-all duration-500 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge
                        className={`text-xs ${
                          feature.status === "Live"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : feature.status === "Beta"
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                        }`}
                      >
                        {feature.status}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-[#FCD34D] bg-clip-text text-transparent">
              Trusted by Legal Professionals
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              See what lawyers and clients are saying about LexiPro
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#FCD34D] fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-[#FCD34D] bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Flexible pricing for every legal professional and client
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-[#FCD34D] to-amber-600 text-black font-bold px-4 py-2 shadow-lg">
                      <Star className="w-4 h-4 mr-2" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={`bg-gradient-to-br from-gray-900/80 to-black/80 border-[#FCD34D]/30 backdrop-blur-xl h-full transition-all duration-500 ${
                    plan.popular
                      ? "border-[#FCD34D]/60 shadow-2xl shadow-[#FCD34D]/20 scale-105"
                      : "hover:border-[#FCD34D]/50 hover:shadow-xl hover:shadow-[#FCD34D]/10"
                  }`}
                >
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-3">{plan.name}</h3>
                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">{plan.description}</p>
                    <div className="mb-8">
                      <span className="text-4xl font-bold text-[#FCD34D]">{plan.price}</span>
                      <span className="text-gray-300 text-lg">{plan.period}</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-[#FCD34D] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-[#FCD34D] to-amber-600 hover:from-yellow-500 hover:to-amber-700 text-black shadow-lg hover:shadow-[#FCD34D]/25"
                          : "bg-[#FCD34D]/10 text-[#FCD34D] border border-[#FCD34D]/30 hover:bg-[#FCD34D]/20 hover:border-[#FCD34D]/50"
                      }`}
                      asChild
                    >
                      <Link href={`/auth/signup?type=${plan.userType}`}>{plan.buttonText}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#FCD34D]/10 to-amber-600/10 rounded-3xl p-16 backdrop-blur-sm border border-[#FCD34D]/20 shadow-2xl"
          >
            <h2 className="text-4xl sm:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-[#FCD34D] bg-clip-text text-transparent">
              Ready to Transform Legal Practice?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of legal professionals and clients who have revolutionized their legal experience with
              LexiPro.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#FCD34D] to-amber-600 hover:from-yellow-500 hover:to-amber-700 text-black font-bold px-12 py-4 text-lg rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/auth/signup">
                  Start Your Journey
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#FCD34D]/50 text-[#FCD34D] hover:bg-[#FCD34D]/10 hover:border-[#FCD34D] px-12 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm bg-transparent transition-all duration-300"
                asChild
              >
                <Link href="#contact">Contact Sales</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
