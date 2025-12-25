"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import AvatarScene, { AvatarState } from "./AvatarScene"
import { Mic, MicOff, Send, Sparkles, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { MorphingText } from "./ui/morphing-text"

type Message = {
    id: string
    role: "user" | "assistant"
    content: string
}

export default function AvatarInterface() {
    const [state, setState] = useState<AvatarState>("IDLE")
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "assistant", content: "Welcome to the future of business. Are you looking to Automate your Operations, or Scale your Revenue?" }
    ])
    const [input, setInput] = useState("")
    const [isListening, setIsListening] = useState(false)
    const [sessionId] = useState(() => `sess_${Math.random().toString(36).substr(2, 9)}`)
    const [context, setContext] = useState<any>(null)
    const [showContext, setShowContext] = useState(false)

    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSendMessage = async () => {
        if (!input.trim()) return

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: input }
        setMessages(prev => [...prev, userMsg])
        setInput("")

        processResponse(input)
    }

    const processResponse = async (userText: string) => {
        setState("THINKING")

        const API_URL = process.env.NEXT_PUBLIC_API_URL || "NEXT_PUBLIC_API_URL=https://classical-tybie-rag-chatbot-44e67076.koyeb.app";

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userText,
                    session_id: sessionId
                })
            })

            if (!response.ok) throw new Error("Backend connection failed")

            const data = await response.json()
            const aiResponseText = data.text

            if (data.context) setContext(data.context)

            const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: aiResponseText }
            setMessages(prev => [...prev, aiMsg])

            setState("SPEAKING")

            const duration = Math.max(2000, aiResponseText.split(" ").length * 300)
            setTimeout(() => {
                setState("IDLE")
            }, duration)

        } catch (error) {
            console.error("Chat Error:", error)
            const errorMsg: Message = { id: Date.now().toString(), role: "assistant", content: "I am detecting slight interference in the neural link. Checking systems..." }
            setMessages(prev => [...prev, errorMsg])
            setState("IDLE")
        }
    }

    const toggleListening = useCallback(() => {
        if (state === "SPEAKING" || state === "THINKING") return

        if (state === "LISTENING") {
            setIsListening(false)
            const simulatedVoiceText = "I am a local clinic looking to automate appointments."
            const userMsg: Message = { id: Date.now().toString(), role: "user", content: simulatedVoiceText }
            setMessages(prev => [...prev, userMsg])
            processResponse(simulatedVoiceText)
        } else {
            setState("LISTENING")
            setIsListening(true)
        }
    }, [state])

    return (
        <div className="relative w-full h-screen overflow-hidden font-sans">

            {/* 3D SCENE BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <AvatarScene currentState={state} />
                <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-transparent to-black/20" />
            </div>
            {/* Header */}

            <div className=" pointer-events-auto  text-[4px] md:text-[10px] font-bold text-black uppercase mb-3 tracking-widest ">
                <MorphingText texts={["We Have A New AI", "Revolutionizing Business"]} />
            </div>

            {/* CONTEXT DEBUG OVERLAY (LAYER 2) */}
            {context && (
                <div className="absolute top-6 left-6 z-20 pointer-events-auto">
                    <button
                        onClick={() => setShowContext(!showContext)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] text-cyan-400 font-mono tracking-wider hover:bg-black/60 transition-all"
                    >
                        <Activity className="w-3 h-3" />
                        {showContext ? "HIDE ARCHITECT_FACTS" : "SHOW ARCHITECT_FACTS"}
                    </button>

                    {showContext && (
                        <div className="mt-2 p-4 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 w-64 animate-in fade-in slide-in-from-left-4">
                            <h3 className="text-[10px] font-bold text-white/40 uppercase mb-3 tracking-widest">Digital Audit Context</h3>
                            <div className="space-y-3">
                                {Object.entries(context).map(([key, value]) => (
                                    <div key={key} className="flex flex-col gap-1">
                                        <span className="text-[9px] text-cyan-500/70 uppercase font-mono">{key.replace('_', ' ')}</span>
                                        <span className="text-sm text-gray-200 font-light italic">{value as string}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* MAIN UI LAYER */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-12 pointer-events-none">

                {/* MIDDLE: Subtitles / Chat History */}
                <div className="flex-1 flex flex-col items-center justify-end pb-8 max-w-3xl mx-auto w-full gap-4">
                    <div className="w-full flex-1 flex flex-col justify-end gap-3 overflow-hidden">
                        {messages.slice(-3).map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "max-w-[80%] md:max-w-[60%] p-4 rounded-2xl backdrop-blur-md transition-all duration-500 animate-in fade-in slide-in-from-bottom-4",
                                    msg.role === "user"
                                        ? "self-end bg-white/10 text-white border border-white/10"
                                        : "self-start bg-black/40 text-gray-100 border border-white/5"
                                )}
                            >
                                <p className="text-lg md:text-xl font-light leading-relaxed">{msg.content}</p>
                            </div>
                        ))}

                        {state === "THINKING" && (
                            <div className="self-start bg-black/20 backdrop-blur-lg px-6 py-3 rounded-full border border-white/5 animate-pulse">
                                <span className="text-xs font-mono text-cyan-400">ANALYZING ROI POTENTIAL...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* BOTTOM: Input Controls */}
                <div className="w-full max-w-2xl mx-auto pointer-events-auto">
                    <div className={cn(
                        "relative flex items-center gap-3 p-2 mb-10 md:mb-20 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300",
                        isListening ? "border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]" : "hover:border-white/20"
                    )}>

                        <button
                            onClick={toggleListening}
                            className={cn(
                                "p-4 rounded-xl transition-all duration-300 relative overflow-hidden group",
                                isListening ? "bg-cyan-500 text-black" : "bg-white/5 text-white hover:bg-white/10"
                            )}
                        >
                            {isListening ? (
                                <>
                                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                    <MicOff className="w-6 h-6 relative z-10" />
                                </>
                            ) : (
                                <Mic className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            )}
                        </button>

                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder={isListening ? "Listening to your pain points..." : "State your business objective..."}
                            className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder:text-white/30 px-2 font-light"
                            disabled={isListening}
                        />

                        <button
                            onClick={handleSendMessage}
                            disabled={(!input.trim() && !isListening)}
                            className="p-3 rounded-xl bg-white/5 text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>

                    <p className="text-center text-[10px] text-white/20 mt-4 tracking-widest font-light uppercase">
                        Growth Architecture • Neural Processing • ROI Domination
                    </p>
                </div>
            </div>
        </div>
    )
}
