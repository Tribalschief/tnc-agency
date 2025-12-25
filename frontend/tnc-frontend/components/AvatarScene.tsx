"use client"

import { useEffect, useRef, useState } from "react"
import {
    Engine,
    Scene,
    Vector3,
    HemisphericLight,
    ArcRotateCamera,
    SceneLoader,
    AbstractMesh,
    AnimationGroup,
    Color4,
    CubeTexture,
    MeshBuilder,
    StandardMaterial,
    Color3,
    ActionManager,
    ExecuteCodeAction,
    Texture,
    PBRMaterial,
    DefaultRenderingPipeline,
    Mesh
} from "@babylonjs/core"
import "@babylonjs/loaders"

// Define Avatar States
export type AvatarState = "IDLE" | "LISTENING" | "THINKING" | "SPEAKING"

interface AvatarSceneProps {
    currentState: AvatarState
    visemeData?: number // Placeholder for lip-sync frame data
    onSceneReady?: (scene: Scene) => void
}

export default function AvatarScene({ currentState, visemeData, onSceneReady }: AvatarSceneProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const engineRef = useRef<Engine | null>(null)
    const sceneRef = useRef<Scene | null>(null)
    const avatarMeshRef = useRef<AbstractMesh | null>(null)
    const animationFrameRef = useRef<number>(0)

    useEffect(() => {
        if (!canvasRef.current) return

        // 1. Initialize Engine
        const engine = new Engine(canvasRef.current, true, { preserveDrawingBuffer: true, stencil: true })
        engineRef.current = engine

        // 2. Create Scene
        const scene = new Scene(engine)
        sceneRef.current = scene
        scene.clearColor = new Color4(0, 0, 0, 0)

        // 3. Camera
        const camera = new ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2.2, 3.5, new Vector3(0, 1.2, 0), scene)
        camera.attachControl(canvasRef.current, true)
        camera.wheelPrecision = 50
        camera.lowerRadiusLimit = 2
        camera.upperRadiusLimit = 6
        camera.inputs.remove(camera.inputs.attached.mousewheel) // Disable zoom for cleaner look

        // 4. Lighting - Studio Setup (Key + Fill + Rim)
        const keyLight = new HemisphericLight("keyLight", new Vector3(1, 1, 0.5), scene)
        keyLight.intensity = 0.8
        keyLight.diffuse = new Color3(1, 0.95, 0.9) // Warm key

        const fillLight = new HemisphericLight("fillLight", new Vector3(-1, 0.5, -0.5), scene)
        fillLight.intensity = 0.4
        fillLight.diffuse = new Color3(0.8, 0.8, 1) // Cool fill

        const rimLight = new HemisphericLight("rimLight", new Vector3(0, 1, -1), scene)
        rimLight.intensity = 0.6
        rimLight.diffuse = new Color3(1, 1, 1) // White rim for separation

        // 4.5 Post-Processing Pipeline
        const pipeline = new DefaultRenderingPipeline(
            "defaultPipeline",
            true, // HDR?
            scene,
            [camera]
        )
        pipeline.glowLayerEnabled = true
        pipeline.glowLayer!.intensity = 0.3

        pipeline.imageProcessingEnabled = true
        pipeline.imageProcessing.contrast = 1.2
        pipeline.imageProcessing.exposure = 1.1

        // Depth of Field (Simulating "Medium close-up" focus)
        pipeline.depthOfFieldEnabled = true
        pipeline.depthOfField.focusDistance = 3500 // Focus on face
        pipeline.depthOfField.focalLength = 300
        pipeline.depthOfField.fStop = 2.8
        pipeline.depthOfFieldBlurLevel = 1 // Low blur for specific focus

        // 5. Create Fallback Humanoid (Minimalist Low-Poly Style)
        createHumanoidAvatar(scene)

        // 6. Render Loop
        engine.runRenderLoop(() => {
            scene.render()
        })

        const handleResize = () => engine.resize()
        window.addEventListener("resize", handleResize)

        if (onSceneReady) onSceneReady(scene)

        return () => {
            window.removeEventListener("resize", handleResize)
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
            scene.dispose()
            engine.dispose()
        }
    }, [])

    // State Transition Handling
    useEffect(() => {
        if (!avatarMeshRef.current) return
        animateState(currentState)
    }, [currentState])

    const createHumanoidAvatar = (scene: Scene) => {
        // Parent Mesh
        const root = new Mesh("root", scene) // Changed from AbstractMesh

        // PBR Skin Material
        const skinMat = new PBRMaterial("skinMat", scene)
        skinMat.albedoColor = new Color3(0.95, 0.85, 0.75)
        skinMat.metallic = 0
        skinMat.roughness = 0.4
        skinMat.subSurface.isRefractionEnabled = true
        skinMat.subSurface.indexOfRefraction = 1.5
        skinMat.subSurface.tintColor = new Color3(0.8, 0.4, 0.4)

        // PBR Clothing Material
        const shirtMat = new PBRMaterial("shirtMat", scene)
        shirtMat.albedoColor = new Color3(0.1, 0.15, 0.25)
        shirtMat.metallic = 0.1
        shirtMat.roughness = 0.7
        shirtMat.sheen.isEnabled = true
        shirtMat.sheen.intensity = 0.5

        const hairMat = new PBRMaterial("hairMat", scene)
        hairMat.albedoColor = new Color3(0.1, 0.1, 0.1)
        hairMat.roughness = 0.9

        // --- HEAD ---
        const head = MeshBuilder.CreateSphere("head", { diameter: 0.65, segments: 32 }, scene)
        head.position.y = 1.7
        head.scaling = new Vector3(0.85, 1, 0.9) // Oval shape
        head.material = skinMat
        head.parent = root

        // Neck
        const neck = MeshBuilder.CreateCylinder("neck", { height: 0.3, diameter: 0.25 }, scene)
        neck.position.y = 1.45
        neck.material = skinMat
        neck.parent = root

        // --- FACE FEATURES ---
        // Nose
        const nose = MeshBuilder.CreateSphere("nose", { diameter: 0.1, segments: 16 }, scene)
        nose.position = new Vector3(0, 0, 0.3)
        nose.scaling = new Vector3(0.6, 1.2, 0.5)
        nose.material = skinMat
        nose.parent = head

        // Eyes
        const eyeWhiteMat = new StandardMaterial("eyeWhite", scene)
        eyeWhiteMat.diffuseColor = new Color3(0.9, 0.9, 0.9)
        const irisMat = new StandardMaterial("iris", scene)
        irisMat.diffuseColor = new Color3(0.2, 0.4, 0.8) // Blue eyes
        const pupilMat = new StandardMaterial("pupil", scene)
        pupilMat.diffuseColor = new Color3(0, 0, 0)

        // Eyelids (Skin colored spheres that rotate to cover eyes)
        const eyelidMat = skinMat

        const createEye = (side: "left" | "right") => {
            const xOffset = side === "left" ? -0.12 : 0.12
            const eyeGroup = new Mesh(side + "EyeGroup", scene) // Changed from AbstractMesh
            eyeGroup.parent = head
            eyeGroup.position = new Vector3(xOffset, 0.05, 0.26)

            // Eyeball
            const eyeball = MeshBuilder.CreateSphere(side + "Eyeball", { diameter: 0.13 }, scene)
            eyeball.rotation.x = Math.PI / 2
            eyeball.material = eyeWhiteMat
            eyeball.parent = eyeGroup

            // Iris
            const iris = MeshBuilder.CreateCylinder(side + "Iris", { height: 0.01, diameter: 0.07 }, scene)
            iris.rotation.x = Math.PI / 2
            iris.position.z = 0.06
            iris.material = irisMat
            iris.parent = eyeGroup

            // Pupil
            const pupil = MeshBuilder.CreateCylinder(side + "Pupil", { height: 0.011, diameter: 0.035 }, scene)
            pupil.rotation.x = Math.PI / 2
            pupil.position.z = 0.06
            pupil.material = pupilMat
            pupil.parent = eyeGroup

            // Eyelid (Upper) for blinking
            const eyelid = MeshBuilder.CreateSphere(side + "Eyelid", { diameter: 0.14, slice: 0.5 }, scene)
            eyelid.rotation.x = Math.PI / 2
            eyelid.rotation.y = Math.PI // Face down/forward
            eyelid.material = eyelidMat
            eyelid.parent = eyeGroup
            // Start open
            eyelid.rotation.x = -0.5 // Retracted up

            // Eyebrow
            const brow = MeshBuilder.CreateBox(side + "Brow", { width: 0.15, height: 0.03, depth: 0.02 }, scene)
            brow.position = new Vector3(xOffset, 0.18, 0.3)
            brow.rotation.z = side === "left" ? 0.1 : -0.1
            brow.material = hairMat
            brow.parent = head
        }

        createEye("left")
        createEye("right")

        // Mouth (Neutral)
        const mouth = MeshBuilder.CreateTube("mouth", {
            path: [new Vector3(-0.1, -0.15, 0.28), new Vector3(0, -0.16, 0.29), new Vector3(0.1, -0.15, 0.28)],
            radius: 0.015,
            sideOrientation: 2
        }, scene)
        const mouthMat = new StandardMaterial("mouthMat", scene)
        mouthMat.diffuseColor = new Color3(0.7, 0.4, 0.4)
        mouth.material = mouthMat
        mouth.parent = head

        // Ears
        const createEar = (side: "left" | "right") => {
            const xPos = side === "left" ? -0.33 : 0.33
            const ear = MeshBuilder.CreateSphere(side + "Ear", { diameter: 0.15 }, scene)
            ear.scaling = new Vector3(0.5, 1.2, 0.8)
            ear.position = new Vector3(xPos, 0, 0)
            ear.material = skinMat
            ear.parent = head
        }
        createEar("left")
        createEar("right")

        // Hair (Simple Style)
        const hair = MeshBuilder.CreateSphere("hair", { diameter: 0.66, segments: 16 }, scene)
        hair.scaling = new Vector3(0.9, 0.9, 0.95)
        hair.position = new Vector3(0, 0.1, -0.05)
        hair.material = hairMat
        hair.parent = head

        // --- BODY ---
        const torso = MeshBuilder.CreateCylinder("torso", { height: 0.7, diameterTop: 0.28, diameterBottom: 0.26 }, scene) // Neck hole
        torso.isVisible = false

        // Shoulders / Upper Body
        const shoulders = MeshBuilder.CreateBox("shoulders", { width: 0.9, height: 0.3, depth: 0.4 }, scene)
        shoulders.position.y = 1.25
        shoulders.material = shirtMat
        shoulders.parent = root

        // Chest
        const chest = MeshBuilder.CreateBox("chest", { width: 0.8, height: 0.6, depth: 0.35 }, scene)
        chest.position.y = 0.9
        chest.material = shirtMat
        chest.parent = root

        // Arms
        const createArm = (side: "left" | "right") => {
            const xPos = side === "left" ? -0.5 : 0.5
            const armGroup = new Mesh(side + "Arm", scene) // Changed from AbstractMesh
            armGroup.parent = root
            armGroup.position = new Vector3(xPos, 1.2, 0)

            const upperArm = MeshBuilder.CreateCylinder("upper", { height: 0.6, diameter: 0.14 }, scene)
            upperArm.position.y = -0.3
            upperArm.material = shirtMat
            upperArm.parent = armGroup

            return armGroup
        }
        createArm("left")
        createArm("right")

        avatarMeshRef.current = root
        avatarMeshRef.current.position.y = -1
    }

    const animateState = (state: AvatarState) => {
        const root = avatarMeshRef.current
        if (!root) return

        const head = root.getChildren().find(m => m.name === "head") as Mesh
        // Find eyelids
        const leftEyelid = head?.getChildren().find(m => m.name === "leftEyeGroup")?.getChildren().find(m => m.name === "leftEyelid") as Mesh
        const rightEyelid = head?.getChildren().find(m => m.name === "rightEyeGroup")?.getChildren().find(m => m.name === "rightEyelid") as Mesh

        if (!head) return

        // Stop previous simple animations
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)

        const start = performance.now()
        let nextBlink = start + 500 + Math.random() * 3000

        const animate = (time: number) => {
            const t = (time - start) / 1000

            // 1. GENERAL MOVEMENT
            if (state === "IDLE") {
                // Subtle breathing head bob
                head.position.y = 1.7 + Math.sin(t * 1.5) * 0.003
                head.rotation.y = Math.sin(t * 0.3) * 0.03
                head.rotation.x = Math.sin(t * 0.7) * 0.015
            } else if (state === "LISTENING") {
                // Lean forward, minimal movement, focus
                head.rotation.x = 0.12 + Math.sin(t * 2) * 0.01
                head.rotation.y = Math.sin(t * 0.4) * 0.02
            } else if (state === "THINKING") {
                // Look up/away
                head.rotation.x = -0.15 + Math.sin(t) * 0.02
                head.rotation.y = 0.25 + Math.sin(t * 1.5) * 0.03
            } else if (state === "SPEAKING") {
                // Head nods on speech rhythm
                head.rotation.x = Math.sin(t * 8) * 0.04
                head.position.y = 1.7 + Math.sin(t * 10) * 0.002
                head.rotation.y = Math.sin(t * 2) * 0.05
            }

            // 2. BLINKING
            if (leftEyelid && rightEyelid) {
                if (time > nextBlink) {
                    // Start Blink
                    const blinkDuration = 150
                    const progress = (time - nextBlink) / blinkDuration

                    if (progress < 0.5) {
                        // Close
                        const val = -0.5 + (progress * 2) * (Math.PI / 2 + 0.5)
                        leftEyelid.rotation.x = Math.min(Math.PI / 2, Math.max(-0.5, val))
                        rightEyelid.rotation.x = Math.min(Math.PI / 2, Math.max(-0.5, val))
                    } else if (progress < 1.0) {
                        // Open
                        const val = Math.PI / 2 - ((progress - 0.5) * 2) * (Math.PI / 2 + 0.5)
                        leftEyelid.rotation.x = Math.min(Math.PI / 2, Math.max(-0.5, val))
                        rightEyelid.rotation.x = Math.min(Math.PI / 2, Math.max(-0.5, val))
                    } else {
                        // End Blink
                        leftEyelid.rotation.x = -0.5
                        rightEyelid.rotation.x = -0.5
                        nextBlink = time + 2000 + Math.random() * 4000 // Next blink in 2-6s
                    }
                }
            }

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animationFrameRef.current = requestAnimationFrame(animate)
    }

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full outline-none touch-none"
            style={{ width: "100%", height: "100%" }}
        />
    )
}
