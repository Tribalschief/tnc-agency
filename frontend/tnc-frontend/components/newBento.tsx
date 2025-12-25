"use client"

import { useEffect, useRef, useState } from "react"
import { Boxes, Clock, DollarSign, BarChart3, Zap, Key, ArrowRight } from "lucide-react"

const benefits = [
    {
        id: 1,
        title: "All-in-One",
        highlight: "Ecosystem",
        description: "App + AI + CRM. No silos, one seamless growth engine.",
        icon: Boxes,
        tags: ["Unified", "Seamless", "Integrated"],
    },
    {
        id: 2,
        title: "24/7 AI",
        highlight: "Sales",
        description: "Voice bots qualify leads and book meetings round the clock.",
        icon: Clock,
        tags: ["VAPI", "Always On", "Auto-Qualify"],
    },
    {
        id: 3,
        title: "Reduced",
        highlight: "Overhead",
        description: "AI agents replace entry-level tasks, saving thousands monthly.",
        icon: DollarSign,
        tags: ["Cost Saving", "Efficient", "Scalable"],
    },
    {
        id: 4,
        title: "Data-Driven",
        highlight: "Intelligence",
        description: "Scrape competitors before spending a dollar on ads.",
        icon: BarChart3,
        tags: ["LinkedIn", "Maps", "Reddit"],
    },
    {
        id: 5,
        title: "Speed to",
        highlight: "Market",
        description: "Figma-to-code workflows deliver apps in weeks, not months.",
        icon: Zap,
        tags: ["Fast MVP", "AI Dev", "Launch"],
    },
    {
        id: 6,
        title: "Full",
        highlight: "Ownership",
        description: "You own the code, systems, and workflows. No lock-in.",
        icon: Key,
        tags: ["Your Asset", "No Rent", "Control"],
    },
]

export function ServicesScrollBento() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const handleScroll = () => {
            const rect = section.getBoundingClientRect()
            const sectionHeight = section.offsetHeight
            const viewportHeight = window.innerHeight
            const scrolled = -rect.top
            const totalScrollable = sectionHeight - viewportHeight
            const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))
            const newIndex = Math.min(benefits.length - 1, Math.floor(progress * benefits.length))
            setActiveIndex(newIndex)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <section ref={sectionRef} className="relative -mt-10" style={{ height: `${benefits.length * 100 + 50}vh` }}>
            <div className="sticky top-0 h-screen flex items-center">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
                    <div className="mb-12">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#61ffc9] mb-3">Why Partner With Us</p>
                        <h2 className="text-3xl md:text-4xl font-light text-gray-800 tracking-tight">
                            Benefits that <span className="text-[#61ffc9]">matter</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-16">
                        {/* Left - Navigation List */}
                        <div className="space-y-1">
                            {benefits.map((benefit, index) => (
                                <button
                                    key={benefit.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${index === activeIndex
                                        ? "bg-[#61ffc9]/10 border-l-2 border-[#61ffc9]"
                                        : "hover:bg-white/5 border-l-2 border-transparent"
                                        }`}
                                >
                                    <span
                                        className={`text-xs font-mono transition-colors ${index === activeIndex ? "text-[#61ffc9]" : "text-gray-600"
                                            }`}
                                    >
                                        0{index + 1}
                                    </span>
                                    <span
                                        className={`text-sm transition-colors ${index === activeIndex ? "text-gray-900" : "text-gray-400"}`}
                                    >
                                        {benefit.title} <span className="text-[#61ffc9]">{benefit.highlight}</span>
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Right - Active Content */}
                        <div className="relative min-h-[320px]">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={benefit.id}
                                    className={`absolute inset-0 transition-all duration-500 ${index === activeIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"
                                        }`}
                                >
                                    <div className="h-full flex flex-col justify-center">
                                        {/* Icon + Number */}
                                        <div className="flex items-center gap-6 mb-6">
                                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
                                                <benefit.icon className="w-7 h-7 text-[#61ffc9]" />
                                            </div>
                                            <span className="text-7xl font-extralight text-gray-800">0{index + 1}</span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl md:text-3xl font-light mb-4 text-start text-[#0a0a0a]">
                                            {benefit.title} <span className="text-[#61ffc9]">{benefit.highlight}</span>
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 text-lg text-start leading-relaxed mb-6 max-w-lg">{benefit.description}</p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {benefit.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 text-xs uppercase tracking-wider text-[#61ffc9] border border-[#61ffc9]/30 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <button className="group inline-flex items-center gap-2 text-sm text-white hover:text-[#61ffc9] transition-colors">
                                            <span className="text-[#0a0a0a]">Learn more</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-8 left-6 right-6 md:left-12 md:right-12">
                        <div className="h-px bg-gray-800 w-full">
                            <div
                                className="h-px bg-[#61ffc9] transition-all duration-300"
                                style={{ width: `${((activeIndex + 1) / benefits.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
