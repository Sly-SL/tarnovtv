// @/app/settings/moderator/members/page.tsx
"use client";

import {useEffect, useRef, useState, useTransition} from "react";
import type {MemberType} from "@/shared/types/domen/member.type";
import {
    FacebookLogoIcon,
    InstagramLogoIcon,
    PencilSimpleIcon,
    PlusIcon,
    SparkleIcon,
    TiktokLogoIcon,
    TrashIcon,
    XIcon
} from "@phosphor-icons/react";
import {toast} from "sonner";
import {UploadImageAction} from "@/lib/imagebb/upload.imagebb";
import Image from "next/image";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {ArrowLeftIcon, ImageIcon} from "@phosphor-icons/react/ssr";
import {MemberPatchAction} from "@/root/src/actions/member/patch.member.action";
import {MemberDeleteAction} from "@/root/src/actions/member/delete.member.action";
import {MembersGetAction} from "@/actions/member/get.member.action";
import {AdminMiddleware} from "@/middlewares/admin.middleware";
import {MemberPostAction} from "@/actions/member/post.member.action";

const inputCls = "w-full px-3 py-2.5 rounded-xl border border-black/[0.08] bg-black/[0.04] text-black text-sm placeholder:text-black/20 outline-none focus:border-(--contrast-color)/40 focus:bg-(--contrast-color)/[0.06] transition-all duration-200 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/20";
const labelCls = "block text-[10px] font-medium tracking-widest uppercase text-black/35 mb-1.5 dark:text-white/35";

type FormType = Omit<MemberType, "id">;

const EMPTY: FormType = {
    name: "",
    role: "",
    bio: "",
    image: "",
    socials: {},
    order: 0,
};

export default function MembersAdminPage() {
    const [members, setMembers] = useState<MemberType[]>([]);
    const [editing, setEditing] = useState<MemberType | null>(null);
    const [form, setForm] = useState<FormType>(EMPTY);
    const [showForm, setShowForm] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const load = async () => {
        const data = await MembersGetAction();
        setMembers(data);
        await AdminMiddleware();
    };

    useEffect(() => { load(); }, []);

    const openNew = () => {
        setEditing(null);
        setForm({...EMPTY, order: members.length});
        setShowForm(true);
    };

    const openEdit = (m: MemberType) => {
        setEditing(m);
        setForm({name: m.name, role: m.role, bio: m.bio, image: m.image, socials: m.socials ?? {}, order: m.order});
        setShowForm(true);
    };

    const closeForm = () => {
        setEditing(null);
        setForm(EMPTY);
        setShowForm(false);
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploading(true);
        try {
            const url = await UploadImageAction(file);
            if (url) setForm(f => ({...f, image: url}));
            else toast.error("Nie udało się przesłać zdjęcia");
        } catch {
            toast.error("Błąd przy przesyłaniu");
        }
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSave = () => {
        startTransition(async () => {
            const result = editing
                ? await MemberPatchAction(editing.id, form)
                : await MemberPostAction(form);

            if (!result.success) {
                toast.error(result.message);
                return;
            }
            toast.success(editing ? "Zaktualizowano członka" : "Dodano członka");
            closeForm();
            await load();
        });
    };

    const handleDelete = (id: string) => {
        startTransition(async () => {
            const result = await MemberDeleteAction(id);
            if (!result.success) {
                toast.error(result.message);
                return;
            }
            toast.success("Usunięto członka");
            await load();
        });
    };

    return (
        <div className="relative min-h-screen px-4 py-16 overflow-hidden">
            <div className="absolute -top-40 -right-28 w-[500px] h-[500px] rounded-full bg-amber-500/[0.07] blur-[90px] pointer-events-none"/>
            <div className="absolute -bottom-24 -left-20 w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none"/>
            <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",backgroundSize:"48px 48px",maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black 30%,transparent 100%)"}}/>

            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-10" style={{animation:"fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both"}}>
                    <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
                    <div>
                        <Link href={shortcuts.settings+shortcuts.moderator} className="inline-flex items-center gap-2 text-xs text-black/30 hover:text-black/60 transition-colors mb-6 dark:text-white/30 dark:hover:text-white/60">
                            <ArrowLeftIcon size={12}/>
                            Wróć do panelu
                        </Link>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold tracking-widest uppercase text-amber-600/85 dark:text-amber-300/85">
                            <SparkleIcon size={9}/>
                            Panel moderatora
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-black dark:text-white">Zarządzaj zespołem</h1>
                        <p className="text-sm text-black/30 font-light mt-1 dark:text-white/30">Dodawaj, edytuj i usuwaj członków zespołu.</p>
                    </div>
                    <button onClick={openNew} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-br from-(--contrast-color) to-indigo-500 text-white text-sm font-semibold shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:opacity-90 transition-all duration-150">
                        <PlusIcon size={16}/>
                        Nowy członek
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

                    {/* List */}
                    <div className="flex flex-col gap-3">
                        {members.length === 0 && (
                            <div className="rounded-3xl border border-black/[0.07] bg-black/[0.028] p-10 text-center text-black/25 text-sm dark:border-white/[0.07] dark:bg-white/[0.028] dark:text-white/25">
                                Brak członków — dodaj pierwszego →
                            </div>
                        )}
                        {members.map(m => (
                            <div key={m.id} className={["flex items-center gap-4 p-4 rounded-2xl border backdrop-blur-xl transition-all duration-150", editing?.id === m.id ? "border-(--contrast-color)/40 bg-(--contrast-color)/[0.06]" : "border-black/[0.07] bg-black/[0.028] hover:border-black/[0.12] dark:border-white/[0.07] dark:bg-white/[0.028] dark:hover:border-white/[0.12]"].join(" ")}>
                                {m.image ? (
                                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-black/[0.06] dark:border-white/[0.06]">
                                        <Image src={m.image} alt={m.name} fill className="object-cover"/>
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-xl shrink-0 border border-black/[0.06] bg-black/[0.028] flex items-center justify-center dark:border-white/[0.06] dark:bg-white/[0.028]">
                                        <span className="text-lg font-bold text-black/20 dark:text-white/20">{m.name[0]}</span>
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-black truncate dark:text-white">{m.name}</p>
                                    <p className="text-xs text-black/35 truncate dark:text-white/35">{m.role}</p>
                                </div>
                                <div className="flex gap-1.5 shrink-0">
                                    <button onClick={() => openEdit(m)} className="w-8 h-8 rounded-xl border border-black/[0.07] bg-black/[0.025] flex items-center justify-center text-black/35 hover:text-(--contrast-color) hover:border-(--contrast-color)/25 transition-all duration-150 dark:border-white/[0.07] dark:bg-white/[0.025] dark:text-white/35">
                                        <PencilSimpleIcon size={14}/>
                                    </button>
                                    <button onClick={() => handleDelete(m.id)} disabled={isPending} className="w-8 h-8 rounded-xl border border-black/[0.07] bg-black/[0.025] flex items-center justify-center text-black/35 hover:text-red-500 hover:border-red-500/25 transition-all duration-150 disabled:opacity-40 dark:border-white/[0.07] dark:bg-white/[0.025] dark:text-white/35 dark:hover:text-red-400 dark:hover:border-red-400/25">
                                        <TrashIcon size={14}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    {showForm && (
                        <div className="rounded-3xl border border-black/[0.07] bg-black/[0.028] backdrop-blur-2xl shadow-[0_32px_72px_rgba(0,0,0,0.1)] p-6 sticky top-6 dark:border-white/[0.07] dark:bg-white/[0.028] dark:shadow-[0_32px_72px_rgba(0,0,0,0.4)]">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-sm font-bold text-black dark:text-white">{editing ? "Edytuj członka" : "Nowy członek"}</p>
                                <button onClick={closeForm} className="w-7 h-7 rounded-lg border border-black/[0.07] flex items-center justify-center text-black/30 hover:text-black transition-colors dark:border-white/[0.07] dark:text-white/30 dark:hover:text-white">
                                    <XIcon size={13}/>
                                </button>
                            </div>

                            <div className="flex flex-col gap-3">
                                {/* Avatar upload */}
                                <div>
                                    <label className={labelCls}>Zdjęcie</label>
                                    <label className={["flex flex-col items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed transition-all duration-150 cursor-pointer relative overflow-hidden", isUploading ? "border-black/[0.10] opacity-60 pointer-events-none dark:border-white/[0.10]" : "border-black/[0.08] hover:border-(--contrast-color)/30 hover:bg-(--contrast-color)/[0.03] dark:border-white/[0.08]"].join(" ")}>
                                        {form.image ? (
                                            <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                                                <Image src={form.image} alt="avatar" fill className="object-cover"/>
                                            </div>
                                        ) : (
                                            <>
                                                <ImageIcon size={18} className="text-black/25 dark:text-white/25"/>
                                                <span className="text-xs text-black/30 dark:text-white/30">{isUploading ? "Wysyłam..." : "Kliknij aby dodać zdjęcie"}</span>
                                            </>
                                        )}
                                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={isUploading}/>
                                    </label>
                                </div>

                                <div className="w-full h-px bg-gradient-to-r from-transparent via-black/[0.07] to-transparent dark:via-white/[0.07]"/>

                                <div>
                                    <label className={labelCls}>Kolejność</label>
                                    <input type="number" value={form.order} onChange={e => setForm(f => ({...f, order: +e.target.value}))} className={inputCls} placeholder="0"/>
                                </div>
                                <div>
                                    <label className={labelCls}>Imię i nazwisko</label>
                                    <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className={inputCls} placeholder="Jan Kowalski"/>
                                </div>
                                <div>
                                    <label className={labelCls}>Rola</label>
                                    <input value={form.role} onChange={e => setForm(f => ({...f, role: e.target.value}))} className={inputCls} placeholder="Redaktor, Kamerzysta..."/>
                                </div>
                                <div>
                                    <label className={labelCls}>Bio</label>
                                    <textarea value={form.bio} onChange={e => setForm(f => ({...f, bio: e.target.value}))} rows={3} className={inputCls + " resize-none"} placeholder="Krótki opis..."/>
                                </div>

                                <div className="w-full h-px bg-gradient-to-r from-transparent via-black/[0.07] to-transparent dark:via-white/[0.07]"/>

                                <div>
                                    <label className={labelCls}>Socials</label>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <InstagramLogoIcon size={14} className="text-pink-500 shrink-0"/>
                                            <input value={form.socials.instagram ?? ""} onChange={e => setForm(f => ({...f, socials: {...f.socials, instagram: e.target.value}}))} className={inputCls} placeholder="instagram.com/..."/>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <TiktokLogoIcon size={14} className="text-black/60 shrink-0 dark:text-white/60"/>
                                            <input value={form.socials.tiktok ?? ""} onChange={e => setForm(f => ({...f, socials: {...f.socials, tiktok: e.target.value}}))} className={inputCls} placeholder="tiktok.com/@..."/>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FacebookLogoIcon size={14} className="text-blue-500 shrink-0"/>
                                            <input value={form.socials.facebook ?? ""} onChange={e => setForm(f => ({...f, socials: {...f.socials, facebook: e.target.value}}))} className={inputCls} placeholder="facebook.com/..."/>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={handleSave} disabled={isPending || !form.name || !form.role || isUploading} className="w-full py-3 rounded-xl bg-linear-to-br from-(--contrast-color) to-indigo-500 text-white text-sm font-semibold shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:opacity-90 disabled:opacity-40 transition-all duration-150">
                                    {isPending ? "Zapisuję..." : editing ? "Zapisz zmiany" : "Dodaj członka"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}