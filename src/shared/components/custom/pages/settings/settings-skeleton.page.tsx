const SettingsSkeletonPage = () => {
    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-hidden">

            {/* ── Background layer ── */}
            <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-(--contrast-color)/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-pink-500/[0.07] blur-[100px] pointer-events-none" />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 100%)",
                }}
            />

            {/* ── Header ── */}
            <div className="relative z-10 px-4 sm:px-8 lg:px-12 pt-8 pb-6 border-b border-white/[0.06]">
                <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                    <div className="flex flex-col gap-2">
                        <div className="w-32 h-5 rounded-full bg-white/[0.06] animate-pulse" />
                        <div className="w-56 h-8 rounded-xl bg-white/[0.06] animate-pulse" />
                        <div className="w-64 h-4 rounded-lg bg-white/[0.04] animate-pulse" />
                    </div>
                    <div className="hidden sm:flex items-center gap-3">
                        <div className="w-28 h-4 rounded-lg bg-white/[0.04] animate-pulse" />
                        <div className="w-16 h-6 rounded-full bg-white/[0.06] animate-pulse" />
                    </div>
                </div>
            </div>

            {/* ── Main content ── */}
            <div className="relative z-10 flex-1 px-4 sm:px-8 lg:px-12 py-8">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-6 lg:gap-8">

                        {/* Left: Avatar card skeleton */}
                        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.028] p-6 flex flex-col items-center gap-4">
                            <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full bg-white/[0.06] animate-pulse" />
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-28 h-4 rounded-lg bg-white/[0.06] animate-pulse" />
                                <div className="w-16 h-5 rounded-full bg-white/[0.04] animate-pulse" />
                            </div>
                            <div className="w-full h-px bg-white/[0.05]" />
                            <div className="w-full flex flex-col gap-2">
                                <div className="w-full h-12 rounded-xl bg-white/[0.04] animate-pulse" />
                                <div className="w-full h-12 rounded-xl bg-white/[0.04] animate-pulse" />
                            </div>
                        </div>

                        {/* Right: Form card skeleton */}
                        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.028] p-6 sm:p-8 flex flex-col gap-4">
                            <div className="w-24 h-3 rounded bg-white/[0.04] animate-pulse" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="w-full h-14 rounded-xl bg-white/[0.04] animate-pulse" />
                                <div className="w-full h-14 rounded-xl bg-white/[0.04] animate-pulse" />
                            </div>
                            <div className="w-full h-14 rounded-xl bg-white/[0.04] animate-pulse" />
                            <div className="w-full h-12 rounded-xl bg-white/[0.04] animate-pulse" />
                            <div className="w-full h-px bg-white/[0.05]" />
                            <div className="w-24 h-3 rounded bg-white/[0.04] animate-pulse" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="w-full h-14 rounded-xl bg-white/[0.04] animate-pulse" />
                                <div className="w-full h-14 rounded-xl bg-white/[0.04] animate-pulse" />
                            </div>
                            <div className="w-full h-px bg-white/[0.05]" />
                            <div className="sm:self-end sm:min-w-[200px] h-12 rounded-xl bg-white/[0.06] animate-pulse" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsSkeletonPage;