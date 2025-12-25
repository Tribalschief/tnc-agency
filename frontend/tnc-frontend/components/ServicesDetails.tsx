"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import {
    Check, Clock, Repeat, Layers, Zap, ArrowRight, Code2,
    Sparkles,
    Server,
    Smartphone,
    Bot,
    Workflow,
    Cog,
    Video,
    Target,
    TrendingUp,
    Cloud,
    Rocket,
} from "lucide-react"

interface ServiceCard {
    id: number
    Icon: LucideIcon
    name: string
    description: string
    href: string
    cta: string
    background?: ReactNode
    accentColor?: string
    whatsIncluded?: string[]
    techStack?: { name: string; icon?: string }[]
    process?: { step: number; title: string; description: string }[]
    timeline?: string
    revisions?: string
    support?: string
}

interface ParallaxCardStackProps {
    cards: ServiceCard[]
    className?: string
}

function ServiceCardPair({
    card,
    index,
    totalCards,
}: {
    card: ServiceCard
    index: number
    totalCards: number
}) {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const scale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.9, 1, 1])
    const opacity = useTransform(scrollYProgress, [0, 0.25, 0.5], [0, 1, 1])

    const IconComponent = card.Icon

    // Default values if not provided
    const whatsIncluded = card.whatsIncluded || [
        "Custom design implementation",
        "Responsive development",
        "Performance optimization",
        "Cross-browser testing",
        "Deployment support",
    ]

    const techStack = card.techStack || [
        { name: "React" },
        { name: "Next.js" },
        { name: "TypeScript" },
        { name: "Tailwind" },
    ]

    const process = card.process || [
        { step: 1, title: "Discovery", description: "Understanding your requirements" },
        { step: 2, title: "Planning", description: "Technical architecture design" },
        { step: 3, title: "Development", description: "Building the solution" },
        { step: 4, title: "Delivery", description: "Testing & deployment" },
    ]

    const timeline = card.timeline || "2-4 weeks"
    const revisions = card.revisions || "3 revision rounds"
    const support = card.support || "30-day support"

    return (
        <div ref={containerRef} className="min-h-screen flex items-center justify-center px-4 md:px-6 py-12 md:py-20">
            <motion.div style={{ scale, opacity }} className="w-full max-w-7xl will-change-transform">
                {/* Main Container with Two Connected Cards */}
                <div
                    className="grid lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-border/40"
                    style={{
                        background: `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)/0.5) 100%)`,
                    }}
                >
                    {/* LEFT CARD: Service Overview */}
                    <div className="lg:col-span-3 relative overflow-hidden">
                        {/* Background Effect */}
                        <div className="absolute inset-0 overflow-hidden">
                            {card.background || (
                                <div
                                    className="absolute inset-0 opacity-40"
                                    style={{
                                        background: `radial-gradient(ellipse at 20% 30%, ${card.accentColor || "hsl(var(--primary))"} 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, ${card.accentColor || "hsl(var(--primary))"} 0%, transparent 40%)`,
                                    }}
                                />
                            )}
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full p-6 md:p-10 lg:p-12">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center"
                                    style={{
                                        background: `linear-gradient(135deg, ${card.accentColor || "hsl(var(--primary))"}20, ${card.accentColor || "hsl(var(--primary))"}40)`,
                                        border: `1px solid ${card.accentColor || "hsl(var(--primary))"}40`,
                                    }}
                                >
                                    <IconComponent
                                        className="w-8 h-8 md:w-10 md:h-10"
                                        strokeWidth={1.5}
                                        style={{ color: card.accentColor || "hsl(var(--primary))" }}
                                    />
                                </motion.div>
                                <span
                                    className="text-7xl md:text-9xl font-black opacity-[0.08] select-none"
                                    style={{ color: card.accentColor || "hsl(var(--primary))" }}
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                            </div>

                            {/* Service Badge */}
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full w-fit mb-4"
                                style={{
                                    background: `${card.accentColor || "hsl(var(--primary))"}15`,
                                    color: card.accentColor || "hsl(var(--primary))",
                                    border: `1px solid ${card.accentColor || "hsl(var(--primary))"}30`,
                                }}
                            >
                                <Zap className="w-3 h-3" />
                                Service {String(index + 1).padStart(2, "0")}
                            </motion.span>

                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4 text-balance"
                            >
                                {card.name}
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-xl"
                            >
                                {card.description}
                            </motion.p>

                            {/* Quick Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                                className="flex flex-wrap gap-3 mb-8"
                            >
                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50">
                                    <Clock className="w-4 h-4" style={{ color: card.accentColor || "hsl(var(--primary))" }} />
                                    <span className="text-sm font-medium text-foreground">{timeline}</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50">
                                    <Repeat className="w-4 h-4" style={{ color: card.accentColor || "hsl(var(--primary))" }} />
                                    <span className="text-sm font-medium text-foreground">{revisions}</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50">
                                    <Layers className="w-4 h-4" style={{ color: card.accentColor || "hsl(var(--primary))" }} />
                                    <span className="text-sm font-medium text-foreground">{support}</span>
                                </div>
                            </motion.div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-auto"
                            >
                                <a
                                    href={card.href}
                                    className="group inline-flex items-center gap-3 px-6 py-3.5 font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    style={{
                                        background: card.accentColor || "hsl(var(--primary))",
                                        color: "#fff",
                                    }}
                                >
                                    {card.cta}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </a>
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT CARD: Detailed Info */}
                    <div className="lg:col-span-2 bg-muted/40 backdrop-blur-sm border-l border-border/40 p-6 md:p-8 lg:p-10 flex flex-col">
                        {/* What's Included */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8"
                        >
                            <h3
                                className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
                                style={{ color: card.accentColor || "hsl(var(--primary))" }}
                            >
                                <Check className="w-4 h-4" />
                                What's Included
                            </h3>
                            <ul className="space-y-2.5">
                                {whatsIncluded.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.25 + i * 0.05 }}
                                        className="flex items-start gap-3 text-sm text-foreground"
                                    >
                                        <span
                                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                                            style={{ background: card.accentColor || "hsl(var(--primary))" }}
                                        />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Tech Stack */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="mb-8"
                        >
                            <h3
                                className="text-sm font-bold uppercase tracking-wider mb-4"
                                style={{ color: card.accentColor || "hsl(var(--primary))" }}
                            >
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {techStack.map((tech, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + i * 0.05 }}
                                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-background/80 border border-border/60 text-foreground"
                                    >
                                        {tech.name}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Process / Milestones */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            className="flex-1"
                        >
                            <h3
                                className="text-sm font-bold uppercase tracking-wider mb-4"
                                style={{ color: card.accentColor || "hsl(var(--primary))" }}
                            >
                                Process & Milestones
                            </h3>
                            <div className="relative">
                                {/* Vertical Line */}
                                <div
                                    className="absolute left-[11px] top-2 bottom-2 w-px"
                                    style={{ background: `${card.accentColor || "hsl(var(--primary))"}30` }}
                                />

                                <div className="space-y-4">
                                    {process.map((step, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + i * 0.08 }}
                                            className="flex items-start gap-4 relative"
                                        >
                                            <div
                                                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10"
                                                style={{
                                                    background: `${card.accentColor || "hsl(var(--primary))"}15`,
                                                    border: `2px solid ${card.accentColor || "hsl(var(--primary))"}`,
                                                }}
                                            >
                                                <span
                                                    className="text-[10px] font-bold"
                                                    style={{ color: card.accentColor || "hsl(var(--primary))" }}
                                                >
                                                    {step.step}
                                                </span>
                                            </div>
                                            <div className="pt-0.5">
                                                <h4 className="text-sm font-semibold text-foreground">{step.title}</h4>
                                                <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

function ParallaxCardStack({ cards, className }: ParallaxCardStackProps) {
    return (
        <div className={cn("relative", className)}>
            {cards.map((card, index) => (
                <ServiceCardPair key={card.id} card={card} index={index} totalCards={cards.length} />
            ))}
        </div>
    )
}

const services = [
    {
        id: 1,
        Icon: Code2,
        name: "Figma to Web & App Conversion",
        description:
            "Transform your designs into pixel-perfect, production-ready applications with seamless animations and interactions.",
        href: "#",
        cta: "Start Converting",
        accentColor: "rgb(168, 85, 247)",
        whatsIncluded: [
            "Pixel-perfect design implementation",
            "Responsive layouts for all devices",
            "Micro-interactions & animations",
            "Component library setup",
            "Performance optimization",
            "Cross-browser compatibility",
        ],
        techStack: [
            { name: "React" },
            { name: "Next.js" },
            { name: "Tailwind CSS" },
            { name: "Framer Motion" },
            { name: "TypeScript" },
        ],
        process: [
            { step: 1, title: "Design Review", description: "Analyze Figma files & assets" },
            { step: 2, title: "Architecture", description: "Plan component structure" },
            { step: 3, title: "Development", description: "Build responsive components" },
            { step: 4, title: "QA & Launch", description: "Test & deploy to production" },
        ],
        timeline: "1-2 weeks",
        revisions: "3 revision rounds",
        support: "14-day support",
    },
    {
        id: 2,
        Icon: Sparkles,
        name: "Technology Stack Consulting",
        description:
            "Cutting-edge technologies and frameworks powering modern, scalable applications. We help you choose the right tools.",
        href: "#",
        cta: "Explore Stack",
        accentColor: "rgb(99, 102, 241)",
        whatsIncluded: [
            "Technology audit & assessment",
            "Stack recommendation report",
            "Migration strategy planning",
            "Performance benchmarking",
            "Scalability roadmap",
            "Team training sessions",
        ],
        techStack: [
            { name: "React" },
            { name: "Vue" },
            { name: "Node.js" },
            { name: "Python" },
            { name: "AWS" },
            { name: "GCP" },
        ],
        process: [
            { step: 1, title: "Discovery", description: "Understand current stack" },
            { step: 2, title: "Analysis", description: "Evaluate options & trade-offs" },
            { step: 3, title: "Recommendation", description: "Detailed proposal document" },
            { step: 4, title: "Implementation", description: "Guide migration process" },
        ],
        timeline: "1 week",
        revisions: "2 revision rounds",
        support: "30-day advisory",
    },
    {
        id: 3,
        Icon: Layers,
        name: "Full Stack Development",
        description:
            "End-to-end development with modern tech stacks. From database design to stunning frontends, we build complete solutions.",
        href: "#",
        cta: "Build Full Stack",
        accentColor: "rgb(236, 72, 153)",
        whatsIncluded: [
            "Database design & setup",
            "API development (REST/GraphQL)",
            "Frontend application",
            "Authentication & authorization",
            "Admin dashboard",
            "CI/CD pipeline setup",
        ],
        techStack: [
            { name: "Next.js" },
            { name: "PostgreSQL" },
            { name: "Prisma" },
            { name: "Redis" },
            { name: "Docker" },
            { name: "Vercel" },
        ],
        process: [
            { step: 1, title: "Requirements", description: "Define features & scope" },
            { step: 2, title: "Database Design", description: "Schema & relationships" },
            { step: 3, title: "Backend Dev", description: "APIs & business logic" },
            { step: 4, title: "Frontend Dev", description: "UI/UX implementation" },
        ],
        timeline: "4-8 weeks",
        revisions: "Unlimited during dev",
        support: "60-day support",
    },
    {
        id: 4,
        Icon: Server,
        name: "Backend Architecture",
        description:
            "Scalable, secure, and performant backend systems built with best practices and modern frameworks for enterprise-grade reliability.",
        href: "#",
        cta: "Architect Backend",
        accentColor: "rgb(59, 130, 246)",
        whatsIncluded: [
            "System architecture design",
            "Microservices setup",
            "Database optimization",
            "Caching strategies",
            "Security implementation",
            "Load balancing config",
        ],
        techStack: [
            { name: "Node.js" },
            { name: "Python" },
            { name: "PostgreSQL" },
            { name: "MongoDB" },
            { name: "Redis" },
            { name: "Kafka" },
        ],
        process: [
            { step: 1, title: "Assessment", description: "Evaluate requirements" },
            { step: 2, title: "Design", description: "Architecture diagrams" },
            { step: 3, title: "Implementation", description: "Build core services" },
            { step: 4, title: "Optimization", description: "Performance tuning" },
        ],
        timeline: "3-6 weeks",
        revisions: "2 architecture revisions",
        support: "90-day support",
    },
    {
        id: 5,
        Icon: Smartphone,
        name: "Mobile App Development",
        description:
            "Native iOS and Android apps, or cross-platform solutions with React Native and Flutter for maximum reach.",
        href: "#",
        cta: "Build Mobile App",
        accentColor: "rgb(34, 197, 94)",
        whatsIncluded: [
            "iOS & Android development",
            "UI/UX design implementation",
            "Push notifications",
            "Offline functionality",
            "App Store submission",
            "Analytics integration",
        ],
        techStack: [
            { name: "React Native" },
            { name: "Flutter" },
            { name: "Swift" },
            { name: "Kotlin" },
            { name: "Firebase" },
            { name: "Expo" },
        ],
        process: [
            { step: 1, title: "Wireframes", description: "Design app flow" },
            { step: 2, title: "Prototype", description: "Interactive mockups" },
            { step: 3, title: "Development", description: "Build & integrate APIs" },
            { step: 4, title: "Launch", description: "Store submission & release" },
        ],
        timeline: "6-12 weeks",
        revisions: "4 revision rounds",
        support: "90-day support",
    },
    {
        id: 6,
        Icon: Bot,
        name: "AI Sales Agents & Chatbots",
        description:
            "Intelligent AI-powered conversational agents that drive sales and provide 24/7 customer support automatically.",
        href: "#",
        cta: "Deploy AI Agent",
        accentColor: "rgb(249, 115, 22)",
        whatsIncluded: [
            "Custom AI model training",
            "Natural language processing",
            "CRM integration",
            "Lead qualification flows",
            "Multi-channel deployment",
            "Analytics dashboard",
        ],
        techStack: [
            { name: "OpenAI" },
            { name: "LangChain" },
            { name: "Pinecone" },
            { name: "Python" },
            { name: "FastAPI" },
            { name: "Vercel AI" },
        ],
        process: [
            { step: 1, title: "Discovery", description: "Define use cases" },
            { step: 2, title: "Training", description: "Build knowledge base" },
            { step: 3, title: "Integration", description: "Connect to systems" },
            { step: 4, title: "Optimization", description: "Refine responses" },
        ],
        timeline: "2-4 weeks",
        revisions: "Continuous tuning",
        support: "30-day optimization",
    },
    {
        id: 7,
        Icon: Workflow,
        name: "n8n Workflow Automation",
        description:
            "Automate complex workflows and connect your tools seamlessly. Save hours every week with intelligent automation.",
        href: "#",
        cta: "Automate Now",
        accentColor: "rgb(139, 92, 246)",
        whatsIncluded: [
            "Workflow design & mapping",
            "n8n instance setup",
            "Custom node development",
            "Third-party integrations",
            "Error handling & monitoring",
            "Documentation & training",
        ],
        techStack: [
            { name: "n8n" },
            { name: "Node.js" },
            { name: "Docker" },
            { name: "PostgreSQL" },
            { name: "REST APIs" },
            { name: "Webhooks" },
        ],
        process: [
            { step: 1, title: "Audit", description: "Map current processes" },
            { step: 2, title: "Design", description: "Plan automation flows" },
            { step: 3, title: "Build", description: "Create workflows" },
            { step: 4, title: "Deploy", description: "Launch & monitor" },
        ],
        timeline: "1-3 weeks",
        revisions: "3 workflow iterations",
        support: "30-day support",
    },
    {
        id: 8,
        Icon: Cog,
        name: "Office Process Automation",
        description:
            "Streamline repetitive tasks and boost productivity with custom automation solutions tailored to your business.",
        href: "#",
        cta: "Optimize Processes",
        accentColor: "rgb(16, 185, 129)",
        whatsIncluded: [
            "Process analysis & mapping",
            "Custom scripts & macros",
            "Document automation",
            "Email workflow automation",
            "Reporting automation",
            "Team training",
        ],
        techStack: [
            { name: "Python" },
            { name: "Power Automate" },
            { name: "Zapier" },
            { name: "Google Apps Script" },
            { name: "Excel VBA" },
        ],
        process: [
            { step: 1, title: "Analysis", description: "Identify bottlenecks" },
            { step: 2, title: "Solution", description: "Design automation" },
            { step: 3, title: "Development", description: "Build & test" },
            { step: 4, title: "Training", description: "Onboard your team" },
        ],
        timeline: "1-2 weeks",
        revisions: "2 revision rounds",
        support: "14-day support",
    },
    {
        id: 9,
        Icon: Video,
        name: "AI-Generated UGC Video Ads",
        description:
            "Create engaging user-generated style content at scale with AI-powered video generation that converts.",
        href: "#",
        cta: "Generate Videos",
        accentColor: "rgb(244, 63, 94)",
        whatsIncluded: [
            "AI avatar creation",
            "Script writing & optimization",
            "Video generation (10+ videos)",
            "A/B testing variants",
            "Platform optimization",
            "Performance analytics",
        ],
        techStack: [
            { name: "HeyGen" },
            { name: "Synthesia" },
            { name: "Runway" },
            { name: "ElevenLabs" },
            { name: "Premiere Pro" },
        ],
        process: [
            { step: 1, title: "Strategy", description: "Define ad concepts" },
            { step: 2, title: "Scripting", description: "Write compelling copy" },
            { step: 3, title: "Generation", description: "Create AI videos" },
            { step: 4, title: "Optimization", description: "Edit & finalize" },
        ],
        timeline: "3-5 days",
        revisions: "2 revision rounds",
        support: "7-day support",
    },
    {
        id: 10,
        Icon: Target,
        name: "Facebook & Google Ads Management",
        description:
            "Data-driven advertising campaigns that maximize ROI and scale your business profitably across platforms.",
        href: "#",
        cta: "Launch Campaign",
        accentColor: "rgb(14, 165, 233)",
        whatsIncluded: [
            "Campaign strategy & setup",
            "Audience research & targeting",
            "Ad creative development",
            "A/B testing & optimization",
            "Conversion tracking setup",
            "Weekly performance reports",
        ],
        techStack: [
            { name: "Meta Ads" },
            { name: "Google Ads" },
            { name: "GA4" },
            { name: "Looker Studio" },
            { name: "Hotjar" },
        ],
        process: [
            { step: 1, title: "Research", description: "Audience & competitor analysis" },
            { step: 2, title: "Setup", description: "Campaign configuration" },
            { step: 3, title: "Launch", description: "Go live with ads" },
            { step: 4, title: "Optimize", description: "Continuous improvement" },
        ],
        timeline: "Ongoing monthly",
        revisions: "Weekly optimizations",
        support: "Dedicated manager",
    },
    {
        id: 11,
        Icon: TrendingUp,
        name: "Programmatic SEO & Geo-Marketing",
        description: "Scale your organic traffic with automated, data-driven SEO strategies and precise geo-targeting.",
        href: "#",
        cta: "Boost SEO",
        accentColor: "rgb(132, 204, 22)",
        whatsIncluded: [
            "Keyword research & strategy",
            "Programmatic page generation",
            "Technical SEO audit",
            "Local SEO optimization",
            "Schema markup setup",
            "Monthly ranking reports",
        ],
        techStack: [
            { name: "Ahrefs" },
            { name: "Semrush" },
            { name: "Screaming Frog" },
            { name: "Next.js" },
            { name: "Python" },
        ],
        process: [
            { step: 1, title: "Audit", description: "Technical & content analysis" },
            { step: 2, title: "Strategy", description: "Keyword & page planning" },
            { step: 3, title: "Implementation", description: "Build & optimize pages" },
            { step: 4, title: "Monitor", description: "Track & adjust rankings" },
        ],
        timeline: "Ongoing monthly",
        revisions: "Monthly updates",
        support: "Dedicated strategist",
    },
    {
        id: 12,
        Icon: Cloud,
        name: "Cloud Development & Infrastructure",
        description:
            "AWS EC2, S3, DynamoDB, Lambda, CloudFormation. Complete cloud infrastructure setup, migration, and optimization.",
        href: "#",
        cta: "Setup Cloud",
        accentColor: "rgb(56, 189, 248)",
        whatsIncluded: [
            "Cloud architecture design",
            "Infrastructure as Code (IaC)",
            "Auto-scaling configuration",
            "Security & compliance",
            "Cost optimization",
            "Monitoring & alerting",
        ],
        techStack: [
            { name: "AWS" },
            { name: "Terraform" },
            { name: "Docker" },
            { name: "Kubernetes" },
            { name: "CloudWatch" },
            { name: "Lambda" },
        ],
        process: [
            { step: 1, title: "Assessment", description: "Evaluate requirements" },
            { step: 2, title: "Architecture", description: "Design cloud solution" },
            { step: 3, title: "Migration", description: "Deploy infrastructure" },
            { step: 4, title: "Optimization", description: "Cost & performance tuning" },
        ],
        timeline: "2-6 weeks",
        revisions: "2 architecture revisions",
        support: "90-day support",
    },
    {
        id: 13,
        Icon: Sparkles,
        name: "Complete Autonomous Growth Ecosystems",
        description:
            "Autonomous systems that handle marketing, sales, and operations while you focus on strategy and growth.",
        href: "#",
        cta: "Build Ecosystem",
        accentColor: "rgb(192, 132, 252)",
        whatsIncluded: [
            "AI-powered lead generation",
            "Automated sales funnels",
            "CRM & email automation",
            "Analytics & reporting",
            "Social media automation",
            "Customer journey mapping",
        ],
        techStack: [
            { name: "HubSpot" },
            { name: "OpenAI" },
            { name: "n8n" },
            { name: "Zapier" },
            { name: "Airtable" },
            { name: "Notion" },
        ],
        process: [
            { step: 1, title: "Discovery", description: "Map growth goals" },
            { step: 2, title: "Design", description: "Plan ecosystem architecture" },
            { step: 3, title: "Build", description: "Implement all systems" },
            { step: 4, title: "Launch", description: "Activate & optimize" },
        ],
        timeline: "6-10 weeks",
        revisions: "Ongoing iterations",
        support: "90-day optimization",
    },
    {
        id: 14,
        Icon: Rocket,
        name: "Minimum Viable Product",
        description: "Launch your startup idea fast. Validated, tested, and ready for users in weeks, not months.",
        href: "#",
        cta: "Launch MVP",
        accentColor: "rgb(251, 146, 60)",
        whatsIncluded: [
            "Product strategy session",
            "UI/UX design",
            "Core feature development",
            "User authentication",
            "Payment integration",
            "Launch & deployment",
        ],
        techStack: [
            { name: "Next.js" },
            { name: "Supabase" },
            { name: "Stripe" },
            { name: "Vercel" },
            { name: "Tailwind" },
            { name: "TypeScript" },
        ],
        process: [
            { step: 1, title: "Ideation", description: "Define core features" },
            { step: 2, title: "Design", description: "Create UI/UX" },
            { step: 3, title: "Development", description: "Build MVP" },
            { step: 4, title: "Launch", description: "Deploy & iterate" },
        ],
        timeline: "3-6 weeks",
        revisions: "3 revision rounds",
        support: "30-day support",
    },
]

export default function ServicesDetails() {
    return (
        <main className="min-h-screen bg-background">
            <header className="relative h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-background to-muted/20">
                <div className="max-w-4xl space-y-6">
                    <p className="text-sm md:text-base font-medium tracking-wider uppercase text-muted-foreground">
                        What We Offer
                    </p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance">Our Services</h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        From design to deployment, we provide end-to-end digital solutions that transform your ideas into powerful,
                        scalable products.
                    </p>
                    <div className="flex items-center justify-center gap-4 pt-4">
                        <a
                            href="#services"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
                        >
                            Explore Services
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 animate-bounce">
                    <svg
                        className="w-6 h-6 text-muted-foreground"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </header>

            {/* Parallax Card Stack */}
            <section id="services">
                <ParallaxCardStack cards={services} />
            </section>
        </main>
    )
}
