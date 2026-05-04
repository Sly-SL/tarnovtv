"use client";

import {Controller, useForm} from "react-hook-form";
import Link from "next/link";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {toast} from "sonner";
import {useState} from "react";
import {BasicInput} from "@/shared/components/libs/basic/input.component";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {ArrowLeftIcon, EnvelopeIcon} from "@phosphor-icons/react";
import {findEmailAction} from "@/actions/auth/find-email.action";

type FindEmailValues = {
    name: string;
    surname: string;
    gender: "male" | "female";
};

const ForgotEmailForm = () => {
    const [foundEmail, setFoundEmail] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<FindEmailValues>({
        defaultValues: {name: "", surname: "", gender: "male"},
    });

    const onSubmit = async (data: FindEmailValues) => {
        const result = await findEmailAction(data);
        if (!result.success) return toast.error(result.message);
        setFoundEmail(result.email);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">

            <div className="absolute -top-40 -right-28 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none"/>
            <div className="absolute -bottom-24 -left-20 w-[350px] h-[350px] rounded-full bg-violet-500/[0.07] blur-[90px] pointer-events-none"/>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
                }}
            />

            <div
                className="relative z-10 w-full max-w-[420px] rounded-3xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-2xl shadow-[0_32px_72px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.035)_inset] p-10"
                style={{animation: "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both"}}
            >
                <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-(--contrast-color)/10 border border-indigo-500/20 text-[10px] font-semibold tracking-widest uppercase text-(--contrast-color)/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                    Szukaj e-maila
                </div>

                {!foundEmail ? (
                    <>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight mb-1">
                            Znajdź swój{" "}
                            <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                                e-mail
                            </span>
                        </h1>
                        <p className="text-sm text-white/30 font-light mb-7">
                            Podaj dane z profilu — znajdziemy powiązane konto.
                        </p>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

                            <div className="grid grid-cols-2 gap-3">
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{required: "Podaj imię"}}
                                    render={({field}) => (
                                        <BasicInput
                                            {...field}
                                            label="Imię"
                                            placeholder="Jan"
                                            error={errors.name?.message}
                                            autoFocus
                                        />
                                    )}
                                />
                                <Controller
                                    name="surname"
                                    control={control}
                                    rules={{required: "Podaj nazwisko"}}
                                    render={({field}) => (
                                        <BasicInput
                                            {...field}
                                            label="Nazwisko"
                                            placeholder="Kowalski"
                                            error={errors.surname?.message}
                                        />
                                    )}
                                />
                            </div>

                            <Controller
                                name="gender"
                                control={control}
                                render={({field}) => (
                                    <div>
                                        <span className="block text-[11px] font-medium tracking-widest uppercase text-white/35 mb-2">
                                            Płeć
                                        </span>
                                        <div className="grid grid-cols-2 gap-2">
                                            {(["male", "female"] as const).map((g) => (
                                                <button
                                                    key={g}
                                                    type="button"
                                                    onClick={() => field.onChange(g)}
                                                    className={[
                                                        "flex items-center justify-center gap-1.5 py-2 rounded-xl border text-sm font-medium transition-all duration-150",
                                                        field.value === g
                                                            ? "border-(--contrast-color)/45 bg-indigo-500/10 text-(--contrast-color) shadow-[0_0_0_2px_rgba(99,102,241,0.1)]"
                                                            : "border-white/[0.07] bg-white/[0.025] text-white/38 hover:border-(--contrast-color)/20 hover:text-white/60",
                                                    ].join(" ")}
                                                >
                                                    {g === "male" ? "♂ Mężczyzna" : "♀ Kobieta"}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            />

                            <BasicButton
                                type="submit"
                                loading={isSubmitting}
                                size="lg"
                                className="w-full mt-1"
                            >
                                {!isSubmitting && "Szukaj konta →"}
                            </BasicButton>
                        </form>
                    </>
                ) : (
                    /* Result state */
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-(--contrast-color)/10 border border-(--contrast-color)/20 text-(--contrast-color)">
                            <EnvelopeIcon size={24} weight="duotone"/>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white mb-1">Znaleźliśmy konto</h2>
                            <p className="text-sm text-white/30 mb-4">
                                Adres e-mail powiązany z Twoim profilem:
                            </p>
                            <div className="px-4 py-3 rounded-xl border border-(--contrast-color)/20 bg-(--contrast-color)/[0.06] text-(--contrast-color) font-mono text-sm tracking-wide">
                                {foundEmail}
                            </div>
                        </div>
                        <Link
                            href={shortcuts.login}
                            className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/[0.07] bg-white/[0.025] text-sm font-medium text-white/60 hover:text-white hover:border-(--contrast-color)/25 transition-all duration-150"
                        >
                            Przejdź do logowania →
                        </Link>
                    </div>
                )}

                <Link
                    href={shortcuts.forgot}
                    className="mt-6 flex items-center justify-center gap-2 text-xs text-white/25 hover:text-(--contrast-color)/65 transition-colors"
                >
                    <ArrowLeftIcon size={12}/>
                    Wróć do wyboru opcji
                </Link>
            </div>
        </div>
    );
};

export default ForgotEmailForm;