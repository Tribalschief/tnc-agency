"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const stages = [
    {
        phase: "01",
        title: "The Spark",
        subtitle: "Your idea, raw and unfiltered",
        description:
            "Every great product starts as a messy thought. We sit with you, listen deeply, and help you articulate what's been brewing in your mind.",
        visual: "💭",
        questions: ["What if...", "Could this work?", "Is it even possible?"],
    },
    {
        phase: "02",
        title: "The Blueprint",
        subtitle: "From chaos to clarity",
        description:
            "We strip away the noise, identify the core value, and map out the fastest path to something real. No fluff, just focus.",
        visual: "📐",
        questions: ["What's essential?", "What can wait?", "What proves value?"],
    },
    {
        phase: "03",
        title: "The MVP",
        subtitle: "Real, tangible, testable",
        description:
            "A working product in your hands. Not perfect, but powerful enough to validate assumptions and attract early believers.",
        visual: "🚀",
        questions: ["Does it work?", "Do people want it?", "What did we learn?"],
    },
    {
        phase: "04",
        title: "The Product",
        subtitle: "Refined, polished, launched",
        description:
            "Every lesson learned, every insight gathered - now refined into something you're proud to put your name on.",
        visual: "✨",
        questions: ["It's live.", "It's growing.", "It's yours."],
    },
]

const processParticles = [
    { char: "◯", x: 5, y: 15, size: "text-4xl", depth: 0.3 },
    { char: "△", x: 92, y: 25, size: "text-3xl", depth: 0.5 },
    { char: "□", x: 8, y: 75, size: "text-5xl", depth: 0.2 },
    { char: "◇", x: 88, y: 80, size: "text-4xl", depth: 0.4 },
    { char: "⬡", x: 15, y: 45, size: "text-2xl", depth: 0.6 },
    { char: "⬢", x: 85, y: 55, size: "text-3xl", depth: 0.35 },
    { char: "○", x: 50, y: 10, size: "text-6xl", depth: 0.25 },
    { char: "●", x: 75, y: 90, size: "text-2xl", depth: 0.7 },
]

function ProcessSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const particleY1 = useTransform(scrollYProgress, [0, 1], [0, -200])
    const particleY2 = useTransform(scrollYProgress, [0, 1], [0, -350])
    const particleY3 = useTransform(scrollYProgress, [0, 1], [0, -120])

    const getParticleY = (depth: number) => {
        if (depth <= 0.3) return particleY1
        if (depth <= 0.5) return particleY2
        return particleY3
    }

    return (
        <section ref={containerRef} className="relative bg-background overflow-hidden">
            {processParticles.map((p, i) => (
                <motion.div
                    key={i}
                    className={`fixed ${p.size} text-muted-foreground/10 pointer-events-none select-none hidden lg:block`}
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        y: getParticleY(p.depth),
                        zIndex: 0,
                    }}
                >
                    {p.char}
                </motion.div>
            ))}

            <motion.div
                className="fixed inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    y: bgY,
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="hidden xl:block fixed left-8 2xl:left-12 top-1/2 -translate-y-1/2 h-48 lg:h-64 w-px bg-border z-50 pointer-events-none">
                <motion.div className="w-full bg-foreground origin-top" style={{ scaleY: scrollYProgress, height: "100%" }} />
            </div>

            {stages.map((stage, index) => (
                <StageCard key={stage.phase} stage={stage} index={index} />
            ))}
        </section>
    )
}

const stageHints = [
    ["Discovery", "Research", "Ideation"],
    ["Strategy", "Planning", "Focus"],
    ["Build", "Test", "Iterate"],
    ["Launch", "Grow", "Scale"],
]

function StageCard({ stage, index }: { stage: (typeof stages)[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 1])
    const y = useTransform(scrollYProgress, [0, 1], [60, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])
    const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -2 : 2, 0])
    const emojiY = useTransform(scrollYProgress, [0, 1], [40, 0])
    const emojiRotate = useTransform(scrollYProgress, [0, 1], [-15, 0])

    const isEven = index % 2 === 0

    return (
        <motion.div
            ref={ref}
            className="min-h-[70vh] sm:min-h-[80vh] md:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 relative"
            style={{ opacity }}
        >
            {stageHints[index]?.map((hint, i) => (
                <motion.span
                    key={hint}
                    className="absolute text-[10px] sm:text-xs text-muted-foreground/30 uppercase tracking-widest hidden lg:block"
                    style={{
                        left: i === 0 ? "5%" : i === 1 ? "50%" : "85%",
                        top: i === 0 ? "20%" : i === 1 ? "85%" : "30%",
                        rotate: (i - 1) * 5,
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.3 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    viewport={{ once: true }}
                >
                    {hint}
                </motion.span>
            ))}

            <motion.div
                className={`max-w-6xl w-full flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20`}
                style={{ y, scale, rotate }}
            >
                {/* Visual side */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="relative">
                        <motion.div
                            className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] select-none"
                            style={{ y: emojiY, rotate: emojiRotate }}
                            initial={{ rotate: -10, scale: 0.8 }}
                            whileInView={{ rotate: 0, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            {stage.visual}
                        </motion.div>

                        <motion.div
                            className="absolute inset-0 pointer-events-none hidden md:block"
                            style={{
                                border: "1px dashed",
                                borderColor: "rgba(var(--muted-foreground), 0.1)",
                                borderRadius: "50%",
                                scale: 1.5,
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />

                        <div className="absolute inset-0 pointer-events-none hidden xl:block">
                            {stage.questions.map((q, i) => (
                                <motion.span
                                    key={i}
                                    className="absolute text-xs xl:text-sm text-muted-foreground whitespace-nowrap"
                                    style={{
                                        top: `${20 + i * 30}%`,
                                        left: i % 2 === 0 ? "-80%" : "120%",
                                    }}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 0.6, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    {q}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content side */}
                <div className="flex-1 max-w-xl text-center lg:text-left px-2 sm:px-0">
                    <motion.p
                        className="text-accent text-xs sm:text-sm tracking-widest uppercase mb-2 sm:mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Phase {stage.phase}
                    </motion.p>

                    <motion.h3
                        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-foreground mb-2 tracking-tight"
                        style={{ fontFamily: "var(--font-serif)" }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {stage.title}
                    </motion.h3>

                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-muted-foreground mb-3 sm:mb-4 md:mb-6 italic"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        {stage.subtitle}
                    </motion.p>

                    <motion.p
                        className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        {stage.description}
                    </motion.p>
                </div>
            </motion.div>
        </motion.div>
    )
}

const floatingQuestions = [
    // Layer 1 - Large, slow parallax (foreground feel)
    { text: "How do I grow my business?", x: 5, y: 12, rotation: -8, size: "lg", depth: 0.2 },
    { text: "Is this worth my investment?", x: 78, y: 8, rotation: 12, size: "lg", depth: 0.25 },
    { text: "How do I start?", x: 35, y: 18, rotation: -7, size: "lg", depth: 0.3 },
    { text: "Can they deliver results?", x: 60, y: 15, rotation: 5, size: "lg", depth: 0.22 },

    // Layer 2 - Medium, moderate parallax
    { text: "Can I actually trust them?", x: 12, y: 68, rotation: 5, size: "md", depth: 0.45 },
    { text: "What makes them different?", x: 68, y: 72, rotation: -6, size: "md", depth: 0.5 },
    { text: "Will this solve my problem?", x: 88, y: 42, rotation: 10, size: "md", depth: 0.48 },
    { text: "How long will it take?", x: 2, y: 45, rotation: -12, size: "md", depth: 0.52 },
    { text: "What's the ROI?", x: 82, y: 25, rotation: 7, size: "md", depth: 0.4 },
    { text: "Is now the right time?", x: 58, y: 82, rotation: 8, size: "md", depth: 0.55 },
    { text: "Do they get my vision?", x: 20, y: 35, rotation: -4, size: "md", depth: 0.42 },
    { text: "What's the process?", x: 75, y: 60, rotation: 6, size: "md", depth: 0.47 },

    // Layer 3 - Small, fast parallax (background feel)
    { text: "What if it doesn't work?", x: 42, y: 88, rotation: 4, size: "sm", depth: 0.65 },
    { text: "Do they understand me?", x: 55, y: 5, rotation: -5, size: "sm", depth: 0.7 },
    { text: "Who else have they helped?", x: 25, y: 28, rotation: -3, size: "sm", depth: 0.68 },
    { text: "Can they handle my scale?", x: 8, y: 82, rotation: -10, size: "sm", depth: 0.75 },
    { text: "Will they stick around?", x: 72, y: 55, rotation: 5, size: "sm", depth: 0.72 },
    { text: "What's next after launch?", x: 45, y: 65, rotation: -8, size: "sm", depth: 0.78 },
    { text: "How do I measure success?", x: 15, y: 55, rotation: 3, size: "sm", depth: 0.66 },
    { text: "Is my idea good enough?", x: 90, y: 70, rotation: -7, size: "sm", depth: 0.8 },
]

const transformations = [
    { before: "Overwhelmed", after: "Focused", icon: "◯" },
    { before: "Uncertain", after: "Confident", icon: "△" },
    { before: "Scattered ideas", after: "Clear roadmap", icon: "□" },
    { before: "Alone", after: "Supported", icon: "◇" },
]

const transformFloats = [
    { text: "Growth", x: 8, y: 20, depth: 0.3 },
    { text: "Success", x: 88, y: 15, depth: 0.4 },
    { text: "Vision", x: 5, y: 75, depth: 0.5 },
    { text: "Results", x: 92, y: 80, depth: 0.35 },
    { text: "Progress", x: 15, y: 50, depth: 0.6 },
    { text: "Impact", x: 85, y: 45, depth: 0.45 },
]

function TransformationSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const floatY1 = useTransform(scrollYProgress, [0, 1], [100, -150])
    const floatY2 = useTransform(scrollYProgress, [0, 1], [80, -100])
    const floatY3 = useTransform(scrollYProgress, [0, 1], [50, -50])
    const sectionScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98])
    const cardRotate = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2])

    const getFloatY = (depth: number) => {
        if (depth <= 0.35) return floatY1
        if (depth <= 0.5) return floatY2
        return floatY3
    }

    return (
        <motion.section
            ref={containerRef}
            className="relative min-h-screen w-full bg-foreground text-background overflow-hidden py-12 xs:py-16 sm:py-20 md:py-24 lg:py-32"
            style={{ scale: sectionScale }}
        >
            {transformFloats.map((f, i) => (
                <motion.span
                    key={i}
                    className="absolute text-[10px] sm:text-xs uppercase tracking-[0.3em] text-background/10 font-light hidden md:block"
                    style={{
                        left: `${f.x}%`,
                        top: `${f.y}%`,
                        y: getFloatY(f.depth),
                    }}
                >
                    {f.text}
                </motion.span>
            ))}

            {/* Subtle moving background pattern */}
            <motion.div className="absolute inset-0 opacity-5" style={{ y: backgroundY }}>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                        backgroundSize: "48px 48px",
                    }}
                />
            </motion.div>

            <motion.div
                className="absolute w-96 h-96 rounded-full bg-background/5 blur-3xl pointer-events-none"
                style={{
                    left: "10%",
                    top: "20%",
                    y: floatY2,
                }}
            />
            <motion.div
                className="absolute w-64 h-64 rounded-full bg-background/5 blur-3xl pointer-events-none"
                style={{
                    right: "15%",
                    bottom: "30%",
                    y: floatY3,
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10 sm:mb-16 md:mb-20 lg:mb-28">
                    <motion.p
                        className="text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4 opacity-60"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 0.6, y: 0 }}
                        viewport={{ once: true }}
                    >
                        The Transformation
                    </motion.p>
                    <motion.h2
                        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl tracking-tight mb-4 sm:mb-6 text-balance"
                        style={{ fontFamily: "var(--font-serif)" }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        From where you are
                        <br />
                        <em className="italic opacity-70">to where you want to be</em>
                    </motion.h2>
                </div>

                {/* Transformation cards */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-10 sm:mb-16 md:mb-20"
                    style={{ rotate: cardRotate }}
                >
                    {transformations.map((item, index) => (
                        <TransformCard key={item.before} item={item} index={index} />
                    ))}
                </motion.div>

                {/* Final CTA */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <p className="text-sm sm:text-base md:text-lg opacity-70 mb-5 sm:mb-6 md:mb-8 max-w-md mx-auto leading-relaxed px-4">
                        Ready to stop wondering and start building?
                    </p>
                    <motion.button
                        className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-background text-foreground text-sm sm:text-base font-medium rounded-full hover:scale-105 transition-transform"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Let's Talk About Your Idea
                    </motion.button>
                </motion.div>
            </div>
        </motion.section>
    )
}

function TransformCard({ item, index }: { item: (typeof transformations)[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    })

    const progress = useTransform(scrollYProgress, [0, 1], [0, 1])
    const beforeOpacity = useTransform(progress, [0, 0.5, 1], [1, 0.3, 0.3])
    const afterOpacity = useTransform(progress, [0, 0.5, 1], [0.3, 1, 1])
    const lineWidth = useTransform(progress, [0, 1], ["0%", "100%"])
    const rotateX = useTransform(progress, [0, 1], [10, 0])
    const cardScale = useTransform(progress, [0, 0.5, 1], [0.9, 1, 1.02])

    return (
        <motion.div
            ref={ref}
            className="relative p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 border border-background/20 rounded-xl sm:rounded-2xl backdrop-blur-sm"
            style={{
                rotateX,
                scale: cardScale,
                transformPerspective: 1000,
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            {/* Icon */}
            <motion.span
                className="absolute top-3 xs:top-4 sm:top-5 md:top-6 right-3 xs:right-4 sm:right-5 md:right-6 text-lg sm:text-xl md:text-2xl opacity-30"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20 + index * 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
                {item.icon}
            </motion.span>

            <div className="flex flex-col xs:flex-row items-center gap-3 xs:gap-4 sm:gap-5 md:gap-6">
                {/* Before */}
                <motion.div className="flex-1 text-center xs:text-left w-full" style={{ opacity: beforeOpacity }}>
                    <p className="text-[10px] xs:text-xs uppercase tracking-widest mb-1 opacity-50">Before</p>
                    <p className="text-base xs:text-lg sm:text-xl md:text-2xl line-through decoration-1">{item.before}</p>
                </motion.div>

                {/* Arrow with animated line */}
                <div className="relative w-10 xs:w-12 sm:w-14 md:w-16 h-px bg-background/20 hidden xs:block">
                    <motion.div className="absolute inset-y-0 left-0 bg-background" style={{ width: lineWidth }} />
                    <motion.span
                        className="absolute -right-1 -top-1.5 text-[10px] xs:text-xs"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                        →
                    </motion.span>
                </div>
                <motion.span
                    className="text-background/40 text-base xs:hidden"
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                    ↓
                </motion.span>

                {/* After */}
                <motion.div className="flex-1 text-center xs:text-right w-full" style={{ opacity: afterOpacity }}>
                    <p className="text-[10px] xs:text-xs uppercase tracking-widest mb-1 opacity-50">After</p>
                    <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-medium">{item.after}</p>
                </motion.div>
            </div>
        </motion.div>
    )
}

const answers = ["We listen first.", "We deliver results.", "We've got you."]

const whatWeDoFloats = [
    { char: "✦", x: 10, y: 20, size: "text-2xl", depth: 0.3 },
    { char: "◆", x: 85, y: 25, size: "text-xl", depth: 0.5 },
    { char: "●", x: 8, y: 70, size: "text-3xl", depth: 0.4 },
    { char: "○", x: 90, y: 75, size: "text-2xl", depth: 0.6 },
    { char: "◇", x: 20, y: 45, size: "text-xl", depth: 0.45 },
    { char: "△", x: 78, y: 55, size: "text-2xl", depth: 0.35 },
]

function WhatWeDoSection() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const floatY1 = useTransform(scrollYProgress, [0, 1], [50, -100])
    const floatY2 = useTransform(scrollYProgress, [0, 1], [30, -60])
    const floatY3 = useTransform(scrollYProgress, [0, 1], [20, -40])
    const textY = useTransform(scrollYProgress, [0, 1], [30, -30])
    const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98])

    const getFloatY = (depth: number) => {
        if (depth <= 0.35) return floatY1
        if (depth <= 0.5) return floatY2
        return floatY3
    }

    return (
        <section
            ref={ref}
            className="relative min-h-screen bg-secondary flex items-center justify-center px-4 xs:px-5 sm:px-6 overflow-hidden"
        >
            {/* Parallax background pattern */}
            <motion.div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    y: bgY,
                    backgroundImage: `linear-gradient(45deg, currentColor 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                }}
            />

            {/* Floating geometric shapes */}
            {whatWeDoFloats.map((f, i) => (
                <motion.span
                    key={i}
                    className={`absolute ${f.size} text-muted-foreground/10 pointer-events-none hidden md:block`}
                    style={{
                        left: `${f.x}%`,
                        top: `${f.y}%`,
                        y: getFloatY(f.depth),
                    }}
                >
                    {f.char}
                </motion.span>
            ))}

            {/* Gradient orbs */}
            <motion.div
                className="absolute w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none"
                style={{ left: "5%", top: "30%", y: floatY2 }}
            />
            <motion.div
                className="absolute w-64 h-64 rounded-full bg-muted/10 blur-3xl pointer-events-none"
                style={{ right: "10%", bottom: "20%", y: floatY3 }}
            />

            <motion.div className="max-w-3xl text-center relative z-10" style={{ y: textY, scale: textScale }}>
                <motion.p
                    className="text-accent text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    What we do
                </motion.p>
                <motion.h2
                    className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-foreground mb-5 sm:mb-6 md:mb-8 leading-[1.15] tracking-tight text-balance"
                    style={{ fontFamily: "var(--font-serif)" }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    Transform uncertainty into
                    <br />
                    <em className="italic">confident action</em>
                </motion.h2>
                <motion.p
                    className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    We partner with businesses who are ready to stop second-guessing and start building something remarkable.
                </motion.p>
            </motion.div>
        </section>
    )
}

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    })

    const questionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 0.3, 0])
    const questionScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.85])

    const parallaxY1 = useTransform(scrollYProgress, [0, 0.4], [0, -200]) // Slowest - foreground
    const parallaxY2 = useTransform(scrollYProgress, [0, 0.4], [0, -130]) // Medium
    const parallaxY3 = useTransform(scrollYProgress, [0, 0.4], [0, -70]) // Fastest - background

    const headlineOpacity = useTransform(scrollYProgress, [0, 0.25, 0.45], [1, 1, 0])
    const headlineScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.85])
    const headlineY = useTransform(scrollYProgress, [0, 0.45], [0, -60])
    const headlineRotate = useTransform(scrollYProgress, [0, 0.45], [0, -2])

    const answersOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1])
    const answersY = useTransform(scrollYProgress, [0.4, 0.55], [60, 0])
    const answersScale = useTransform(scrollYProgress, [0.4, 0.6], [0.9, 1])

    const ctaOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1])
    const ctaY = useTransform(scrollYProgress, [0.55, 0.7], [30, 0])

    const getParallaxY = (depth: number) => {
        if (depth <= 0.3) return parallaxY1
        if (depth <= 0.55) return parallaxY2
        return parallaxY3
    }

    const getSizeClasses = (size: string) => {
        switch (size) {
            case "lg":
                return "px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 lg:py-3.5 text-[11px] sm:text-xs md:text-sm lg:text-base"
            case "md":
                return "px-2.5 sm:px-3 md:px-4 lg:px-5 py-1.5 sm:py-2 md:py-2.5 lg:py-3 text-[10px] sm:text-[11px] md:text-xs lg:text-sm"
            case "sm":
            default:
                return "px-2 sm:px-2.5 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 lg:py-2.5 text-[9px] sm:text-[10px] md:text-xs lg:text-sm"
        }
    }

    return (
        <main>
            <div ref={containerRef} className="relative h-[300vh]">
                {/* Sticky container */}
                <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
                    <motion.div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                            y: useTransform(scrollYProgress, [0, 1], [0, 100]),
                        }}
                    />

                    <motion.div
                        className="absolute w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl pointer-events-none"
                        style={{
                            left: "-10%",
                            top: "20%",
                            y: parallaxY2,
                        }}
                    />
                    <motion.div
                        className="absolute w-[400px] h-[400px] rounded-full bg-muted/5 blur-3xl pointer-events-none"
                        style={{
                            right: "-5%",
                            bottom: "10%",
                            y: parallaxY3,
                        }}
                    />

                    {/* Floating questions with enhanced parallax */}
                    {floatingQuestions.map((q, i) => (
                        <motion.div
                            key={i}
                            className={`absolute ${getSizeClasses(q.size)} bg-card border border-border rounded-full text-muted-foreground font-medium shadow-sm will-change-transform select-none hidden md:block`}
                            style={{
                                left: `${q.x}%`,
                                top: `${q.y}%`,
                                rotate: q.rotation,
                                opacity: questionOpacity,
                                y: getParallaxY(q.depth),
                                scale: questionScale,
                                zIndex: Math.round((1 - q.depth) * 10),
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.03, duration: 0.4 }}
                        >
                            {q.text}
                        </motion.div>
                    ))}

                    {/* Center headline with rotation parallax */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{
                            opacity: headlineOpacity,
                            scale: headlineScale,
                            y: headlineY,
                            rotate: headlineRotate,
                        }}
                    >
                        <div className="text-center px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12">
                            <motion.p
                                className="text-muted-foreground text-xs xs:text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4 tracking-wide"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Stop Guessing. Start Dominating.
                            </motion.p>
                            <motion.h1
                                className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-foreground leading-[1.15] sm:leading-[1.1] tracking-tight text-balance"
                                style={{ fontFamily: "var(--font-serif)" }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                We build Autonomous Growth Ecosystems for ambitious brands.
                                <br />
                                <em className="italic text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-relaxed">
                                    From pixel-perfect Apps to 24/7 AI Sales Agents we replace manual grunt work with scalable, automated
                                    revenue machines.
                                </em>
                            </motion.h1>
                        </div>
                    </motion.div>

                    {/* Answers with scale effect */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{
                            opacity: answersOpacity,
                            y: answersY,
                            scale: answersScale,
                        }}
                    >
                        <div className="text-center px-3 xs:px-4 sm:px-6">
                            <motion.p className="text-accent text-xs xs:text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-6 tracking-wide font-medium">
                                The answer is yes.
                            </motion.p>
                            <div className="space-y-0.5 xs:space-y-1 sm:space-y-2">
                                {answers.map((answer, i) => (
                                    <motion.h2
                                        key={i}
                                        className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-foreground leading-[1.2] sm:leading-[1.15] tracking-tight"
                                        style={{ fontFamily: "var(--font-serif)" }}
                                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        {answer}
                                    </motion.h2>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        className="absolute bottom-20 sm:bottom-24 md:bottom-28 left-1/2 -translate-x-1/2"
                        style={{
                            opacity: ctaOpacity,
                            y: ctaY,
                        }}
                    >
                        <motion.button
                            className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-foreground text-background text-sm sm:text-base font-medium rounded-full hover:scale-105 transition-transform shadow-lg"
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Let's Talk About Your Idea
                        </motion.button>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-4 xs:bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 text-muted-foreground"
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                    >
                        <span className="text-[10px] xs:text-xs sm:text-sm tracking-wide">Scroll</span>
                        <div className="w-3 xs:w-4 sm:w-5 h-5 xs:h-6 sm:h-8 border border-muted-foreground/40 sm:border-2 rounded-full flex justify-center pt-1 sm:pt-1.5">
                            <motion.div
                                className="w-0.5 h-1 xs:h-1.5 sm:h-2 bg-muted-foreground/60 rounded-full"
                                animate={{ y: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            <WhatWeDoSection />
            <ProcessSection />
            <TransformationSection />
        </main>
    )
}
