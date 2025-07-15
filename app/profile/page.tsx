"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Edit,
  Camera,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Star,
  FileText,
  Clock,
  Users,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { formatDate } from "@/lib/utils"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@lexipro.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra, India",
    bio: "Senior Partner at LexiPro with 15+ years of experience in corporate law, specializing in mergers & acquisitions, contract negotiations, and regulatory compliance. Passionate about leveraging technology to improve legal services.",
    title: "Senior Partner",
    company: "LexiPro Legal Services",
    experience: "15+ years",
    specializations: ["Corporate Law", "M&A", "Contract Law", "Regulatory Compliance"],
    education: [
      {
        degree: "Master of Laws (LL.M.)",
        institution: "Harvard Law School",
        year: "2008",
        specialization: "Corporate Law",
      },
      {
        degree: "Bachelor of Laws (LL.B.)",
        institution: "National Law School of India University",
        year: "2006",
        specialization: "General Law",
      },
    ],
    certifications: [
      {
        name: "Certified Corporate Lawyer",
        issuer: "Bar Council of India",
        year: "2009",
      },
      {
        name: "International Arbitration Certificate",
        issuer: "London Court of International Arbitration",
        year: "2015",
      },
    ],
    achievements: [
      {
        title: "Top Legal Professional 2023",
        description: "Recognized as one of the top legal professionals in corporate law",
        year: "2023",
      },
      {
        title: "Excellence in Client Service",
        description: "Awarded for outstanding client satisfaction and service delivery",
        year: "2022",
      },
    ],
  })

  const stats = [
    {
      label: "Total Cases",
      value: "247",
      icon: FileText,
      color: "text-blue-400",
    },
    {
      label: "Success Rate",
      value: "94%",
      icon: Award,
      color: "text-green-400",
    },
    {
      label: "Active Clients",
      value: "56",
      icon: Users,
      color: "text-yellow-400",
    },
    {
      label: "Years Experience",
      value: "15+",
      icon: Clock,
      color: "text-purple-400",
    },
  ]

  const recentActivity = [
    {
      type: "case",
      title: "Contract Review Completed",
      description: "Successfully reviewed and finalized ABC Corp contract",
      date: "2024-01-12",
      status: "completed",
    },
    {
      type: "meeting",
      title: "Client Consultation",
      description: "Strategic planning session with TechStart Inc.",
      date: "2024-01-11",
      status: "completed",
    },
    {
      type: "document",
      title: "Legal Opinion Drafted",
      description: "Prepared comprehensive legal opinion on regulatory compliance",
      date: "2024-01-10",
      status: "completed",
    },
  ]

  const handleSave = () => {
    console.log("Saving profile:", profile)
    setIsEditing(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
            <p className="text-gray-400">Manage your professional profile and information</p>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
          >
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" />
                  <AvatarFallback className="bg-yellow-400 text-black text-3xl font-bold">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {profile.firstName} {profile.lastName}
                    </h2>
                    <p className="text-yellow-400 font-medium mb-2">{profile.title}</p>
                    <p className="text-gray-400">{profile.company}</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 w-fit">Active</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Briefcase className="w-4 h-4" />
                    <span>{profile.experience} experience</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Joined Jan 2020</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-r from-white/10 to-white/5 ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="experience"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
            >
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              Education
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
              <CardHeader>
                <CardTitle className="text-white">Professional Bio</CardTitle>
                <CardDescription className="text-gray-400">
                  Tell others about your professional background and expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white min-h-32"
                  />
                ) : (
                  <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
              <CardHeader>
                <CardTitle className="text-white">Specializations</CardTitle>
                <CardDescription className="text-gray-400">Areas of legal expertise and practice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((spec, index) => (
                    <Badge key={index} className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Achievements & Awards
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Recognition and accomplishments in your legal career
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.achievements.map((achievement, index) => (
                    <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium">{achievement.title}</h4>
                        <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                          {achievement.year}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Certifications
                </CardTitle>
                <CardDescription className="text-gray-400">Professional certifications and licenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.certifications.map((cert, index) => (
                    <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium">{cert.name}</h4>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{cert.year}</Badge>
                      </div>
                      <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-yellow-400" />
                  Education
                </CardTitle>
                <CardDescription className="text-gray-400">Academic background and qualifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-white font-medium">{edu.degree}</h4>
                          <p className="text-yellow-400 text-sm">{edu.institution}</p>
                          <p className="text-gray-400 text-sm">{edu.specialization}</p>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{edu.year}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-yellow-400/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Your recent professional activities and milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-white font-medium">{activity.title}</h4>
                          <p className="text-gray-400 text-sm">{activity.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-1">
                            {activity.status}
                          </Badge>
                          <p className="text-gray-500 text-xs">{formatDate(activity.date)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
