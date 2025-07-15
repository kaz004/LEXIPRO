"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Scale,
  Users,
  GraduationCap,
  Award,
  MapPin,
  Phone,
} from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

interface SignupFormData {
  userType: "client" | "lawyer" | ""
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string

  // Client specific
  companyName?: string

  // Lawyer specific
  firmName?: string
  barNumber?: string
  experience?: string
  specializations?: string[]
  education?: string
  location?: string

  agreeToTerms: boolean
  agreeToMarketing: boolean
}

interface FormErrors {
  [key: string]: string
}

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userTypeParam = searchParams.get("type") as "client" | "lawyer" | null

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<SignupFormData>({
    userType: userTypeParam || "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const specializations = [
    "Corporate Law",
    "Criminal Law",
    "Civil Law",
    "Family Law",
    "Employment Law",
    "Intellectual Property",
    "Real Estate",
    "Tax Law",
    "Immigration",
    "Constitutional Law",
    "Consumer Protection",
    "Environmental Law",
  ]

  const experienceLevels = ["0-2 years", "3-5 years", "6-10 years", "11-15 years", "16-20 years", "20+ years"]

  useEffect(() => {
    if (userTypeParam) {
      setFormData((prev) => ({ ...prev, userType: userTypeParam }))
    }
  }, [userTypeParam])

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    if (step === 1) {
      if (!formData.userType) newErrors.userType = "Please select user type"
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
      if (!formData.email) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
      if (!formData.phone) newErrors.phone = "Phone number is required"
      if (!formData.password) newErrors.password = "Password is required"
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    }

    if (step === 2 && formData.userType === "lawyer") {
      if (!formData.barNumber) newErrors.barNumber = "Bar registration number is required"
      if (!formData.experience) newErrors.experience = "Experience level is required"
      if (!formData.specializations?.length) newErrors.specializations = "At least one specialization is required"
      if (!formData.location) newErrors.location = "Location is required"
    }

    if (step === 3) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof SignupFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const toggleSpecialization = (specialization: string) => {
    const current = formData.specializations || []
    const updated = current.includes(specialization)
      ? current.filter((s) => s !== specialization)
      : [...current, specialization]

    handleInputChange("specializations", updated)
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect based on user type
      if (formData.userType === "lawyer") {
        router.push("/lawyer/dashboard")
      } else {
        router.push("/client/dashboard")
      }
    } catch (error) {
      setErrors({ general: "An error occurred during registration" })
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++

    if (strength <= 2) return { strength: strength * 20, label: "Weak", color: "bg-red-500" }
    if (strength <= 3) return { strength: strength * 20, label: "Fair", color: "bg-yellow-500" }
    if (strength <= 4) return { strength: strength * 20, label: "Good", color: "bg-blue-500" }
    return { strength: 100, label: "Strong", color: "bg-green-500" }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const totalSteps = formData.userType === "lawyer" ? 3 : 2

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#FCD34D]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl relative z-10"
      >
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border-[#FCD34D]/20 shadow-2xl">
          <CardHeader className="text-center pb-8 pt-8">
            <div className="flex justify-center mb-6">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#FCD34D] to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Scale className="w-7 h-7 text-black" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    LexiPro
                  </span>
                  <span className="text-xs text-[#FCD34D] font-medium -mt-1">Legal OS</span>
                </div>
              </Link>
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-3">Join LexiPro</CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              {formData.userType === "lawyer"
                ? "Create your lawyer profile and start connecting with clients"
                : formData.userType === "client"
                  ? "Create your account and find the perfect lawyer for your needs"
                  : "Choose your account type to get started"}
            </CardDescription>

            {/* Progress Indicator */}
            {formData.userType && (
              <div className="flex justify-center mt-6">
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <div key={i} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          currentStep > i + 1
                            ? "bg-[#FCD34D] text-black"
                            : currentStep === i + 1
                              ? "bg-[#FCD34D] text-black"
                              : "bg-gray-600 text-gray-300"
                        }`}
                      >
                        {currentStep > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                      </div>
                      {i < totalSteps - 1 && (
                        <div
                          className={`w-8 h-0.5 mx-1 transition-all duration-300 ${
                            currentStep > i + 1 ? "bg-[#FCD34D]" : "bg-gray-600"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{errors.general}</p>
              </motion.div>
            )}

            {/* Step 1: Basic Information & User Type */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {!formData.userType && (
                  <div className="space-y-4">
                    <Label className="text-white font-medium text-lg">I am a...</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card
                        className={`cursor-pointer transition-all duration-300 ${
                          formData.userType === "client"
                            ? "border-[#FCD34D] bg-[#FCD34D]/10"
                            : "border-gray-700 hover:border-[#FCD34D]/50"
                        }`}
                        onClick={() => handleInputChange("userType", "client")}
                      >
                        <CardContent className="p-6 text-center">
                          <Users className="w-12 h-12 text-[#FCD34D] mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-white mb-2">Client</h3>
                          <p className="text-gray-400 text-sm">I need legal help and want to find a lawyer</p>
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer transition-all duration-300 ${
                          formData.userType === "lawyer"
                            ? "border-[#FCD34D] bg-[#FCD34D]/10"
                            : "border-gray-700 hover:border-[#FCD34D]/50"
                        }`}
                        onClick={() => handleInputChange("userType", "lawyer")}
                      >
                        <CardContent className="p-6 text-center">
                          <Scale className="w-12 h-12 text-[#FCD34D] mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-white mb-2">Lawyer</h3>
                          <p className="text-gray-400 text-sm">I am a legal professional looking for clients</p>
                        </CardContent>
                      </Card>
                    </div>
                    {errors.userType && <p className="text-red-400 text-sm">{errors.userType}</p>}
                  </div>
                )}

                {formData.userType && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-white font-medium">
                          First Name *
                        </Label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="firstName"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className={`pl-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400 ${
                              errors.firstName ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-white font-medium">
                          Last Name *
                        </Label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className={`pl-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400 ${
                              errors.lastName ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white font-medium">
                        Email Address *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`pl-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400 ${
                            errors.email ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white font-medium">
                        Phone Number *
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="phone"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className={`pl-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400 ${
                            errors.phone ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
                    </div>

                    {formData.userType === "client" && (
                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-white font-medium">
                          Company Name (Optional)
                        </Label>
                        <div className="relative">
                          <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="companyName"
                            placeholder="Your Company Ltd."
                            value={formData.companyName || ""}
                            onChange={(e) => handleInputChange("companyName", e.target.value)}
                            className="pl-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white font-medium">
                        Password *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className={`pl-12 pr-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400 ${
                            errors.password ? "border-red-500" : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {formData.password && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Password strength:</span>
                            <span
                              className={`font-medium ${
                                passwordStrength.label === "Strong"
                                  ? "text-green-400"
                                  : passwordStrength.label === "Good"
                                    ? "text-blue-400"
                                    : passwordStrength.label === "Fair"
                                      ? "text-yellow-400"
                                      : "text-red-400"
                              }`}
                            >
                              {passwordStrength.label}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                              style={{ width: `${passwordStrength.strength}%` }}
                            />
                          </div>
                        </div>
                      )}
                      {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white font-medium">
                        Confirm Password *
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className={`pl-12 pr-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400 ${
                            errors.confirmPassword ? "border-red-500" : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Step 2: Professional Information (Lawyers only) */}
            {currentStep === 2 && formData.userType === "lawyer" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firmName" className="text-white font-medium">
                      Law Firm/Practice Name
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="firmName"
                        placeholder="Your Law Firm"
                        value={formData.firmName || ""}
                        onChange={(e) => handleInputChange("firmName", e.target.value)}
                        className="pl-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="barNumber" className="text-white font-medium">
                      Bar Registration Number *
                    </Label>
                    <div className="relative">
                      <Award className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="barNumber"
                        placeholder="BAR/2024/12345"
                        value={formData.barNumber || ""}
                        onChange={(e) => handleInputChange("barNumber", e.target.value)}
                        className={`pl-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400 ${
                          errors.barNumber ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.barNumber && <p className="text-red-400 text-sm">{errors.barNumber}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white font-medium">Years of Experience *</Label>
                    <Select
                      value={formData.experience || ""}
                      onValueChange={(value) => handleInputChange("experience", value)}
                    >
                      <SelectTrigger
                        className={`h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white ${
                          errors.experience ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-[#FCD34D]/20">
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.experience && <p className="text-red-400 text-sm">{errors.experience}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white font-medium">
                      Primary Location *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="location"
                        placeholder="Mumbai, Maharashtra"
                        value={formData.location || ""}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className={`pl-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400 ${
                          errors.location ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.location && <p className="text-red-400 text-sm">{errors.location}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education" className="text-white font-medium">
                    Education
                  </Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="education"
                      placeholder="e.g., Harvard Law School, National Law School"
                      value={formData.education || ""}
                      onChange={(e) => handleInputChange("education", e.target.value)}
                      className="pl-12 h-12 bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-white font-medium">Areas of Specialization *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {specializations.map((specialization) => (
                      <div key={specialization} className="flex items-center space-x-2">
                        <Checkbox
                          id={specialization}
                          checked={formData.specializations?.includes(specialization) || false}
                          onCheckedChange={() => toggleSpecialization(specialization)}
                          className="border-[#FCD34D]/30 data-[state=checked]:bg-[#FCD34D] data-[state=checked]:border-[#FCD34D]"
                        />
                        <Label htmlFor={specialization} className="text-gray-300 text-sm cursor-pointer">
                          {specialization}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.specializations && <p className="text-red-400 text-sm">{errors.specializations}</p>}
                </div>

                {formData.specializations && formData.specializations.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-white font-medium">Selected Specializations:</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.specializations.map((spec) => (
                        <Badge key={spec} className="bg-[#FCD34D]/20 text-[#FCD34D] border-[#FCD34D]/30">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Final Step: Terms and Conditions */}
            {((currentStep === 2 && formData.userType === "client") ||
              (currentStep === 3 && formData.userType === "lawyer")) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                      className={`mt-1 border-[#FCD34D]/30 data-[state=checked]:bg-[#FCD34D] data-[state=checked]:border-[#FCD34D] ${
                        errors.agreeToTerms ? "border-red-500" : ""
                      }`}
                    />
                    <Label htmlFor="agreeToTerms" className="text-gray-300 text-sm leading-relaxed cursor-pointer">
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#FCD34D] hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#FCD34D] hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {errors.agreeToTerms && <p className="text-red-400 text-sm ml-7">{errors.agreeToTerms}</p>}

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreeToMarketing"
                      checked={formData.agreeToMarketing}
                      onCheckedChange={(checked) => handleInputChange("agreeToMarketing", checked)}
                      className="mt-1 border-[#FCD34D]/30 data-[state=checked]:bg-[#FCD34D] data-[state=checked]:border-[#FCD34D]"
                    />
                    <Label htmlFor="agreeToMarketing" className="text-gray-300 text-sm leading-relaxed cursor-pointer">
                      I would like to receive updates about new features, legal insights, and promotional offers
                    </Label>
                  </div>
                </div>

                <div className="bg-[#FCD34D]/10 border border-[#FCD34D]/20 rounded-lg p-6">
                  <h4 className="font-semibold text-[#FCD34D] mb-3">What's next?</h4>
                  <div className="space-y-2 text-gray-300 text-sm">
                    {formData.userType === "lawyer" ? (
                      <>
                        <p>• Your profile will be reviewed for verification (usually within 24 hours)</p>
                        <p>• Once approved, you can start bidding on cases and connecting with clients</p>
                        <p>• Set up your profile, rates, and availability</p>
                        <p>• Start building your reputation on the platform</p>
                      </>
                    ) : (
                      <>
                        <p>• Your account will be activated immediately</p>
                        <p>• You can start posting cases and browsing lawyers</p>
                        <p>• Receive competitive bids from verified lawyers</p>
                        <p>• Choose the perfect lawyer for your legal needs</p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="border-[#FCD34D]/30 text-[#FCD34D] hover:bg-[#FCD34D]/10 bg-transparent"
                >
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold disabled:opacity-50"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                  {!isLoading && <CheckCircle className="w-4 h-4 ml-2" />}
                </Button>
              )}
            </div>

            <Separator className="my-6 bg-[#FCD34D]/20" />

            <div className="text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#FCD34D] hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
