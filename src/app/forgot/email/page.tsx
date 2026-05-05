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
        <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden
                        bg-transparent">

            {/* Декоративные блобы */}
            <div className="absolute -top-40 -right-28 w-[500px] h-[500px] rounded-full
                            bg-indigo-500/10 dark:bg-indigo-500/10 blur-[90px] pointer-events-none"/>
            <div className="absolute -bottom-24 -left-20 w-[350px] h-[350px] rounded-full
                            bg-violet-500/[0.07] blur-[90px] pointer-events-none"/>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
                }}
            />

            <div
                className="relative z-10 w-full max-w-[420px] rounded-3xl p-10
                           border border-gray-200  shadow-sm
                           dark:border-white/[0.07] dark:bg-white/[0.028] dark:backdrop-blur-2xl
                           dark:shadow-[0_32px_72px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.035)_inset]"
                style={{animation: "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both"}}
            >
                <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full
                                border text-[10px] font-semibold tracking-widest uppercase
                               bg-(--contrast-color)/10  text-(--contrast-color)/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                    Szukaj e-maila
                </div>

                {!foundEmail ? (
                    <>
                        <h1 className="text-3xl font-extrabold tracking-tight leading-tight mb-1
                                       text-gray-900 dark:text-white">
                            Znajdź swój{" "}
                            <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                                e-mail
                            </span>
                        </h1>
                        <p className="text-sm font-light mb-7 text-gray-500 dark:text-white/30">
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
                                        <span className="block text-[11px] font-medium tracking-widest uppercase mb-2
                                                         text-gray-400 dark:text-white/35">
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
                                                            ? " border-(--contrast-color)/45 text-(--contrast-color) dark:shadow-[0_0_0_2px_rgba(99,102,241,0.1)]"
                                                            : "border-gray-200 bg-gray-50 text-gray-400 hover:text-gray-600 dark:border-white/[0.07] dark:bg-white/[0.025] dark:text-white/38 hover:border-(--contrast-color)/20 dark:hover:text-white/60",
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
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center
                                         border border-indigo-200 bg-(--contrast-color)/10 dark:border-(--contrast-color)/20 text-(--contrast-color)">
                            <EnvelopeIcon size={24} weight="duotone"/>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                                Znaleźliśmy konto
                            </h2>
                            <p className="text-sm mb-4 text-gray-500 dark:text-white/30">
                                Adres e-mail powiązany z Twoim profilem:
                            </p>
                            <div className="px-4 py-3 rounded-xl border font-mono text-sm tracking-wide
                                            border-indigo-200 dark:border-(--contrast-color)/20 bg-(--contrast-color)/[0.06] text-(--contrast-color)">
                                {foundEmail}
                            </div>
                        </div>
                        <Link
                            href={shortcuts.login}
                            className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all duration-150
                                       border-gray-200 bg-gray-50 text-gray-500 hover:text-gray-800
                                       dark:border-white/[0.07] dark:bg-white/[0.025] dark:text-white/60 dark:hover:text-white dark:hover:border-(--contrast-color)/25"
                        >
                            Przejdź do logowania →
                        </Link>
                    </div>
                )}

                <Link
                    href={shortcuts.forgot}
                    className="mt-6 flex items-center justify-center gap-2 text-xs transition-colors text-gray-300 dark:text-white/25 hover:text-(--contrast-color)/65"
                >
                    <ArrowLeftIcon size={12}/>
                    Wróć do wyboru opcji
                </Link>
            </div>
        </div>
    );
};

export default ForgotEmailForm;