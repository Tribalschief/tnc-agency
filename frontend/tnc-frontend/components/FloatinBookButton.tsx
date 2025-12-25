"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Clock, Video, ArrowRight, Check } from "lucide-react"

interface BookACallProps {
    calendlyUrl?: string
    buttonText?: string
    className?: string
}

export function BookACall({
    calendlyUrl = "https://calendly.com/your-username",
    buttonText = "Book a Call",
    className = "",
}: BookACallProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`group relative inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 ${className}`}
            >
                <span className="relative z-10 flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    {buttonText}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:h-[85vh] bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-foreground">Schedule a Call</h2>
                                        <p className="text-sm text-muted-foreground">Pick a time that works for you</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                                {/* Left Side - Info */}
                                <div className="p-6 md:w-80 border-b md:border-b-0 md:border-r border-border bg-muted/30">
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-2">Strategy Call</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                Let's discuss your project, explore possibilities, and create a roadmap for success.
                                            </p>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Clock className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-foreground">30 minutes</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Video className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-foreground">Google Meet</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-border">
                                            <h4 className="text-sm font-medium text-foreground mb-3">What we'll cover:</h4>
                                            <ul className="space-y-2">
                                                {[
                                                    "Your project goals & vision",
                                                    "Technical requirements",
                                                    "Timeline & budget",
                                                    "Next steps & proposal",
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Calendly Embed */}
                                <div className="flex-1 overflow-hidden">
                                    <iframe
                                        src={`${calendlyUrl}?hide_gdpr_banner=1&hide_landing_page_details=1&background_color=ffffff&text_color=1a1a1a&primary_color=0a0a0a`}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        title="Schedule a call"
                                        className="w-full h-full min-h-[500px]"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

// Floating Book a Call Button - can be placed anywhere
export function FloatingBookButton({ calendlyUrl }: { calendlyUrl?: string }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-medium rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
            >
                <Video className="w-5 h-5" />
                <span className="hidden sm:inline">Book a Call</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:h-[85vh] bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-foreground">Schedule a Call</h2>
                                        <p className="text-sm text-muted-foreground">Pick a time that works for you</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>

                            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                                <div className="p-6 md:w-80 border-b md:border-b-0 md:border-r border-border bg-muted/30">
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-2">Strategy Call</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                Let's discuss your project, explore possibilities, and create a roadmap for success.
                                            </p>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Clock className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-foreground">30 minutes</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Video className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-foreground">Google Meet</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-border">
                                            <h4 className="text-sm font-medium text-foreground mb-3">What we'll cover:</h4>
                                            <ul className="space-y-2">
                                                {[
                                                    "Your project goals & vision",
                                                    "Technical requirements",
                                                    "Timeline & budget",
                                                    "Next steps & proposal",
                                                ].map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-hidden">
                                    <iframe
                                        src={`${calendlyUrl || "https://calendly.com/https://calendly.com/totalnonstopcreativity/meeting"}?hide_gdpr_banner=1&hide_landing_page_details=1&background_color=ffffff&text_color=1a1a1a&primary_color=0a0a0a`}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        title="Schedule a call"
                                        className="w-full h-full min-h-[500px]"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
