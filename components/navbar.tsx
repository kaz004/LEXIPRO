"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Scale, Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      name: "Features",
      href: "#features",
      submenu: [
        { name: "AI Assistant", href: "/features/ai-assistant" },
        { name: "Document Generator", href: "/features/documents" },
        { name: "Marketplace", href: "/marketplace" },
        { name: "Story Mode", href: "/features/story-mode" },
        { name: "Blockchain", href: "/features/blockchain" },
      ],
    },
    {
      name: "Solutions",
      href: "#solutions",
      submenu: [
        { name: "For Lawyers", href: "/solutions/lawyers" },
        { name: "For Clients", href: "/solutions/clients" },
        { name: "For Law Firms", href: "/solutions/firms" },
        { name: "Enterprise", href: "/solutions/enterprise" },
      ],
    },
    { name: "Pricing", href: "#pricing" },
    { name: "AI Labs", href: "/labs" },
    { name: "About", href: "/about" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0B0F19]/80 backdrop-blur-md border-b border-[#FCD34D]/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className="flex items-center text-gray-300 hover:text-[#FCD34D] transition-colors duration-200 font-medium">
                    {item.name}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#0B0F19]/95 backdrop-blur-md border border-[#FCD34D]/20">
                    {item.submenu.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link
                          href={subItem.href}
                          className="text-gray-300 hover:text-[#FCD34D] transition-colors duration-200"
                        >
                          {subItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-[#FCD34D] transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-[#FCD34D] hover:bg-[#FCD34D]/10" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold shadow-lg hover:shadow-[#FCD34D]/25 transition-all duration-300"
              asChild
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:text-[#FCD34D]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B0F19]/95 backdrop-blur-md border-t border-[#FCD34D]/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-gray-300 hover:text-[#FCD34D] transition-colors duration-200 font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 space-y-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block text-gray-400 hover:text-[#FCD34D] transition-colors duration-200 text-sm py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-3 border-t border-[#FCD34D]/20">
                <Button
                  variant="ghost"
                  className="w-full text-white hover:text-[#FCD34D] hover:bg-[#FCD34D]/10"
                  asChild
                >
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                  asChild
                >
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
