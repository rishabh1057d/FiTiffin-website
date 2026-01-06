"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LeadCapturePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    companySize: "",
    city: "",
    contactMethod: "email",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.company.trim() ||
      !formData.role.trim() ||
      !formData.companySize.trim() ||
      !formData.city.trim() ||
      !formData.contactMethod.trim()
    ) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          role: "",
          companySize: "",
          city: "",
          contactMethod: "email",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      {/* Back Link */}
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">Back to Home</span>
      </Link>

      <div className="w-full max-w-4xl">
        {!isSuccess ? (
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Hero Side Image */}
            <div className="hidden md:block relative rounded-2xl overflow-hidden border border-border">
              <Image
                src="/images/office-wellness.jpg"
                alt="Office team enjoying healthy FiTiffin lunches"
                fill
                className="object-cover"
              />
            </div>

            <Card className="p-8 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">Let's get started</h1>
                <p className="text-lg text-muted-foreground">
                  Tell us about your team and wellness goals. We'll follow up within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Work Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="you@company.com"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Your company"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Your Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="">Select your role</option>
                    <option value="hr">HR Manager</option>
                    <option value="ops">Operations Head</option>
                    <option value="exec">Executive</option>
                    <option value="admin">Admin</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Company Size */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company Size</label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="">Select company size</option>
                    <option value="10-50">10-50 employees</option>
                    <option value="50-100">50-100 employees</option>
                    <option value="100-500">100-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Your city"
                  />
                </div>

                {/* Contact Method */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Preferred Contact Method</label>
                  <select
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="">Select preferred method</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                {/* Privacy Notice */}
                <div className="bg-secondary/30 border border-border rounded-lg p-4">
                  <p className="text-xs text-muted-foreground text-center">
                    We respect your privacy. Your information will be used solely for FiTiffin business inquiries. No
                    spam, ever.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-accent text-primary-foreground rounded-full text-base h-12 font-medium"
                >
                  {isSubmitting ? "Submitting..." : "Book Your Free Pilot"}
                </Button>
              </form>
            </Card>
          </div>
        ) : (
          <Card className="p-8 md:p-12 border border-border bg-card/50 backdrop-blur-sm text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Check className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Thank you!</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Your request has been received. Our team will review your information and reach out within 24 hours to
              discuss your team's wellness goals and schedule your free pilot week.
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
              <p className="text-sm font-medium text-foreground mb-2">Next Steps:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ We'll contact you via {formData.contactMethod}</li>
                <li>✓ Schedule a 20-minute consultation call</li>
                <li>✓ Customize your pilot program</li>
                <li>✓ Start delivering healthy lunches to your team</li>
              </ul>
            </div>
            <Link href="/">
              <Button variant="outline" className="rounded-full bg-transparent border-border">
                Return to Home
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </main>
  )
}
