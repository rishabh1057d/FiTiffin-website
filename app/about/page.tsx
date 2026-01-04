import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const founders = [
    {
      name: "Ashank",
      role: "Co-Founder",
      description:
        "Visionary leader focused on transforming corporate wellness through innovative nutrition solutions.",
      image: "/ashank-fitiffin-founder.jpg",
    },
    {
      name: "Aditya",
      role: "Co-Founder",
      description: "Operations expert dedicated to seamless delivery and customer success in enterprise settings.",
      image: "/aditya-fitiffin-founder.jpg",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/fitiffin-logo.png" alt="FiTiffin Logo" width={40} height={40} className="w-10 h-10" />
            <div className="text-xl font-bold text-foreground tracking-tight">FiTiffin</div>
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
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
            About FiTiffin
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Founded by Ashank and Aditya, FiTiffin is reimagining corporate wellness through thoughtful nutrition and
            operational excellence.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 border border-border bg-card/50 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We believe that healthy employees are happy and productive employees. Our mission is to eliminate the
              friction around workplace nutrition by delivering consistent, delicious, protein-rich meals that fuel
              teams for success.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Every tiffin we deliver is backed by nutritional science, crafted by our network of trusted cloud kitchen
              partners, and designed to support the modern professional's wellness journey.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We partner with established cloud kitchens across India to ensure fresh, high-quality meals reach your
              office every day, while supporting local food businesses and maintaining the highest standards of
              nutrition and taste.
            </p>
          </Card>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">Meet Our Founders</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {founders.map((founder, idx) => (
              <Card key={idx} className="overflow-hidden border border-border bg-card/50 backdrop-blur-sm">
                <div className="relative h-64 w-full">
                  <Image src={founder.image || "/placeholder.svg"} alt={founder.name} fill className="object-cover" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-1">{founder.name}</h3>
                  <p className="text-primary text-sm font-medium mb-4">{founder.role}</p>
                  <p className="text-muted-foreground leading-relaxed">{founder.description}</p>
                </div>
              </Card>
            ))}
          </div>
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
            <div className="flex items-center gap-2 mb-2">
              <Image src="/fitiffin-logo.png" alt="FiTiffin Logo" width={32} height={32} className="w-8 h-8" />
              <h3 className="font-semibold text-foreground">FiTiffin</h3>
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
                <a href="#" className="hover:text-foreground transition-colors">
                  Blog
                </a>
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
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms
                </a>
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
