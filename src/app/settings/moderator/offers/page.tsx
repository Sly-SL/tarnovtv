"use client";

import {useEffect, useState, useTransition} from "react";
import {offersGet} from "@/lib/firebase/get/offers.get";
import type {OfferType} from "@/shared/types/domen/offer.type";
import {PencilSimpleIcon, PlusIcon, SparkleIcon, TrashIcon, XIcon} from "@phosphor-icons/react";
import {toast} from "sonner";
import {ModeratorMiddleware} from "@/middlewares/moderator.middleware";
import {offerDelete} from "@/lib/firebase/delete/offer.delete";
import {offerPatch} from "@/lib/firebase/patch/offer.patch";
import {offerPost} from "@/lib/firebase/post/offer.add";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {ArrowLeftIcon} from "@phosphor-icons/react/ssr";

const EMPTY: Omit<OfferType, "id"> = {
    title: "",
    subtitle: "",
    price: "",
    priceNote: "",
    features: [],
    badge: "",
    highlight: false,
    order: 0,
};

const inputCls = "w-full px-3 py-2.5 rounded-xl border border-black/[0.08] bg-black/[0.04] text-black text-sm placeholder:text-black/20 outline-none focus:border-(--contrast-color)/40 focus:bg-(--contrast-color)/[0.06] transition-all duration-200 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/20";
const labelCls = "block text-[10px] font-medium tracking-widest uppercase text-black/35 mb-1.5 dark:text-white/35";

export default function OffersAdminPage() {

    const [offers, setOffers] = useState<OfferType[]>([]);
    const [editing, setEditing] = useState<OfferType | null>(null);
    const [form, setForm] = useState<Omit<OfferType, "id">>(EMPTY);
    const [featuresRaw, setFeaturesRaw] = useState("");
    const [isPending, startTransition] = useTransition();
    const [showForm, setShowForm] = useState(false);

    const load = async () => {
        const data = await offersGet();
        setOffers(data);
        await ModeratorMiddleware();
    };

    useEffect(() => { load(); }, []);

    const openNew = () => {
        setEditing(null);
        setForm({...EMPTY, order: offers.length});
        setFeaturesRaw("");
        setShowForm(true);
    };

    const openEdit = (offer: OfferType) => {
        setEditing(offer);
        setForm({
            title: offer.title,
            subtitle: offer.subtitle,
            price: offer.price,
            priceNote: offer.priceNote ?? "",
            features: offer.features,
            badge: offer.badge ?? "",
            highlight: offer.highlight ?? false,
            order: offer.order,
        });
        setFeaturesRaw(offer.features.join("\n"));
        setShowForm(true);
    };

    const closeForm = () => {
        setEditing(null);
        setForm(EMPTY);
        setFeaturesRaw("");
        setShowForm(false);
    };

    const handleSave = () => {
        const data = {...form, features: featuresRaw.split("\n").map(s => s.trim()).filter(Boolean)};
        startTransition(async () => {
            try {
                if (editing) {
                    await offerPatch(editing.id, data);
                    toast.success("Zaktualizowano ofertę");
                } else {
                    await offerPost(data);
                    toast.success("Dodano ofertę");
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
                await offerDelete(id);
                toast.success("Usunięto ofertę");
                await load();
            } catch {
                toast.error("Nie udało się usunąć");
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
                            className="inline-flex items-center gap-5 text-xs text-black/30 hover:text-black/60 transition-colors mb-6 dark:text-white/30 dark:hover:text-white/60"
                        >
                            <ArrowLeftIcon size={12} />
                            Wróć do panelu
                        </Link>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold tracking-widest uppercase text-amber-600/85 dark:text-amber-300/85">
                            <SparkleIcon size={9}/>
                            Panel moderatora
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-black dark:text-white">Zarządzaj ofertą</h1>
                        <p className="text-sm text-black/30 font-light mt-1 dark:text-white/30">Dodawaj, edytuj i usuwaj pakiety współpracy.</p>
                    </div>
                    <button
                        onClick={openNew}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-br from-(--contrast-color) to-indigo-500 text-white text-sm font-semibold shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:opacity-90 transition-all duration-150"
                    >
                        <PlusIcon size={16}/>
                        Nowa oferta
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">

                    {/* Offers list */}
                    <div className="flex flex-col gap-3">
                        {offers.length === 0 && (
                            <div className="rounded-3xl border border-black/[0.07] bg-black/[0.028] p-10 text-center text-black/25 text-sm dark:border-white/[0.07] dark:bg-white/[0.028] dark:text-white/25">
                                Brak ofert — dodaj pierwszą →
                            </div>
                        )}
                        {offers.map((offer) => (
                            <div
                                key={offer.id}
                                className={[
                                    "flex items-start gap-4 p-5 rounded-2xl border backdrop-blur-xl transition-all duration-150",
                                    editing?.id === offer.id
                                        ? "border-(--contrast-color)/40 bg-(--contrast-color)/[0.06]"
                                        : "border-black/[0.07] bg-black/[0.028] hover:border-black/[0.12] dark:border-white/[0.07] dark:bg-white/[0.028] dark:hover:border-white/[0.12]",
                                ].join(" ")}
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-sm font-semibold text-black truncate dark:text-white">{offer.title}</p>
                                        {offer.badge && (
                                            <span className="px-2 py-0.5 rounded-full bg-(--contrast-color)/20 text-(--contrast-color) text-[9px] font-bold uppercase tracking-widest">
                                                {offer.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-black/35 truncate mb-2 dark:text-white/35">{offer.subtitle}</p>
                                    <p className="text-base font-extrabold text-black dark:text-white">{offer.price}</p>
                                </div>
                                <div className="flex gap-1.5 flex-shrink-0">
                                    <button
                                        onClick={() => openEdit(offer)}
                                        className="w-8 h-8 rounded-xl border border-black/[0.07] bg-black/[0.025] flex items-center justify-center text-black/35 hover:text-(--contrast-color) hover:border-(--contrast-color)/25 transition-all duration-150 dark:border-white/[0.07] dark:bg-white/[0.025] dark:text-white/35"
                                    >
                                        <PencilSimpleIcon size={14}/>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(offer.id)}
                                        disabled={isPending}
                                        className="w-8 h-8 rounded-xl border border-black/[0.07] bg-black/[0.025] flex items-center justify-center text-black/35 hover:text-red-500 hover:border-red-500/25 transition-all duration-150 disabled:opacity-40 dark:border-white/[0.07] dark:bg-white/[0.025] dark:text-white/35 dark:hover:text-red-400 dark:hover:border-red-400/25"
                                    >
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
                                <p className="text-sm font-bold text-black dark:text-white">
                                    {editing ? "Edytuj ofertę" : "Nowa oferta"}
                                </p>
                                <button onClick={closeForm} className="w-7 h-7 rounded-lg border border-black/[0.07] flex items-center justify-center text-black/30 hover:text-black transition-colors dark:border-white/[0.07] dark:text-white/30 dark:hover:text-white">
                                    <XIcon size={13}/>
                                </button>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div>
                                    <label className={labelCls}>Kolejność</label>
                                    <input type="number" value={form.order} onChange={e => setForm(f => ({...f, order: +e.target.value}))} className={inputCls} placeholder="0"/>
                                </div>
                                <div>
                                    <label className={labelCls}>Tytuł</label>
                                    <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} className={inputCls} placeholder="Pojedyncza rolka..."/>
                                </div>
                                <div>
                                    <label className={labelCls}>Opis</label>
                                    <input value={form.subtitle} onChange={e => setForm(f => ({...f, subtitle: e.target.value}))} className={inputCls} placeholder="Krótki opis..."/>
                                </div>
                                <div>
                                    <label className={labelCls}>Cena</label>
                                    <input value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))} className={inputCls} placeholder="500 zł"/>
                                </div>
                                <div>
                                    <label className={labelCls}>Dopisek do ceny (opcjonalnie)</label>
                                    <input value={form.priceNote} onChange={e => setForm(f => ({...f, priceNote: e.target.value}))} className={inputCls} placeholder="Napisz do nas"/>
                                </div>
                                <div>
                                    <label className={labelCls}>Badge (opcjonalnie)</label>
                                    <input value={form.badge} onChange={e => setForm(f => ({...f, badge: e.target.value}))} className={inputCls} placeholder="Popularny"/>
                                </div>
                                <div>
                                    <label className={labelCls}>Cechy (każda w nowej linii)</label>
                                    <textarea
                                        value={featuresRaw}
                                        onChange={e => setFeaturesRaw(e.target.value)}
                                        rows={4}
                                        className={inputCls + " resize-none"}
                                        placeholder={"TikTok / Instagram\nPełna realizacja\nNasz styl"}
                                    />
                                </div>
                                <div
                                    onClick={() => setForm(f => ({...f, highlight: !f.highlight}))}
                                    className={[
                                        "flex items-center gap-3 px-3 py-2.5 rounded-xl border cursor-pointer select-none transition-all duration-150",
                                        form.highlight
                                            ? "border-(--contrast-color)/32 bg-(--contrast-color)/[0.06]"
                                            : "border-black/[0.06] bg-black/[0.018] hover:border-(--contrast-color)/18 dark:border-white/[0.06] dark:bg-white/[0.018]",
                                    ].join(" ")}
                                >
                                    <div className={[
                                        "w-4 h-4 rounded-[5px] border flex items-center justify-center transition-all",
                                        form.highlight ? "border-(--contrast-color) bg-(--contrast-color)/22" : "border-black/13 bg-black/[0.035] dark:border-white/13 dark:bg-white/[0.035]",
                                    ].join(" ")}>
                                        {form.highlight && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                    </div>
                                    <span className="text-xs text-black/40 dark:text-white/40">Wyróżniona karta</span>
                                </div>

                                <button
                                    onClick={handleSave}
                                    disabled={isPending || !form.title || !form.price}
                                    className="w-full py-3 rounded-xl bg-linear-to-br from-(--contrast-color) to-indigo-500 text-white text-sm font-semibold shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:opacity-90 disabled:opacity-40 transition-all duration-150"
                                >
                                    {isPending ? "Zapisuję..." : editing ? "Zapisz zmiany" : "Dodaj ofertę"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}