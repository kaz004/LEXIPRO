"use client"

import Link from "next/link"
import { Scale, Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-[#0B0F19] border-t border-[#FCD34D]/20 py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
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
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
              The world's most advanced AI-powered legal operating system and marketplace. Transforming legal practice
              with intelligent automation and blockchain technology.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-[#FCD34D]" />
                <span>contact@lexipro.ai</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-[#FCD34D]" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-[#FCD34D]" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Product</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/features/ai-assistant" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/features/documents" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  Document Generator
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/features/story-mode" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  Story Mode
                </Link>
              </li>
              <li>
                <Link href="/features/blockchain" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  Blockchain
                </Link>
              </li>
              <li>
                <Link href="/labs" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  AI Labs
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Solutions</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/solutions/lawyers" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  For Lawyers
                </Link>
              </li>
              <li>
                <Link href="/solutions/clients" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  For Clients
                </Link>
              </li>
              <li>
                <Link href="/solutions/firms" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  For Law Firms
                </Link>
              </li>
              <li>
                <Link href="/solutions/enterprise" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  Enterprise
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  API Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-300 hover:text-[#FCD34D] transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-[#FCD34D]/20 pt-12 mb-12">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">Get the latest updates on legal tech and AI innovations</p>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800/50 border-[#FCD34D]/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-gradient-to-r from-[#FCD34D] to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#FCD34D]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 LexiPro Legal OS. All rights reserved.</p>

            {/* Social Links */}
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-[#FCD34D] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FCD34D] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FCD34D] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FCD34D] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-8 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-[#FCD34D] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-[#FCD34D] transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-[#FCD34D] transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
