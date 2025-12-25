'use client'
import {
    ScrollVelocityContainer,
    ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity"
import { AuroraText } from "./ui/aurora-text"
import { Lens } from "./ui/lens"
import { useEffect } from "react"
import gsap from "gsap"



const IMAGES_ROW_A = [
    "/isec1.jpeg", "/isec3.jpeg", "/isec5.jpeg", "/isec7.jpeg"
]

const IMAGES_ROW_B = [
    "/isec2.jpeg", "/isec4.jpeg", "/isec6.jpeg", "/isec8.jpeg"
]

export function ImageSection() {
    useEffect(() => {
        gsap.fromTo("aurora-text", { opacity: 0, y: -20 }, {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "elastic",
        })

    }, [])
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8 aurora-text">
            <AuroraText className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"> We Provide Services for Your Business Includes</AuroraText>
            <ScrollVelocityContainer className="w-full">
                <ScrollVelocityRow baseVelocity={6} direction={1} className="py-4">
                    {IMAGES_ROW_A.map((src, idx) => (
                        <Lens
                            zoomFactor={2}
                            lensSize={150}
                            isStatic={false}
                            ariaLabel="Zoom Area"
                        >
                            <img
                                key={idx}
                                src={src || "/placeholder.svg"}
                                alt={`Gallery image ${idx + 1}`}
                                width={240}
                                height={160}
                                loading="lazy"
                                decoding="async"
                                className="mx-4 inline-block h-60 w-80 rounded-lg object-cover shadow-sm"
                            />
                        </Lens>
                    ))}
                </ScrollVelocityRow>
                <ScrollVelocityRow baseVelocity={6} direction={-1} className="py-4">
                    {IMAGES_ROW_B.map((src, idx) => (
                        <Lens zoomFactor={2}
                            lensSize={150}
                            isStatic={false}
                            ariaLabel="Zoom Area">
                            <img
                                key={idx}
                                src={src || "/placeholder.svg"}
                                alt={`Gallery image ${idx + 5}`}
                                width={240}
                                height={160}
                                loading="lazy"
                                decoding="async"
                                className="mx-4 inline-block h-60 w-80 rounded-lg object-cover shadow-sm"
                            />
                        </Lens>
                    ))}
                </ScrollVelocityRow>
            </ScrollVelocityContainer>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
    )
}