'use client'

import {type ReactNode, useEffect, useRef, useState} from 'react';
import {animationPresets, type AnimationPresetType} from "@/shared/components/libs/animate/all-animations.translating";
import "./animations.css"

function useInView(threshold = 0.1, triggerOnce = false) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);


    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        let mounted = true;


        if (observerRef.current) observerRef.current.disconnect();
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!mounted) return;
                if (entry.isIntersecting) {
                    setIsVisible(true);

                    if (triggerOnce) {
                        observer.unobserve(node);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold }
        );

        observer.observe(node);

        return () => {
            mounted = false;
            observer.disconnect();
        };
    }, [ref.current,threshold, triggerOnce]);

    return [ref, isVisible] as const;
}

const Animate = ({
                     children,
                     className,
                     preset,
                     duration = 1000,
                     delay = 0,
                     once = false,
                 }: {
    children: ReactNode;
    className?: string;
    preset?: AnimationPresetType;
    duration?: number;
    delay?: number;
    once?: boolean;
}) => {
    const [ref, isVisible] = useInView(0.1, once);

    const animationClass = preset ? animationPresets[preset] : "";


    return (
        <article
            ref={ref}
            className={`${className} ${isVisible ? animationClass ?? '' : ''}`}
            style={{
                animationDuration: `${duration}ms`,
                animationDelay: `${delay}ms`,
            }}
        >
            {children}
        </article>
    );
};

export default Animate;