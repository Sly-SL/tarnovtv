"use client";

import {useEffect, useState, useTransition} from "react";
import type {VotingOptionType, VotingType} from "@/shared/types/domen/voting.type";
import {
    MinusCircleIcon,
    PencilSimpleIcon,
    PlusCircleIcon,
    PlusIcon,
    SparkleIcon,
    TrashIcon,
    XIcon
} from "@phosphor-icons/react";
import {toast} from "sonner";
import {ModeratorMiddleware} from "@/middlewares/moderator.middleware";
import {votingsGet} from "@/lib/firebase/get/voting.get";
import {votingPatch} from "@/lib/firebase/patch/voting.patch";
import {votingPost} from "@/lib/firebase/post/voting.post";
import {votingDelete} from "@/lib/firebase/delete/voting.delete";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {ArrowLeftIcon} from "@phosphor-icons/react/ssr";


const inputCls = "w-full px-3 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm placeholder:text-white/20 outline-none focus:border-(--contrast-color)/40 focus:bg-(--contrast-color)/[0.06] transition-all duration-200";
const labelCls = "block text-[10px] font-medium tracking-widest uppercase text-white/35 mb-1.5";

type FormOption = {id: string; label: string};

const EMPTY_OPTIONS: FormOption[] = [{id: "option_1", label: ""}, {id: "option_2", label: ""}];

const EMPTY = {question: "", active: true};

export default function VotingAdminPage() {
    const [votings, setVotings] = useState<VotingType[]>([]);
    const [editing, setEditing] = useState<VotingType | null>(null);
    const [form, setForm] = useState(EMPTY);
    const [options, setOptions] = useState<FormOption[]>(EMPTY_OPTIONS);
    const [showForm, setShowForm] = useState(false);
    const [isPending, startTransition] = useTransition();

    const load = async () => {
        const data = await votingsGet();
        setVotings(data);
        await ModeratorMiddleware();
    };

    useEffect(() => {load();}, []);

    const openNew = () => {
        setEditing(null);
        setForm(EMPTY);
        setOptions(EMPTY_OPTIONS);
        setShowForm(true);
    };

    const openEdit = (v: VotingType) => {
        setEditing(v);
        setForm({question: v.question, active: v.active});
        setOptions(v.options.map(o => ({id: o.id, label: o.label})));
        setShowForm(true);
    };

    const closeForm = () => {
        setEditing(null);
        setForm(EMPTY);
        setOptions(EMPTY_OPTIONS);
        setShowForm(false);
    };

    const addOption = () => {
        setOptions(o => [...o, {id: `option_${o.length + 1}`, label: ""}]);
    };

    const removeOption = (idx: number) => {
        setOptions(o => o.filter((_, i) => i !== idx));
    };

    const handleSave = () => {
        const validOptions = options.filter(o => o.label.trim());
        if (!form.question.trim()) return toast.error("Wpisz pytanie");
        if (validOptions.length < 2) return toast.error("Dodaj co najmniej 2 opcje");

        startTransition(async () => {
            try {
                if (editing) {
                    // preserve existing vote counts, only update labels/active
                    const mergedOptions: VotingOptionType[] = validOptions.map(o => {
                        const existing = editing.options.find(e => e.id === o.id);
                        return {id: o.id, label: o.label, votes: existing?.votes ?? 0};
                    });
                    await votingPatch(editing.id, {question: form.question, active: form.active, options: mergedOptions});
                    toast.success("Zaktualizowano głosowanie");
                } else {
                    await votingPost({
                        question: form.question,
                        active: form.active,
                        options: validOptions.map(o => ({...o, votes: 0})),
                        votedBy: [],
                        createdAt: Date.now(),
                    });
                    toast.success("Dodano głosowanie");
                }
                closeForm();
                await load();
            } catch {
                toast.error("Coś poszło nie tak");
            }
        });
    };

    const handleDelete = (id: string) => {
        startTransition(async () => {
            try {
                await votingDelete(id);
                toast.success("Usunięto głosowanie");
                await load();
            } catch {
                toast.error("Nie udało się usunąć");
            }
        });
    };

    const handleToggleActive = (v: VotingType) => {
        startTransition(async () => {
            try {
                await votingPatch(v.id, {active: !v.active});
                toast.success(v.active ? "Dezaktywowano" : "Aktywowano");
                await load();
            } catch {
                toast.error("Coś poszło nie tak");
            }
        });
    };

    return (
        <div className="relative min-h-screen px-4 py-16 overflow-hidden">
            <div className="absolute -top-40 -right-28 w-[500px] h-[500px] rounded-full bg-amber-500/[0.07] blur-[90px] pointer-events-none"/>
            <div className="absolute -bottom-24 -left-20 w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none"/>
            <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",backgroundSize:"48px 48px",maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)"}}/>

            <div className="relative z-10 max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-10" style={{animation:"fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both"}}>
                    <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
                    <div>

                        <Link
                            href={shortcuts.settings+shortcuts.moderator}
                            className="inline-flex items-center gap-5 text-xs text-white/30 hover:text-white/60 transition-colors mb-6"
                        >
                            <ArrowLeftIcon size={12} />
                            Wróć do panelu
                        </Link>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold tracking-widest uppercase text-amber-300/85">
                            <SparkleIcon size={9}/>
                            Panel moderatora
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">Zarządzaj głosowaniami</h1>
                        <p className="text-sm text-white/30 font-light mt-1">Twórz pytania i zarządzaj opcjami głosowania.</p>
                    </div>
                    <button
                        onClick={openNew}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-br from-(--contrast-color) to-indigo-500 text-white text-sm font-semibold shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:opacity-90 transition-all duration-150"
                    >
                        <PlusIcon size={16}/>
                        Nowe głosowanie
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

                    {/* List */}
                    <div className="flex flex-col gap-3">
                        {votings.length === 0 && (
                            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.028] p-10 text-center text-white/25 text-sm">
                                Brak głosowań — dodaj pierwsze →
                            </div>
                        )}
                        {votings.map((v) => {
                            const total = v.options.reduce((s, o) => s + o.votes, 0);
                            return (
                                <div
                                    key={v.id}
                                    className={[
                                        "flex items-start gap-4 p-5 rounded-2xl border backdrop-blur-xl transition-all duration-150",
                                        editing?.id === v.id
                                            ? "border-(--contrast-color)/40 bg-(--contrast-color)/[0.06]"
                                            : "border-white/[0.07] bg-white/[0.028] hover:border-white/[0.12]",
                                    ].join(" ")}
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-sm font-semibold text-white truncate">{v.question}</p>
                                            <span className={[
                                                "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest shrink-0",
                                                v.active ? "bg-emerald-500/10 text-emerald-400" : "bg-white/[0.05] text-white/25",
                                            ].join(" ")}>
                                                {v.active ? "Aktywne" : "Zakończone"}
                                            </span>
                                        </div>
                                        <p className="text-xs text-white/30 mt-1">
                                            {v.options.length} opcji · {total} {total === 1 ? "głos" : total < 5 ? "głosy" : "głosów"}
                                        </p>
                                    </div>
                                    <div className="flex gap-1.5 shrink-0">
                                        <button
                                            onClick={() => handleToggleActive(v)}
                                            disabled={isPending}
                                            className={[
                                                "w-8 h-8 rounded-xl border flex items-center justify-center text-xs font-bold transition-all duration-150 disabled:opacity-40",
                                                v.active
                                                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
                                                    : "border-white/[0.07] bg-white/[0.025] text-white/25 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20",
                                            ].join(" ")}
                                            title={v.active ? "Dezaktywuj" : "Aktywuj"}
                                        >
                                            {v.active ? "✓" : "○"}
                                        </button>
                                        <button
                                            onClick={() => openEdit(v)}
                                            className="w-8 h-8 rounded-xl border border-white/[0.07] bg-white/[0.025] flex items-center justify-center text-white/35 hover:text-(--contrast-color) hover:border-(--contrast-color)/25 transition-all duration-150"
                                        >
                                            <PencilSimpleIcon size={14}/>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(v.id)}
                                            disabled={isPending}
                                            className="w-8 h-8 rounded-xl border border-white/[0.07] bg-white/[0.025] flex items-center justify-center text-white/35 hover:text-red-400 hover:border-red-400/25 transition-all duration-150 disabled:opacity-40"
                                        >
                                            <TrashIcon size={14}/>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Form */}
                    {showForm && (
                        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-2xl shadow-[0_32px_72px_rgba(0,0,0,0.4)] p-6 sticky top-6">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-sm font-bold text-white">
                                    {editing ? "Edytuj głosowanie" : "Nowe głosowanie"}
                                </p>
                                <button onClick={closeForm} className="w-7 h-7 rounded-lg border border-white/[0.07] flex items-center justify-center text-white/30 hover:text-white transition-colors">
                                    <XIcon size={13}/>
                                </button>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div>
                                    <label className={labelCls}>Pytanie</label>
                                    <input
                                        value={form.question}
                                        onChange={e => setForm(f => ({...f, question: e.target.value}))}
                                        className={inputCls}
                                        placeholder="Co sądzisz o...?"
                                    />
                                </div>

                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"/>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className={labelCls + " mb-0"}>Opcje</label>
                                        <button
                                            type="button"
                                            onClick={addOption}
                                            className="flex items-center gap-1 text-[10px] text-(--contrast-color)/70 hover:text-(--contrast-color) transition-colors"
                                        >
                                            <PlusCircleIcon size={13}/>
                                            Dodaj opcję
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {options.map((opt, idx) => (
                                            <div key={opt.id} className="flex items-center gap-2">
                                                <input
                                                    value={opt.label}
                                                    onChange={e => setOptions(o => o.map((x, i) => i === idx ? {...x, label: e.target.value} : x))}
                                                    className={inputCls}
                                                    placeholder={`Opcja ${idx + 1}`}
                                                />
                                                {options.length > 2 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeOption(idx)}
                                                        className="shrink-0 text-white/20 hover:text-red-400 transition-colors"
                                                    >
                                                        <MinusCircleIcon size={16}/>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"/>

                                {/* Active toggle */}
                                <div
                                    onClick={() => setForm(f => ({...f, active: !f.active}))}
                                    className={[
                                        "flex items-center gap-3 px-3 py-2.5 rounded-xl border cursor-pointer select-none transition-all duration-150",
                                        form.active
                                            ? "border-(--contrast-color)/32 bg-(--contrast-color)/[0.06]"
                                            : "border-white/[0.06] bg-white/[0.018] hover:border-(--contrast-color)/18",
                                    ].join(" ")}
                                >
                                    <div className={[
                                        "w-4 h-4 rounded-[5px] border flex items-center justify-center transition-all",
                                        form.active ? "border-(--contrast-color) bg-(--contrast-color)/22" : "border-white/13 bg-white/[0.035]",
                                    ].join(" ")}>
                                        {form.active && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                    </div>
                                    <span className="text-xs text-white/40">Głosowanie aktywne</span>
                                </div>

                                <button
                                    onClick={handleSave}
                                    disabled={isPending || !form.question}
                                    className="w-full py-3 rounded-xl bg-linear-to-br from-(--contrast-color) to-indigo-500 text-white text-sm font-semibold shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:opacity-90 disabled:opacity-40 transition-all duration-150"
                                >
                                    {isPending ? "Zapisuję..." : editing ? "Zapisz zmiany" : "Dodaj głosowanie"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}