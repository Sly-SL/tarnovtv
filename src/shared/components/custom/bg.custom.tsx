"use client"

import {PointMaterial, Points, type PointsInstancesProps,} from "@react-three/drei";
import {Canvas, useFrame} from "@react-three/fiber";
import * as random from "maath/random";
import {Suspense, useEffect, useMemo, useRef, useState} from "react";
import type {Points as PointsType} from "three";

const Background = (props: PointsInstancesProps) => {
    const ref = useRef<PointsType | null>(null);
    const sphere = useMemo(() =>
            random.inSphere(new Float32Array(5000 * 3), { radius: 1.2 }),
        [],)

    function useStarColor() {
        const [color, setColor] = useState("#000")

        useEffect(() => {
            const update = () => {
                const value = getComputedStyle(document.documentElement)
                    .getPropertyValue("--star-color")
                    .trim()
                setColor(value)
            }

            const media = window.matchMedia("(prefers-color-scheme: dark)")

            update()

            media.addEventListener("change", update)

            return () => {
                media.removeEventListener("change", update)
            }
        }, [])

        return color
    }

    const color = useStarColor()


    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
        }
    });

    return (
        <group rotation={[0, 0, 0]}>
            <Points
                ref={ref}
                stride={3}
                positions={new Float32Array(sphere)}
                frustumCulled
                {...props}
            >
                <PointMaterial
                    transparent
                    color={color}
                    size={0.002}
                    sizeAttenuation
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const StarBackground = () => (
    <div className="w-full h-screen fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
                <Background />
            </Suspense>
        </Canvas>
    </div>
);

export default StarBackground;