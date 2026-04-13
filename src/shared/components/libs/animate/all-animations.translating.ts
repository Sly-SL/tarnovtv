export const animationPresets = {
    // entrance
    fadeUp: "animate-fade-in-up",
    fadeDown: "animate-fade-in-down",
    fadeLeft: "animate-fade-in-left",
    fadeRight: "animate-fade-in-right",
    zoomIn: "animate-zoom-in-up",
    blurIn: "animate-fade-in-blur",
    slideRotate: "animate-slide-rotate-in",
    bounceIn: "animate-scale-in-bounce",

    // ambient
    slowPan: "animate-slow-pan",
    gradient: "animate-gradient-slow",
    float: "animate-float",
    rotate: "animate-rotate-slow",

    // attention
    bounceLoop: "animate-bounce-smooth",
    flash: "animate-flash-soft",
    magnetic: "animate-magnetic",

    // special
    typing: "animate-typing",
} as const;

export type AnimationPresetType = keyof typeof animationPresets;