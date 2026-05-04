"use client";

import {useState} from "react";
import Link from "next/link";
import {ArrowRightIcon, CheckCircleIcon, ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon} from "@phosphor-icons/react";
import SocialLinksCustom from "@/shared/components/custom/social-links.custom";

const FORMSUBMIT_EMAIL = "tarnovtv@gmail.com";

type FormValues = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

const subjects = ["Współpraca", "Zgłoszenie błędu", "Propozycja projektu", "Pytanie ogólne", "Inne"];

const contacts = [
    {icon: <EnvelopeIcon size={18} weight="duotone"/>, label: "E-mail", value: "tarnovtv@gmail.com", href: "mailto:tarnovtv@gmail.com"},
    {icon: <PhoneIcon size={18} weight="duotone"/>, label: "Telefon", value: "+48 518 401 276", href: "tel:+48518401276"},
    {icon: <MapPinIcon size={18} weight="duotone"/>, label: "Lokalizacja", value: "Tarnów, Małopolska", href: "https://maps.google.com/?q=Tarnów"},
    {icon: <ClockIcon size={18} weight="duotone"/>, label: "Odpowiadamy", value: "Pon–Pt, 9:00–18:00", href: null},
];

const inputCls = [
    "w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 resize-none",
    "border-black/[0.08] dark:border-white/[0.08]",
    "bg-black/[0.03] dark:bg-white/[0.04]",
    "text-black dark:text-white",
    "placeholder:text-black/25 dark:placeholder:text-white/20",
    "focus:border-(--contrast-color)/40 focus:bg-(--contrast-color)/[0.04] dark:focus:bg-(--contrast-color)/[0.06] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)]",
].join(" ");

const labelCls = "block text-[11px] font-medium tracking-widest uppercase text-black/35 dark:text-white/35 mb-2";

const ContactPage = () => {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState<FormValues>({name: "", email: "", subject: "", message: ""});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setValues(v => ({...v, [e.target.name]: e.target.value}));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
                method: "POST",
                headers: {"Content-Type": "application/json", Accept: "application/json"},
                body: JSON.stringify({...values, _subject: `[TarnovTV] ${values.subject}`, _captcha: "false"}),
            });
            setSent(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen px-4 py-16 overflow-hidden">

            {/* Orbs */}
            <div className="absolute -top-40 -right-28 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"/>
            <div className="absolute -bottom-24 -left-20 w-[400px] h-[400px] rounded-full bg-pink-500/[0.07] blur-[90px] pointer-events-none"/>

            {/* Grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-100"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
                }}
            />

            <div className="relative z-10 max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-12" style={{animation: "fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both"}}>
                    <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-(--contrast-color)/10 border border-indigo-500/20 text-[10px] font-semibold tracking-widest uppercase text-(--contrast-color)/85">
                        <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                        Kontakt
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black dark:text-white leading-tight mb-3">
                        Porozmawiajmy o{" "}
                        <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                            Tarnowie
                        </span>
                    </h1>
                    <p className="text-base text-black/40 dark:text-white/30 font-light max-w-lg">
                        Masz pomysł, pytanie lub chcesz nawiązać współpracę? Napisz do nas — odpowiadamy w ciągu 24h.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">

                    {/* Form */}
                    <div className="rounded-3xl border hover:scale-[1.02] duration-700 border-black/[0.07] dark:border-white/[0.07] bg-black/[0.03] dark:bg-white/[0.028] backdrop-blur-2xl shadow-[0_32px_72px_rgba(0,0,0,0.08)] dark:shadow-[0_32px_72px_rgba(0,0,0,0.4)] p-8">
                        {!sent ? (
                            <>
                                <p className={labelCls + " mb-6"}>Wyślij wiadomość</p>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelCls}>Imię i nazwisko</label>
                                            <input name="name" value={values.name} onChange={handleChange} required placeholder="Jan Kowalski" className={inputCls}/>
                                        </div>
                                        <div>
                                            <label className={labelCls}>E-mail</label>
                                            <input name="email" type="email" value={values.email} onChange={handleChange} required placeholder="jan@kowalski.pl" className={inputCls}/>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelCls}>Temat</label>
                                        <select name="subject" value={values.subject} onChange={handleChange} required className={inputCls + " cursor-pointer"}>
                                            <option value="" disabled className="bg-white dark:bg-[#0d0f17]">Wybierz temat</option>
                                            {subjects.map(s => <option key={s} value={s} className="bg-white dark:bg-[#0d0f17]">{s}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className={labelCls}>Wiadomość</label>
                                        <textarea name="message" value={values.message} onChange={handleChange} required rows={5} placeholder="Opisz czego potrzebujesz..." className={inputCls}/>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-linear-to-br from-(--contrast-color) to-indigo-500 text-white text-sm font-semibold tracking-wide shadow-[0_4px_24px_rgba(99,102,241,0.25)] hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all duration-150"
                                    >
                                        {loading
                                            ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                                            : <><span>Wyślij wiadomość</span><ArrowRightIcon size={15}/></>
                                        }
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center gap-4 py-16">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-(--contrast-color)/10 border border-(--contrast-color)/20 text-(--contrast-color)">
                                    <CheckCircleIcon size={28} weight="duotone"/>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-black dark:text-white mb-2">Wiadomość wysłana!</h2>
                                    <p className="text-sm text-black/40 dark:text-white/30">Dziękujemy — odpiszemy najszybciej jak to możliwe.</p>
                                </div>
                                <button
                                    onClick={() => {setSent(false); setValues({name:"",email:"",subject:"",message:""});}}
                                    className="text-xs text-(--contrast-color)/60 hover:text-(--contrast-color) transition-colors"
                                >
                                    Wyślij kolejną wiadomość
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="flex flex-col gap-4">

                        {/* Contact info */}
                        <div className="rounded-3xl border hover:scale-[1.02] duration-700 border-black/[0.07] dark:border-white/[0.07] bg-black/[0.03] dark:bg-white/[0.028] backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.4)] p-6">
                            <p className="text-[11px] font-medium tracking-widest uppercase text-black/35 dark:text-white/35 mb-5">Dane kontaktowe</p>
                            <div className="flex flex-col gap-3">
                                {contacts.map(c => (
                                    <div key={c.label} className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-black/40 dark:text-white/40 flex-shrink-0">
                                            {c.icon}
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-black/25 dark:text-white/25 mb-0.5">{c.label}</p>
                                            {c.href ? (
                                                <Link href={c.href} className="text-sm text-black/55 dark:text-white/55 hover:text-(--contrast-color) transition-colors">
                                                    {c.value}
                                                </Link>
                                            ) : (
                                                <p className="text-sm text-black/55 dark:text-white/55">{c.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social links */}
                        <SocialLinksCustom/>

                        {/* Map */}
                        <Link
                            href="https://maps.google.com/?q=Tarnów"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group rounded-3xl hover:scale-[1.02] duration-700 border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.03] dark:bg-white/[0.028] backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center gap-2 py-7 text-center hover:border-(--contrast-color)/25 hover:bg-(--contrast-color)/[0.04] transition-all"
                        >
                            <MapPinIcon size={26} weight="duotone" className="text-black/25 dark:text-white/25 group-hover:text-(--contrast-color) transition-colors"/>
                            <p className="text-sm font-medium text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors">Tarnów, Małopolska</p>
                            <p className="text-xs text-black/20 dark:text-white/20 group-hover:text-(--contrast-color)/60 transition-colors">Otwórz w Google Maps →</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;