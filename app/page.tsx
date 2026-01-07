"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Check, Users, Leaf, Clock, TrendingUp, Award, Zap, Phone, UtensilsCrossed, Target, ArrowUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [visibleSection, setVisibleSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/WhatsApp_Image_2025-12-27_at_6.13.22_PM__1_-removebg-preview.png"
              alt="FiTiffin Logo"
              width={260}
              height={80}
              className="h-10 md:h-14 w-auto max-w-[170px] md:max-w-[260px] hover:scale-110 transition-transform"
            />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#impact"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Impact
            </a>
            <a
              href="#benefits"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Why Us
            </a>
            <Link
              href="/menu"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Menu
            </Link>
            <Link
              href="/cloud-kitchen-partner"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Partner With Us
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/cloud-kitchen-partner">
              <Button variant="outline" className="rounded-full font-semibold border-2">
                Partner With Us
              </Button>
            </Link>
            <Link href="/lead-capture">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
                Book Demo <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Rewritten for emotional impact */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-6 inline-block animate-fade-in-up">
            <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              ✨ The Future of Corporate Wellness
            </span>
          </div>

          <h1
            className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight text-balance animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Stop Settling for Mediocre Lunches
          </h1>

          <p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty leading-relaxed font-light animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Your team deserves better than random food delivery apps. FiTiffin delivers{" "}
            <span className="font-semibold text-primary">fresh, nutritionist-designed meals</span> that fuel
            productivity, boost morale, and transform your workplace culture.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link href="/lead-capture">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full text-base h-13 px-8 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Start Free Pilot <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/cloud-kitchen-partner">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-base h-13 px-8 border-2 border-primary bg-transparent hover:bg-primary/5 font-semibold transition-all hover:scale-105"
              >
                Partner With Us
              </Button>
            </Link>
            <Link href="/menu">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-base h-13 px-8 border-2 border-primary bg-transparent hover:bg-primary/5 font-semibold transition-all hover:scale-105"
              >
                Explore Menu
              </Button>
            </Link>
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { title: "25g+", subtitle: "Protein Per Meal", accent: "from-emerald-500/15 to-emerald-500/5" },
              { title: "Fresh", subtitle: "Daily Delivery", accent: "from-lime-500/15 to-lime-500/5" },
              { title: "Custom", subtitle: "Tailored to You", accent: "from-amber-500/15 to-amber-500/5" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.accent} border border-border/70 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_28px_-14px_rgba(0,0,0,0.3)] transition-all p-4 sm:p-5 min-h-[118px] flex flex-col items-center justify-center gap-3 text-center`}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Core Benefit
            </div>
                <div className="space-y-0.5">
                  <p className="text-lg sm:text-xl font-bold text-primary leading-tight">{item.title}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.subtitle}</p>
            </div>
                <div className="absolute inset-0 rounded-2xl border border-white/40 pointer-events-none" />
            </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Showcase with animations */}
      <section className="py-16 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden border-2 border-border h-80 group animate-slide-in-left">
              <Image
                src="/images/healthy-tiffin-meals.jpg"
                alt="Beautifully plated healthy FiTiffin meals with protein and vegetables"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border-2 border-border h-80 group animate-slide-in-right">
              <Image
                src="/images/meal-preparation.jpg"
                alt="Fresh meal preparation showing quality ingredients and careful plating"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section - Rewritten */}
      <section id="impact" className="py-20 px-6 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Your Team's Lunch <span className="text-primary">Actually Matters</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Lunch isn't just food. It's a moment of community, energy, and culture. Let's get it right.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-6 animate-slide-in-left">
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Boost Productivity</h3>
                    <p className="text-sm text-muted-foreground">
                      Nutritious meals = better focus, fewer energy crashes, more output
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Build Team Culture</h3>
                    <p className="text-sm text-muted-foreground">
                      Shared meals strengthen bonds. Stronger teams = better collaboration
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 animate-slide-in-right">
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Improve Retention</h3>
                    <p className="text-sm text-muted-foreground">
                      Wellness perks show you care. Your team stays, competitors' don't
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Save Time & Money</h3>
                    <p className="text-sm text-muted-foreground">
                      No more lunch ordering chaos. Predictable costs, zero overhead
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why FiTiffin - Features */}
      <section id="benefits" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Built for Modern Teams</h2>
            <p className="text-lg text-muted-foreground">
              Not just meals. A complete wellness solution engineered for results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Leaf,
                title: "Nutritionist-Crafted",
                description:
                  "Every meal designed by nutrition experts. 25-30g protein, balanced macros, fresh daily ingredients.",
                delay: "0s",
              },
              {
                icon: Clock,
                title: "Zero Hassle Delivery",
                description: "Daily delivery to your office entrance. No coordination needed. Your team just enjoys.",
                delay: "0.1s",
              },
              {
                icon: Users,
                title: "Community First",
                description: "Meals designed to be shared. Strengthen team bonds and create lasting workplace culture.",
                delay: "0.2s",
              },
              {
                icon: TrendingUp,
                title: "Data-Driven Results",
                description: "Track satisfaction, feedback, and wellness metrics. Continuous improvement built in.",
                delay: "0.3s",
              },
              {
                icon: Check,
                title: "Fully Customizable",
                description: "Dietary preferences, allergies, vegan, keto—we handle it all. Your way, every time.",
                delay: "0.4s",
              },
              {
                icon: Award,
                title: "Premium Quality",
                description:
                  "Partnered with trusted cloud kitchens. Fresh, locally-sourced ingredients. Eco-conscious packaging. Premium experience, competitive pricing.",
                delay: "0.5s",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="p-8 rounded-xl bg-card border border-border hover:border-primary hover:shadow-lg hover:scale-105 transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: feature.delay }}
                >
                  <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4 group-hover:bg-accent/10 group-hover:text-accent transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section id="results" className="py-20 px-6 bg-gradient-to-b from-secondary/50 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Approach</h2>
            <p className="text-lg text-muted-foreground">
              We partner with trusted cloud kitchens across India to bring you fresh, nutritious meals every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border border-border bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-foreground mb-4">For Companies</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We work with your team to understand preferences, dietary needs, and wellness goals. Our network of
                partner cloud kitchens ensures fresh, nutritionist-designed meals delivered to your office daily.
              </p>
              <Link href="/lead-capture">
                <Button className="w-full rounded-full">Book Your Free Pilot</Button>
              </Link>
            </Card>

            <Card className="p-8 border border-border bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-foreground mb-4">For Cloud Kitchens</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Join our partner network and get consistent corporate orders. We handle customer acquisition, you focus
                on what you do best—creating delicious, healthy meals. Grow your business with steady revenue.
              </p>
              <Link href="/cloud-kitchen-partner">
                <Button className="w-full rounded-full">Partner With Us</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Getting Started is Simple</h2>
            <p className="text-base md:text-lg text-muted-foreground">Four steps to transform your workplace lunch culture.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                step: "1",
                title: "Book a Call",
                description: "Chat with our wellness expert. Understand your team's needs and preferences.",
                Icon: Phone,
              },
              {
                step: "2",
                title: "Customize Your Menu",
                description: "Choose meals that fit your team. Dietary options, portions, delivery schedule.",
                Icon: UtensilsCrossed,
              },
              {
                step: "3",
                title: "Start Your Pilot",
                description: "Try one week free. No commitment. Experience the difference firsthand.",
                Icon: Target,
              },
              {
                step: "4",
                title: "Grow With Us",
                description: "See the results. Scale as your team grows. Continuous improvement.",
                Icon: ArrowUp,
              },
            ].map((item, idx) => {
              const IconComponent = item.Icon
              return (
                <div key={idx} className="text-center animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="mb-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transition-all hover:scale-105">
                      <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground mb-3 text-lg md:text-xl">{item.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed px-2">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA - Bold and compelling */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none"></div>
        <div className="absolute -left-96 -top-96 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Your Team Deserves <span className="text-primary">Nutrition Worth Celebrating</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Start a free one-week pilot today. See how FiTiffin transforms your workplace—no risk, no commitment. Just
            better lunches and happier teams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lead-capture">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full text-lg h-14 px-10 font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Start Free Pilot <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/cloud-kitchen-partner">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-lg h-14 px-10 border-2 border-primary font-bold hover:bg-primary/5 transition-all hover:scale-105 bg-transparent"
              >
                Partner With Us
              </Button>
            </Link>
            <Link href="/menu">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-lg h-14 px-10 border-2 border-primary font-bold hover:bg-primary/5 transition-all hover:scale-105 bg-transparent"
              >
                See What We Serve
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-6">No credit card required. One free week. Zero obligation.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-3">
              <Image 
                src="/WhatsApp_Image_2025-12-27_at_6.13.22_PM__1_-removebg-preview.png" 
                alt="FiTiffin Logo" 
                width={180} 
                height={60} 
                className="h-10 w-auto max-w-[150px]" 
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Nourishing teams. Fueling growth. <br /> One meal at a time.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wide">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/menu" className="hover:text-primary transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Pilot Program
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/cloud-kitchen-partner" className="hover:text-primary transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wide">Get in Touch</h4>
            <p className="text-sm text-muted-foreground mb-2">Questions? We'd love to hear from you.</p>
            <div className="space-y-1">
              <a
                href="mailto:business@fitiffin.com"
                className="text-sm text-primary hover:text-accent transition-colors block font-medium"
              >
                business@fitiffin.com
              </a>
              <a
                href="mailto:info@fitiffin.com"
                className="text-sm text-primary hover:text-accent transition-colors block font-medium"
              >
                info@fitiffin.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 FiTiffin. Founded by <span className="font-semibold text-foreground">Ashank & Aditya</span>
            </p>
            <p className="text-sm text-muted-foreground">Transforming workplace wellness, one meal at a time.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
