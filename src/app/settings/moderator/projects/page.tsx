"use client";

import {useEffect, useRef, useState, useTransition} from "react";
import {projectsGet} from "@/lib/firebase/get/projects.get";
import type {ProjectType} from "@/shared/types/domen/project.type";
import {ImageIcon, PencilSimpleIcon, PlusIcon, SparkleIcon, TrashIcon, XIcon} from "@phosphor-icons/react";
import {toast} from "sonner";
import {ModeratorMiddleware} from "@/middlewares/moderator.middleware";
import {projectDelete} from "@/lib/firebase/delete/project.delete";
import {projectPatch} from "@/lib/firebase/patch/project.patch";
import {projectPost} from "@/lib/firebase/post/project.post";
import {UploadImageAction} from "@/lib/imagebb/upload.imagebb";
import Image from "next/image";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {ArrowLeftIcon} from "@phosphor-icons/react/ssr";

const inputCls = "w-full px-3 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm placeholder:text-white/20 outline-none focus:border-(--contrast-color)/40 focus:bg-(--contrast-color)/[0.06] transition-all duration-200";
const labelCls = "block text-[10px] font-medium tracking-widest uppercase text-white/35 mb-1.5";

// Updated type — images is string[] instead of image: string
type ProjectFormType = Omit<ProjectType, "id" | "image"> & {images: string[]};

const EMPTY: ProjectFormType = {
    name: "",
    description: "",
    images: [],
    interesting: [],
    hashtags: [],
    private: false,
};

export default function ProjectsAdminPage() {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [editing, setEditing] = useState<ProjectType | null>(null);
    const [form, setForm] = useState<ProjectFormType>(EMPTY);
    const [interestingRaw, setInterestingRaw] = useState("");
    const [hashtagsRaw, setHashtagsRaw] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const load = async () => {
        const data = await projectsGet();
        setProjects(data);
        await ModeratorMiddleware();
    };

    useEffect(() => {load();}, []);

    const openNew = () => {
        setEditing(null);
        setForm(EMPTY);
        setInterestingRaw("");
        setHashtagsRaw("");
        setShowForm(true);
    };

    const openEdit = (p: ProjectType) => {
        setEditing(p);
        setForm({
            name: p.name,
            description: p.description,
            // support both old single image and new images[]
            images: (p as any).images ?? (p.image ? [p.image] : []),
            interesting: p.interesting,
            hashtags: p.hashtags,
            private: p.private,
        });
        setInterestingRaw(p.interesting.join("\n"));
        setHashtagsRaw(p.hashtags.join(", "));
        setShowForm(true);
    };

    const closeForm = () => {
        setEditing(null);
        setForm(EMPTY);
        setInterestingRaw("");
        setHashtagsRaw("");
        setShowForm(false);
    };

    // Upload one or more files sequentially
    const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;

        for (let i = 0; i < files.length; i++) {
            setUploadingIdx(i);
            try {
                const url = await UploadImageAction(files[i]);
                if (url) {
                    setForm(f => ({...f, images: [...f.images, url]}));
                } else {
                    toast.error(`Nie udało się przesłać: ${files[i].name}`);
                }
            } catch {
                toast.error(`Błąd przy: ${files[i].name}`);
            }
        }

        setUploadingIdx(null);
        // reset input so same file can be re-uploaded
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const removeImage = (idx: number) => {
        setForm(f => ({...f, images: f.images.filter((_, i) => i !== idx)}));
    };

    const handleSave = () => {
        const data = {
            name: form.name,
            description: form.description,
            image: form.images[0] ?? "",        // keep legacy field for compatibility
            images: form.images,
            interesting: interestingRaw.split("\n").map(s => s.trim()).filter(Boolean),
            hashtags: hashtagsRaw.split(",").map(s => s.trim().replace(/^#/, "")).filter(Boolean),
            private: form.private,
        };

        startTransition(async () => {
            try {
                if (editing) {
                    await projectPatch(editing.id, data);
                    toast.success("Zaktualizowano projekt");
                } else {
                    await projectPost(data);
                    toast.success("Dodano projekt");
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
                await projectDelete(id);
                toast.success("Usunięto projekt");
                await load();
            } catch {
                toast.error("Nie udało się usunąć");
            }
        });
    };

    const isUploading = uploadingIdx !== null;

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
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">Zarządzaj projektami</h1>
                        <p className="text-sm text-white/30 font-light mt-1">Dodawaj, edytuj i usuwaj projekty.</p>
                    </div>
                    <button
                        onClick={openNew}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-br from-(--contrast-color) to-indigo-500 text-white text-sm font-semibold shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:opacity-90 transition-all duration-150"
                    >
                        <PlusIcon size={16}/>
                        Nowy projekt
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start">

                    {/* List */}
                    <div className="flex flex-col gap-3">
                        {projects.length === 0 && (
                            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.028] p-10 text-center text-white/25 text-sm">
                                Brak projektów — dodaj pierwszy →
                            </div>
                        )}
                        {projects.map((p) => (
                            <div
                                key={p.id}
                                className={[
                                    "flex items-start gap-4 p-5 rounded-2xl border backdrop-blur-xl transition-all duration-150",
                                    editing?.id === p.id
                                        ? "border-(--contrast-color)/40 bg-(--contrast-color)/[0.06]"
                                        : "border-white/[0.07] bg-white/[0.028] hover:border-white/[0.12]",
                                ].join(" ")}
                            >
                                {/* Thumbnail */}
                                {((p as any).images?.[0] ?? p.image) && (
                                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/[0.06]">
                                        <Image
                                            src={(p as any).images?.[0] ?? p.image}
                                            alt={p.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                                        {p.private && (
                                            <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-white/30 text-[9px] font-bold uppercase tracking-widest shrink-0">
                                                Prywatny
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-white/35 truncate">{p.description}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        {((p as any).images?.length ?? 0) > 0 && (
                                            <span className="text-[10px] text-white/25 flex items-center gap-1">
                                                <ImageIcon size={10}/>
                                                {(p as any).images.length} {(p as any).images.length === 1 ? "zdjęcie" : "zdjęcia"}
                                            </span>
                                        )}
                                        {p.hashtags.length > 0 && (
                                            <p className="text-[10px] text-(--contrast-color)/50 truncate">
                                                {p.hashtags.map(t => `#${t}`).join(" ")}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-1.5 shrink-0">
                                    <button
                                        onClick={() => openEdit(p)}
                                        className="w-8 h-8 rounded-xl border border-white/[0.07] bg-white/[0.025] flex items-center justify-center text-white/35 hover:text-(--contrast-color) hover:border-(--contrast-color)/25 transition-all duration-150"
                                    >
                                        <PencilSimpleIcon size={14}/>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        disabled={isPending}
                                        className="w-8 h-8 rounded-xl border border-white/[0.07] bg-white/[0.025] flex items-center justify-center text-white/35 hover:text-red-400 hover:border-red-400/25 transition-all duration-150 disabled:opacity-40"
                                    >
                                        <TrashIcon size={14}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    {showForm && (
                        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-2xl shadow-[0_32px_72px_rgba(0,0,0,0.4)] p-6 sticky top-6">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-sm font-bold text-white">
                                    {editing ? "Edytuj projekt" : "Nowy projekt"}
                                </p>
                                <button onClick={closeForm} className="w-7 h-7 rounded-lg border border-white/[0.07] flex items-center justify-center text-white/30 hover:text-white transition-colors">
                                    <XIcon size={13}/>
                                </button>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div>
                                    <label className={labelCls}>Nazwa</label>
                                    <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className={inputCls} placeholder="Nazwa projektu"/>
                                </div>
                                <div>
                                    <label className={labelCls}>Opis</label>
                                    <textarea
                                        value={form.description}
                                        onChange={e => setForm(f => ({...f, description: e.target.value}))}
                                        rows={3}
                                        className={inputCls + " resize-none"}
                                        placeholder="Krótki opis projektu..."
                                    />
                                </div>

                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"/>

                                {/* ── Images ── */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className={labelCls + " mb-0"}>Zdjęcia</label>
                                        <span className="text-[10px] text-white/20">{form.images.length} / bez limitu</span>
                                    </div>

                                    {/* Image grid */}
                                    {form.images.length > 0 && (
                                        <div className="grid grid-cols-3 gap-2 mb-2">
                                            {form.images.map((url, idx) => (
                                                <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-white/[0.06]">
                                                    <Image src={url} alt={`Zdjęcie ${idx + 1}`} fill className="object-cover"/>
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(idx)}
                                                            className="w-7 h-7 rounded-lg bg-red-500/80 flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                                                        >
                                                            <XIcon size={12}/>
                                                        </button>
                                                    </div>
                                                    {idx === 0 && (
                                                        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/60 text-[8px] text-white/60 font-medium">
                                                            główne
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Upload area */}
                                    <label className={[
                                        "flex flex-col items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed transition-all duration-150 cursor-pointer",
                                        isUploading
                                            ? "border-white/[0.10] opacity-60 pointer-events-none"
                                            : "border-white/[0.08] hover:border-(--contrast-color)/30 hover:bg-(--contrast-color)/[0.03]",
                                    ].join(" ")}>
                                        <ImageIcon size={18} className="text-white/25"/>
                                        <span className="text-xs text-white/30">
                                            {isUploading
                                                ? `Wysyłam zdjęcie ${(uploadingIdx ?? 0) + 1}...`
                                                : "Kliknij aby dodać zdjęcia"}
                                        </span>
                                        <span className="text-[10px] text-white/15">PNG, JPG, WEBP</span>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={handleFilesChange}
                                            disabled={isUploading}
                                        />
                                    </label>
                                </div>

                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"/>

                                <div>
                                    <label className={labelCls}>Ciekawostki (każda w nowej linii)</label>
                                    <textarea
                                        value={interestingRaw}
                                        onChange={e => setInterestingRaw(e.target.value)}
                                        rows={3}
                                        className={inputCls + " resize-none"}
                                        placeholder={"Fakt 1\nFakt 2\nFakt 3"}
                                    />
                                </div>
                                <div>
                                    <label className={labelCls}>Hashtagi (oddzielone przecinkami)</label>
                                    <input
                                        value={hashtagsRaw}
                                        onChange={e => setHashtagsRaw(e.target.value)}
                                        className={inputCls}
                                        placeholder="tarnow, media, projekt"
                                    />
                                </div>

                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"/>

                                {/* Private toggle */}
                                <div
                                    onClick={() => setForm(f => ({...f, private: !f.private}))}
                                    className={[
                                        "flex items-center gap-3 px-3 py-2.5 rounded-xl border cursor-pointer select-none transition-all duration-150",
                                        form.private
                                            ? "border-(--contrast-color)/32 bg-(--contrast-color)/[0.06]"
                                            : "border-white/[0.06] bg-white/[0.018] hover:border-(--contrast-color)/18",
                                    ].join(" ")}
                                >
                                    <div className={[
                                        "w-4 h-4 rounded-[5px] border flex items-center justify-center transition-all",
                                        form.private ? "border-(--contrast-color) bg-(--contrast-color)/22" : "border-white/13 bg-white/[0.035]",
                                    ].join(" ")}>
                                        {form.private && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                    </div>
                                    <span className="text-xs text-white/40">Projekt prywatny (niewidoczny publicznie)</span>
                                </div>

                                <button
                                    onClick={handleSave}
                                    disabled={isPending || !form.name || isUploading}
                                    className="w-full py-3 rounded-xl bg-linear-to-br from-(--contrast-color) to-indigo-500 text-white text-sm font-semibold shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:opacity-90 disabled:opacity-40 transition-all duration-150"
                                >
                                    {isPending ? "Zapisuję..." : isUploading ? "Wysyłam zdjęcia..." : editing ? "Zapisz zmiany" : "Dodaj projekt"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}