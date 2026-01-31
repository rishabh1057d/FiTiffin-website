import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Phone, UtensilsCrossed, Target, ArrowUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BubbleBackground } from "@/components/bubble-background"

const steps = [
  {
    step: "1",
    title: "Book a Call",
    description:
      "Chat with our wellness expert. Understand your team's needs, preferences, and dietary requirements. We'll discuss your goals and how FiTiffin can help.",
    Icon: Phone,
  },
  {
    step: "2",
    title: "Customize Your Menu",
    description:
      "Choose meals that fit your team. Dietary options, portions, delivery schedule — we tailor everything to your workplace culture and nutrition goals.",
    Icon: UtensilsCrossed,
  },
  {
    step: "3",
    title: "Start Your Pilot",
    description:
      "Try one week free. No commitment. Experience the difference firsthand. See how our meals transform your team's energy and satisfaction.",
    Icon: Target,
  },
  {
    step: "4",
    title: "Grow With Us",
    description:
      "See the results. Scale as your team grows. Continuous improvement, feedback loops, and a partnership that evolves with your needs.",
    Icon: ArrowUp,
  },
]

export default function HowItWorksPage() {
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
            Getting Started is Simple
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Four steps to transform your workplace lunch culture. From first call to daily deliveries — we make it easy.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-8 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, idx) => {
              const IconComponent = item.Icon
              return (
                <Card
                  key={idx}
                  className="p-6 md:p-8 border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-primary mb-2">Step {item.step}</div>
                  <h3 className="font-bold text-foreground mb-4 text-lg md:text-xl">{item.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-secondary/30 to-transparent">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Book your free pilot week today. No commitment. Just better lunches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lead-capture">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full w-full sm:w-auto"
              >
                Start Free Pilot <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/menu">
              <Button size="lg" variant="outline" className="rounded-full w-full sm:w-auto border-2">
                Explore Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 bg-card">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 FiTiffin. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
