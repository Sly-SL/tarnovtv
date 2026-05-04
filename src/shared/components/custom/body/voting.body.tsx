"use client";

import {type CSSProperties, useState, useTransition} from "react";
import {votingVote} from "@/lib/firebase/patch/voting-vote.patch";
import {toast} from "sonner";
import type {VotingType} from "@/shared/types/domen/voting.type";

type Props = {
    voting: VotingType;
    userId?: string;
    style?: CSSProperties;
};

const VotingCard = ({voting, userId, style}: Props) => {
    const [localVoting, setLocalVoting] = useState(voting);
    const [selected, setSelected] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const hasVoted = userId ? localVoting.votedBy.includes(userId) : false;
    const totalVotes = localVoting.options.reduce((s, o) => s + o.votes, 0);

    const handleVote = (optionId: string) => {
        if (!userId) return toast.error("Musisz być zalogowany");
        if (hasVoted) return;
        setSelected(optionId);
        startTransition(async () => {
            try {
                await votingVote(localVoting.id, optionId, userId);
                // optimistic update
                setLocalVoting(v => ({
                    ...v,
                    votedBy: [...v.votedBy, userId],
                    options: v.options.map(o =>
                        o.id === optionId ? {...o, votes: o.votes + 1} : o
                    ),
                }));
                toast.success("Zagłosowano!");
            } catch (e: unknown) {
                if (e instanceof Error && e.message === "Already voted") {
                    toast.error("Już zagłosowałeś");
                } else {
                    toast.error("Coś poszło nie tak");
                }
                setSelected(null);
            }
        });
    };

    const showResults = hasVoted || !localVoting.active;

    return (
        <div
            className="rounded-2xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.35)] p-6 flex flex-col gap-4"
            style={style}
        >
            {/* Status badge */}
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-widest uppercase text-white/35">
                    Głosowanie
                </span>
                <span className={[
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase border",
                    localVoting.active
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                        : "text-white/25 bg-white/[0.03] border-white/[0.05]",
                ].join(" ")}>
                    <span className={["w-1 h-1 rounded-full", localVoting.active ? "bg-emerald-400 animate-pulse" : "bg-white/20"].join(" ")}/>
                    {localVoting.active ? "Aktywne" : "Zakończone"}
                </span>
            </div>

            {/* Question */}
            <p className="text-base font-bold text-white leading-snug">{localVoting.question}</p>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"/>

            {/* Options */}
            <ul className="flex flex-col gap-2">
                {localVoting.options.map((option) => {
                    const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                    const isChosen = selected === option.id || (hasVoted && localVoting.votedBy.includes(userId ?? "") && selected === option.id);

                    return (
                        <li key={option.id}>
                            {showResults ? (
                                /* Result bar */
                                <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-2.5">
                                    <div
                                        className="absolute inset-y-0 left-0 bg-(--contrast-color)/15 transition-all duration-700 rounded-xl"
                                        style={{width: `${pct}%`}}
                                    />
                                    <div className="relative flex items-center justify-between">
                                        <span className="text-sm text-white/70 font-medium">{option.label}</span>
                                        <span className="text-xs font-bold text-(--contrast-color)">{pct}%</span>
                                    </div>
                                </div>
                            ) : (
                                /* Vote button */
                                <button
                                    type="button"
                                    onClick={() => handleVote(option.id)}
                                    disabled={isPending || !localVoting.active}
                                    className={[
                                        "w-full px-4 py-2.5 rounded-xl border text-sm font-medium text-left transition-all duration-150 disabled:opacity-50",
                                        isChosen
                                            ? "border-(--contrast-color)/45 bg-(--contrast-color)/10 text-(--contrast-color)"
                                            : "border-white/[0.07] bg-white/[0.025] text-white/60 hover:border-(--contrast-color)/25 hover:text-white hover:bg-(--contrast-color)/[0.05]",
                                    ].join(" ")}
                                >
                                    {option.label}
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>

            {/* Footer */}
            <p className="text-[10px] text-white/25 text-right">
                {totalVotes} {totalVotes === 1 ? "głos" : totalVotes < 5 ? "głosy" : "głosów"}
            </p>
        </div>
    );
};

export default VotingCard;