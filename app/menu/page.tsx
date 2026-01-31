"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BubbleBackground } from "@/components/bubble-background"
import vegetarianMenuDataRaw from "@/data/menu-veg.json"
import nonVegetarianMenuDataRaw from "@/data/menu-nonveg.json"

type MenuItem = {
  id: number
  name: string
  description: string
  calories: string
  protein: string
  carbs: string
  fat: string
  fiber?: string
}

type MenuCategory = {
  id: number
  title: string
  description: string
  items: MenuItem[]
}

type MenuData = {
  categories: MenuCategory[]
}

const vegetarianMenuData = vegetarianMenuDataRaw as MenuData
const nonVegetarianMenuData = nonVegetarianMenuDataRaw as MenuData

export default function MenuPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image 
              src="/WhatsApp_Image_2025-12-27_at_6.13.22_PM__1_-removebg-preview.png" 
              alt="FiTiffin Logo" 
              width={260} 
              height={80} 
              className="h-10 md:h-14 w-auto max-w-[170px] md:max-w-[260px]" 
            />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#vegetarian" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Vegetarian
            </a>
            <a href="#non-vegetarian" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Non-Vegetarian
            </a>
          </div>
          <Link href="/lead-capture">
            <Button className="bg-primary hover:bg-accent text-primary-foreground rounded-full">Book a Call</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
            This Week's Menu
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Our menu rotates weekly based on seasonal availability and nutrition planning. All meals are crafted by
            nutrition experts to meet your wellness goals.
          </p>
        </div>
      </section>

      {/* Featured Meal Image Section - Stacked FiTiffin tiffins */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-border h-80 md:h-96">
            <Image
              src="/images/IMG_6089.jpg"
              alt="FiTiffin meal boxes stacked - fresh tiffin delivery"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vegetarian Section */}
      <section id="vegetarian" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Vegetarian Menu</h2>
            </div>
            <p className="text-muted-foreground">Plant-based meals packed with protein and nutrients</p>
          </div>

          {/* Vegetarian meal showcase image */}
          <div className="relative rounded-2xl overflow-hidden border border-border h-64 md:h-80 mb-16">
            <Image
              src="/images/IMG_6120.jpg"
              alt="FiTiffin vegetarian thali - compartmentalized healthy meal"
              fill
              className="object-cover"
            />
          </div>

          {vegetarianMenuData.categories.map((category) => (
            <div key={category.id} className="mb-16">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((meal) => (
                  <Card
                    key={meal.id}
                    className="p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm group"
                  >
                    <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {meal.name}
                    </h4>
                    <p className="text-muted-foreground text-xs mb-4 leading-relaxed">{meal.description}</p>

                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Calories</span>
                        <span className="font-semibold text-foreground">{meal.calories}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Protein</span>
                        <span className="font-semibold text-foreground">{meal.protein}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Carbs</span>
                        <span className="font-semibold text-foreground">{meal.carbs}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Fat</span>
                        <span className="font-semibold text-foreground">{meal.fat}</span>
                      </div>
                      {meal.fiber && (
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">Fiber</span>
                          <span className="font-semibold text-foreground">{meal.fiber}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Non-Vegetarian Section */}
      <section id="non-vegetarian" className="py-20 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Non-Vegetarian Menu</h2>
            </div>
            <p className="text-muted-foreground">High-protein meals with lean proteins and balanced nutrition</p>
          </div>

          {/* Non-vegetarian meal showcase image */}
          <div className="relative rounded-2xl overflow-hidden border border-border h-64 md:h-80 mb-16">
            <Image
              src="/images/IMG_6131.JPG.jpeg"
              alt="FiTiffin non-vegetarian thali - complete meal with rice, curry and salad"
              fill
              className="object-cover"
            />
          </div>

          {nonVegetarianMenuData.categories.map((category) => (
            <div key={category.id} className="mb-16">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((meal) => (
                  <Card
                    key={meal.id}
                    className="p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm group"
                  >
                    <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {meal.name}
                    </h4>
                    <p className="text-muted-foreground text-xs mb-4 leading-relaxed">{meal.description}</p>

                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Calories</span>
                        <span className="font-semibold text-foreground">{meal.calories}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Protein</span>
                        <span className="font-semibold text-foreground">{meal.protein}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Carbs</span>
                        <span className="font-semibold text-foreground">{meal.carbs}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Fat</span>
                        <span className="font-semibold text-foreground">{meal.fat}</span>
                      </div>
                      {meal.fiber && (
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">Fiber</span>
                          <span className="font-semibold text-foreground">{meal.fiber}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Rotation Notice */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
          <p className="text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Our menu rotates weekly</span> based on seasonal
            availability, ingredient freshness, and nutrition planning. This ensures variety, freshness, and optimal
            nutritional balance for your team throughout the year.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to experience FiTiffin meals?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start your free pilot week and see how our nutrition-focused meals transform your team's wellness.
          </p>
          <Link href="/lead-capture">
            <Button
              size="lg"
              className="bg-primary hover:bg-accent text-primary-foreground rounded-full text-base h-12"
            >
              Book Your Free Pilot
            </Button>
          </Link>
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
