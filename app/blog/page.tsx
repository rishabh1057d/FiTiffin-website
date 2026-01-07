import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, FileText, TrendingUp, Heart, Utensils } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  const blogTopics = [
    {
      icon: Utensils,
      title: "Healthy eating habits for office professionals",
      description: "Tips and insights on maintaining a balanced diet while working long hours."
    },
    {
      icon: TrendingUp,
      title: "Corporate meal program insights",
      description: "Learn how meal programs can boost employee productivity and satisfaction."
    },
    {
      icon: Heart,
      title: "Kitchen hygiene & food safety practices",
      description: "Best practices for maintaining the highest standards of food safety."
    },
    {
      icon: FileText,
      title: "Productivity & lifestyle tips",
      description: "How nutrition impacts your work performance and overall well-being."
    },
    {
      icon: TrendingUp,
      title: "Startup stories from the FITIFFIN ecosystem",
      description: "Inspiring stories from our partner kitchens and corporate clients."
    }
  ]

  return (
    <main className="min-h-screen bg-background">
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
            <span className="text-primary">FITIFFIN</span> Blog
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Your destination for corporate nutrition, productivity, employee wellness, and modern workplace food solutions.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-8 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 md:p-12 border border-border bg-card/50 backdrop-blur-sm text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-6">Our Mission</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Our mission is to help companies build healthier, happier and more productive teams.
            </p>
          </Card>
        </div>
      </section>

      {/* Blog Topics */}
      <section className="py-8 md:py-20 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 md:mb-12 text-center">What We Share</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {blogTopics.map((topic, idx) => {
              const Icon = topic.icon
              return (
                <Card key={idx} className="p-5 md:p-6 border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all">
                  <div className="p-2 md:p-3 rounded-lg bg-primary/10 text-primary w-fit mb-3 md:mb-4">
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{topic.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{topic.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-8 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 md:p-12 border border-border bg-primary/5 backdrop-blur-sm text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Stay Tuned</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              We're working on bringing you valuable content. Check back soon for our first blog posts!
            </p>
            <Link href="/lead-capture">
              <Button size="lg" className="bg-primary hover:bg-accent text-primary-foreground rounded-full">
                Get Started with FITIFFIN
              </Button>
            </Link>
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

