import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BubbleBackground } from "@/components/bubble-background"

export default function TermsPage() {
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
            Terms & Conditions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Please read these terms carefully before using FITIFFIN's services.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-8 md:py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Service Overview */}
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">1. Service Overview</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              FITIFFIN is a technology & operations platform that connects corporate clients with partner cloud kitchens. FITIFFIN does not cook food itself.
            </p>
          </Card>

          {/* Orders & Subscriptions */}
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">2. Orders & Subscriptions</h2>
            <ul className="space-y-2 md:space-y-3 text-base md:text-lg text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>All corporate orders are subscription-based.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Menu cycles are shared in advance.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Any modifications must be requested 72 hours prior.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>The modifications will only be done if above 30 Percent of the total orders has to be changed.</span>
              </li>
            </ul>
          </Card>

          {/* Pricing & Payments */}
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">3. Pricing & Payments</h2>
            <ul className="space-y-2 md:space-y-3 text-base md:text-lg text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Prices are agreed contractually with corporate clients.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Invoices are raised monthly.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Payments must be cleared within the agreed credit period.</span>
              </li>
            </ul>
          </Card>

          {/* Delivery & Delays */}
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">4. Delivery & Delays</h2>
            <ul className="space-y-2 md:space-y-3 text-base md:text-lg text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Delivery timelines depends on FITIFFIN.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>FITIFFIN is liable for delays caused by traffic, force majeure, or third-party logistics.</span>
              </li>
            </ul>
          </Card>

          {/* Food Quality & Liability */}
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">5. Food Quality & Liability</h2>
            <ul className="space-y-2 md:space-y-3 text-base md:text-lg text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Food is prepared by partner kitchens following FSSAI & FITIFFIN hygiene SOPs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>FITIFFIN is not responsible for individual allergies or medical reactions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Any quality issue must be reported within 2 hours of delivery.</span>
              </li>
            </ul>
          </Card>

          {/* Termination */}
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 md:mb-4">6. Termination</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              FITIFFIN reserves the right to suspend or terminate any account for policy violation, misuse or non-payment.
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

