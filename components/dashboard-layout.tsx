"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Briefcase,
  Users,
  Calendar,
  MessageSquare,
  BarChart2,
  FileText,
  Settings,
  Brain,
  Gavel,
  Handshake,
  Menu,
  X,
  TrendingUp,
  Target,
  BookOpen,
  Shield,
  User,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context" // Import useAuth

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth() // Get user from auth context

  // Determine userType based on authenticated user's role
  // FIX: Changed user?.role to user?.type to match AuthContext's User interface
  const currentUserType = user?.type === "lawyer" ? "lawyer" : "client" // Default to client if no user or type

  const navItems =
    currentUserType === "client"
      ? [
          { href: "/client/dashboard", icon: Home, label: "Dashboard" },
          { href: "/client/ai-assistant", icon: Brain, label: "AI Assistant" },
          { href: "/client/cases", icon: Briefcase, label: "My Cases" },
          { href: "/client/marketplace", icon: Handshake, label: "Lawyer Marketplace" },
          { href: "/client/messages", icon: MessageSquare, label: "Messages" },
          { href: "/client/post-case", icon: Gavel, label: "Post a Case" },
          { href: "/document-generator", icon: FileText, label: "Document Generator" }, // Added for client
          { href: "/settings", icon: Settings, label: "Settings" },
        ]
      : [
          { href: "/lawyer/dashboard", icon: Home, label: "Dashboard" },
          { href: "/ai-assistant", icon: Brain, label: "AI Assistant" }, // Link to shared AI Assistant
          { href: "/lawyer/cases", icon: Briefcase, label: "My Cases" },
          { href: "/lawyer/clients", icon: Users, label: "My Clients" },
          { href: "/lawyer/appointments", icon: Calendar, label: "Appointments" },
          { href: "/lawyer/messages", icon: MessageSquare, label: "Messages" },
          { href: "/lawyer/marketplace", icon: Handshake, label: "Case Marketplace" },
          { href: "/lawyer/document-generator", icon: FileText, label: "Document Generator" }, // Link to lawyer-specific document generator path
          { href: "/lawyer/analytics", icon: BarChart2, label: "Analytics" },
          { href: "/settings", icon: Settings, label: "Settings" },
        ]

  const labsItems = [
    { href: "/labs/predictor", icon: TrendingUp, label: "Outcome Predictor" },
    { href: "/labs/triage", icon: Target, label: "Legal Triage" },
    { href: "/story-mode", icon: BookOpen, label: "AI Story Mode" },
    { href: "/blockchain", icon: Shield, label: "Blockchain Ledger" },
    { href: "/virtual-courtroom", icon: Gavel, label: "Virtual Courtroom" },
    { href: "/case-analytics", icon: BarChart2, label: "Case Analytics" },
  ]

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href))

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-gray-950 text-gray-50">
      {/* Sidebar for Desktop */}
      <div className="hidden lg:block border-r border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="flex h-full max-h-screen flex-col gap-4 py-6">
          <div className="flex items-center justify-center px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold text-2xl text-white">
              <Gavel className="h-6 w-6 text-yellow-400" />
              <span>LexiPro</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-yellow-400 ${
                    isActive(item.href) ? "bg-gray-800 text-yellow-400" : "text-gray-400"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              <Separator className="my-4 bg-gray-700" />
              <h3 className="px-3 py-2 text-xs font-semibold uppercase text-gray-500">Labs & Tools</h3>
              {labsItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-yellow-400 ${
                    isActive(item.href) ? "bg-gray-800 text-yellow-400" : "text-gray-400"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col">
        {/* Header for Mobile and Desktop */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm px-4 lg:px-6">
          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-400 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col bg-gray-950 border-gray-800">
              <div className="flex items-center justify-between px-4 py-6">
                <Link href="/" className="flex items-center gap-2 font-semibold text-2xl text-white">
                  <Gavel className="h-6 w-6 text-yellow-400" />
                  <span>LexiPro</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X className="h-6 w-6 text-gray-400" />
                </Button>
              </div>
              <nav className="grid gap-2 text-lg font-medium px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                      isActive(item.href) ? "bg-gray-800 text-yellow-400" : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
                <Separator className="my-2 bg-gray-700" />
                <h3 className="px-3 py-2 text-xs font-semibold uppercase text-gray-500">Labs & Tools</h3>
                {labsItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                      isActive(item.href) ? "bg-gray-800 text-yellow-400" : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Search Bar (Desktop) */}
          <div className="w-full flex-1">
            {/* <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-gray-800/50 border-gray-700 pl-8 md:w-[200px] lg:w-[336px] text-white"
              />
            </div>
          </form> */}
          </div>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-gray-700 w-9 h-9 text-gray-400 hover:text-white"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || "/placeholder-user.jpg"} alt="User Avatar" />
                  <AvatarFallback>{user?.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700 text-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                <Link href="/profile" className="flex items-center w-full">
                  <User className="h-4 w-4 mr-2" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer">
                <Link href="/settings" className="flex items-center w-full">
                  <Settings className="h-4 w-4 mr-2" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer text-red-400" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 flex-col gap-8 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
