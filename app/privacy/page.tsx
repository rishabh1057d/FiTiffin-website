import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Check, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BubbleBackground } from "@/components/bubble-background"

export default function PrivacyPage() {
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
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight text-balance mb-4 md:mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            FITIFFIN respects your privacy.
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-8 md:py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Data Collection */}
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <Lock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Data We Collect</h2>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3 md:mb-4">
              We collect the following data:
            </p>
            <ul className="space-y-2 md:space-y-3 text-base md:text-lg text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Name, email, phone number</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Company name & delivery address</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Subscription preferences</span>
              </li>
            </ul>
          </Card>

          {/* How We Use Data */}
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">How We Use Your Data</h2>
            <div className="space-y-2 md:space-y-3">
              {[
                "To manage subscriptions",
                "For order processing",
                "For customer support",
                "For internal quality audits"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Data Security */}
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">Data Security</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3 md:mb-4">
              All data is stored securely.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              We never sell or share your personal information with third parties except our kitchen & logistics partners for service fulfillment.
            </p>
          </Card>

          {/* Cookies */}
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">Cookies</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              We use cookies to enhance website performance and user experience.
            </p>
          </Card>

          {/* Consent */}
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">Consent</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              By using FITIFFIN's website or services, you consent to this privacy policy.
            </p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 bg-card mt-20">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 FiTiffin. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

