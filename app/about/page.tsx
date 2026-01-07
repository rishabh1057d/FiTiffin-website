import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Mail, Check, Target, Users, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BubbleBackground } from "@/components/bubble-background"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background relative">
      {/* Bubble Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BubbleBackground 
          interactive={true}
          className="w-full h-full opacity-50"
        />
      </div>
      
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image 
              src="/WhatsApp_Image_2025-12-27_at_6.13.22_PM__1_-removebg-preview.png" 
              alt="FiTiffin Logo" 
              width={260} 
              height={80} 
              className="h-10 md:h-14 w-auto max-w-[170px] md:max-w-[260px]" 
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

      {/* Header */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight text-balance">
            About FITIFFIN
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            India's first corporate-focused healthy meal distribution platform built on a strong partnership model with verified cloud kitchens.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-8 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="p-2 md:p-3 rounded-lg bg-primary/10 text-primary">
                <Users className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Who We Are</h2>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6">
              FITIFFIN is India's first corporate-focused healthy meal distribution platform built on a strong partnership model with verified cloud kitchens.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6">
              Instead of running our own kitchen, we collaborate with multiple quality-controlled cloud kitchens across cities to deliver affordable, hygienic and nutritionally balanced meals to offices, corporate parks, and enterprises.
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 md:p-6">
              <p className="text-base md:text-lg font-semibold text-foreground">
                Our goal is simple: Make healthy eating effortless at workplaces.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-8 md:py-20 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="p-2 md:p-3 rounded-lg bg-primary/10 text-primary">
                <Target className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">What We Do</h2>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6">
              We act as the bridge between:
            </p>
            <ul className="space-y-3 md:space-y-4 mb-4 md:mb-6">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                <p className="text-base md:text-lg text-muted-foreground">Companies looking to provide daily meals to employees</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                <p className="text-base md:text-lg text-muted-foreground">Reliable cloud kitchens that can cook and pack at scale</p>
              </li>
            </ul>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              FITIFFIN handles the onboarding, quality standards, subscription management, billing, menu curation, corporate support and reliable delivery — so both sides can focus on what they do best.
            </p>
          </Card>
        </div>
      </section>

      {/* Why FITIFFIN Exists Section */}
      <section className="py-8 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="p-2 md:p-3 rounded-lg bg-primary/10 text-primary">
                <Shield className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Why FITIFFIN Exists</h2>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6">
              Corporate meal programs in India are broken — inconsistent quality, unreliable vendors, and poor nutrition standards.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6">
              We fixed this by building a centralized platform that:
            </p>
            <div className="space-y-2 md:space-y-3">
              {[
                "Curates menus with diet options",
                "Maintains kitchen hygiene & SOP checks",
                "Ensures standard portioning & pricing",
                "Provides single-point corporate billing",
                "Enables scale without infrastructure burden",
                "Provides on time delivery"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-8 md:py-20 px-6 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-6">Our Vision</h2>
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
              To become India's most trusted corporate meal partner — improving employee health, productivity and satisfaction one tiffin at a time.
            </p>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 border border-border bg-primary/5 backdrop-blur-sm text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Get in Touch</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions? Our team is ready to help you transform your workplace wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <a
                href="mailto:business@fitiffin.com"
                className="flex items-center gap-2 justify-center px-6 py-3 rounded-full border border-border bg-background hover:bg-secondary transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">business@fitiffin.com</span>
              </a>
              <a
                href="mailto:info@fitiffin.com"
                className="flex items-center gap-2 justify-center px-6 py-3 rounded-full border border-border bg-background hover:bg-secondary transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">info@fitiffin.com</span>
              </a>
            </div>
            <Link href="/lead-capture">
              <Button size="lg" className="bg-primary hover:bg-accent text-primary-foreground rounded-full">
                Schedule a Call
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 bg-card">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-2">
              <Image 
                src="/WhatsApp_Image_2025-12-27_at_6.13.22_PM__1_-removebg-preview.png" 
                alt="FiTiffin Logo" 
                width={260} 
                height={80} 
                className="h-10 md:h-14 w-auto max-w-[170px] md:max-w-[260px]" 
              />
            </div>
            <p className="text-sm text-muted-foreground">Healthy lunches for modern workplaces.</p>
            <div className="mt-4 space-y-2">
              <p className="text-xs text-muted-foreground">Founded by Ashank & Aditya</p>
              <div className="space-y-1">
                <a
                  href="mailto:business@fitiffin.com"
                  className="text-xs text-primary hover:text-accent transition-colors block"
                >
                  business@fitiffin.com
                </a>
                <a
                  href="mailto:info@fitiffin.com"
                  className="text-xs text-primary hover:text-accent transition-colors block"
                >
                  info@fitiffin.com
                </a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/menu" className="hover:text-foreground transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Pilot Program
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/cloud-kitchen-partner" className="hover:text-foreground transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a href="mailto:info@fitiffin.com" className="hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 FiTiffin. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
