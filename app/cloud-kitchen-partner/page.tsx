"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Check, Building2, UtensilsCrossed, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CloudKitchenPartnerPage() {
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    phone: "",
    kitchenName: "",
    city: "",
    address: "",
    capacity: "",
    cuisines: "",
    fssaiLicense: "",
    experience: "",
    currentOrders: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.ownerName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.kitchenName.trim() ||
      !formData.city.trim() ||
      !formData.address.trim() ||
      !formData.capacity.trim() ||
      !formData.cuisines.trim()
    ) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/cloud-kitchen-partner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          ownerName: "",
          email: "",
          phone: "",
          kitchenName: "",
          city: "",
          address: "",
          capacity: "",
          cuisines: "",
          fssaiLicense: "",
          experience: "",
          currentOrders: "",
          message: "",
        })
      } else {
        const data = await response.json()
        alert(data.error || "Failed to submit. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image 
              src="/WhatsApp_Image_2025-12-27_at_6.13.22_PM__1_-removebg-preview.png" 
              alt="FiTiffin Logo" 
              width={120} 
              height={40} 
              className="h-10 w-auto" 
            />
          </Link>
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
            Partner With FiTiffin
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Join our network of trusted cloud kitchen partners. Grow your business by serving corporate clients through
            FiTiffin's platform.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Why Partner With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Steady Orders",
                description: "Get consistent corporate orders that fill your capacity and boost revenue.",
              },
              {
                icon: Users,
                title: "Scale Your Business",
                description: "Access our network of 500+ companies and 50K+ employees across India.",
              },
              {
                icon: Building2,
                title: "Zero Marketing Cost",
                description: "We handle customer acquisition. You focus on what you do best—cooking.",
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <Card key={idx} className="p-8 border border-border bg-card/50 backdrop-blur-sm">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {!isSuccess ? (
            <Card className="p-8 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Get Started</h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and our partnership team will contact you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Owner Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Owner/Manager Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
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

                {/* Kitchen Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Cloud Kitchen Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="kitchenName"
                    value={formData.kitchenName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Your kitchen name"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
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

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Kitchen Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Full address of your cloud kitchen"
                  />
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Daily Meal Capacity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="e.g., 100-200 meals per day"
                  />
                </div>

                {/* Cuisines */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Cuisines You Specialize In <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="cuisines"
                    value={formData.cuisines}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="e.g., North Indian, South Indian, Continental, Healthy"
                  />
                </div>

                {/* FSSAI License */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">FSSAI License Number</label>
                  <input
                    type="text"
                    name="fssaiLicense"
                    value={formData.fssaiLicense}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="FSSAI license number (if available)"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Years of Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>

                {/* Current Orders */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Current Daily Order Volume
                  </label>
                  <input
                    type="text"
                    name="currentOrders"
                    value={formData.currentOrders}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="e.g., 50-100 orders per day"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Additional Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Tell us more about your kitchen, specialties, or any questions..."
                  />
                </div>

                {/* Privacy Notice */}
                <div className="bg-secondary/30 border border-border rounded-lg p-4">
                  <p className="text-xs text-muted-foreground text-center">
                    Your information will be used solely for partnership discussions. We respect your privacy.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-accent text-primary-foreground rounded-full text-base h-12 font-medium"
                >
                  {isSubmitting ? "Submitting..." : "Submit Partnership Request"}
                </Button>
              </form>
            </Card>
          ) : (
            <Card className="p-8 md:p-12 border border-border bg-card/50 backdrop-blur-sm text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Check className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Thank You!</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Your partnership request has been received. Our team will review your information and reach out within
                24 hours to discuss partnership opportunities.
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
                <p className="text-sm font-medium text-foreground mb-2">Next Steps:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ We'll review your kitchen details</li>
                  <li>✓ Schedule a call to discuss partnership terms</li>
                  <li>✓ Onboard you to our partner network</li>
                  <li>✓ Start sending corporate orders your way</li>
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
      </section>
    </main>
  )
}

