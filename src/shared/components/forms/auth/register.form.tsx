"use client";

import {Controller, useForm} from "react-hook-form";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {toast} from "sonner";
import {RegisterAction} from "@/actions/auth/register.action";
import type {RegisterFormType} from "@/shared/types/forms/register.form.type";
import {BasicInput} from "@/shared/components/libs/basic/input.component";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {useLayoutEffect, useState} from "react";
import {EyeIcon, EyeSlashIcon} from "@phosphor-icons/react";
import {BasicCheckbox} from "@/shared/components/libs/basic/checkbox.component";
import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";

const RegisterForm = () => {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [acceptedRules, setAcceptedRules] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
        formState: {errors, isSubmitting},
    } = useForm<RegisterFormType>({
        defaultValues: {
            email: "",
            password: "",
            name: "",
            surname: "",
            password_confirm: "",
            isNotificationAllowed: false,
            gender: "male",
        },
    });
    useLayoutEffect(() => {
        let cancelled = false;
        GetUserBySessionIdAction().then(user => {
            if (!cancelled && user) router.push(shortcuts.settings);
        });
        return () => { cancelled = true; };
    }, []);

    const passwordValue = watch("password");

    const onSubmit = async (data: RegisterFormType) => {
        if (!acceptedRules) return toast.error("Musisz zaakceptować regulamin");
        try {
            await RegisterAction(data);
            router.push(shortcuts.settings);
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">

            <div className="absolute -top-40 -right-28 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none"/>
            <div className="absolute -bottom-24 -left-20 w-[350px] h-[350px] rounded-full bg-pink-500/[0.07] blur-[90px] pointer-events-none"/>
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
                }}
            />

            <div
                className="relative w-full max-w-[460px] rounded-3xl p-10
                           border border-gray-200 bg-white shadow-sm
                           dark:border-white/[0.07] dark:bg-white/[0.028] dark:backdrop-blur-2xl
                           dark:shadow-[0_32px_72px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.035)_inset]"
                style={{animation: "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both"}}
            >
                <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full text-[10px] font-semibold tracking-widest uppercase
                                bg-indigo-50 border border-indigo-200 text-indigo-600
                                dark:bg-(--contrast-color)/10 dark:border-indigo-500/20 dark:text-(--contrast-color)/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                    Rejestracja
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-extrabold tracking-tight leading-tight mb-1
                               text-gray-900 dark:text-white">
                    Witaj w{" "}
                    <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                        TarnovTV
                    </span>
                </h1>
                <p className="text-sm font-light mb-7 text-gray-500 dark:text-white/30">
                    Jedno konto — wszystkie treści, i wpływ na rozwój miasta.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

                    <div className="grid grid-cols-2 gap-3">
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: "Podaj imię",
                                pattern: {value: /^[^@]+$/, message: "Nieprawidłowe imię"},
                            }}
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
                        name="email"
                        control={control}
                        rules={{
                            required: "Podaj adres e-mail",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Nieprawidłowy adres e-mail",
                            },
                        }}
                        render={({field}) => (
                            <BasicInput
                                {...field}
                                type="email"
                                label="E-mail"
                                placeholder="jan@kowalski.pl"
                                error={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Podaj hasło",
                            minLength: {value: 8, message: "Hasło musi mieć co najmniej 8 znaków"},
                            pattern: {
                                value: /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]+$/,
                                message: "Tylko litery, cyfry i znaki specjalne",
                            },
                        }}
                        render={({field}) => (
                            <div className="relative">
                                <BasicInput
                                    {...field}
                                    type={passwordVisible ? "text" : "password"}
                                    label="Hasło"
                                    placeholder="Min. 8 znaków"
                                    error={errors.password?.message}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(v => !v)}
                                    className="absolute right-2.5 top-[34px] transition-colors
                                               text-gray-400 hover:text-gray-600
                                               dark:text-white/30 dark:hover:text-white/60"
                                >
                                    {passwordVisible ? <EyeSlashIcon size={16}/> : <EyeIcon size={16}/>}
                                </button>
                            </div>
                        )}
                    />

                    <Controller
                        name="password_confirm"
                        control={control}
                        rules={{
                            required: "Powtórz hasło",
                            validate: (val) => val === passwordValue || "Hasła nie pasują do siebie",
                        }}
                        render={({field}) => (
                            <div className="relative">
                                <BasicInput
                                    {...field}
                                    type={passwordVisible ? "text" : "password"}
                                    label="Powtórz hasło"
                                    placeholder="Tak samo jak wyżej"
                                    error={errors.password_confirm?.message}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(v => !v)}
                                    className="absolute right-2.5 top-[34px] transition-colors
                                               text-gray-400 hover:text-gray-600
                                               dark:text-white/30 dark:hover:text-white/60"
                                >
                                    {passwordVisible ? <EyeSlashIcon size={16}/> : <EyeIcon size={16}/>}
                                </button>
                            </div>
                        )}
                    />

                    <div className="w-full h-px my-1
                                    bg-gray-100
                                    dark:bg-gradient-to-r dark:from-transparent dark:via-white/[0.07] dark:to-transparent"/>

                    {/* Płeć */}
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
                                                    ? "border-indigo-400/50 bg-indigo-50 text-indigo-600 dark:border-(--contrast-color)/45 dark:bg-indigo-500/10 dark:text-(--contrast-color) dark:shadow-[0_0_0_2px_rgba(99,102,241,0.1)]"
                                                    : "border-gray-200 bg-gray-50 text-gray-400 hover:border-indigo-300 hover:text-gray-600 dark:border-white/[0.07] dark:bg-white/[0.025] dark:text-white/38 dark:hover:border-(--contrast-color)/20 dark:hover:text-white/60",
                                            ].join(" ")}
                                        >
                                            {g === "male" ? "♂ Mężczyzna" : "♀ Kobieta"}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    />

                    {/* Powiadomienia */}
                    <Controller
                        name="isNotificationAllowed"
                        control={control}
                        render={({field}) => (
                            <BasicCheckbox checked={field.value} onChange={field.onChange}>
                                Chcę być na bieżąco — wysyłajcie mi powiadomienia o nowych filmach i aktualizacjach
                            </BasicCheckbox>
                        )}
                    />

                    {/* Regulamin */}
                    <BasicCheckbox checked={acceptedRules} onChange={setAcceptedRules}>
                        Zapoznałem/am się z{" "}
                        <Link
                            href={shortcuts.privacy}
                            onClick={(e) => e.stopPropagation()}
                            className="transition-colors hover:underline underline-offset-2
                                       text-indigo-500 hover:text-indigo-600
                                       dark:text-(--contrast-color)/70 dark:hover:text-(--contrast-color)"
                        >
                            polityką prywatności
                        </Link>
                        {" "}i akceptuję warunki przetwarzania danych osobowych
                    </BasicCheckbox>

                    <BasicButton
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting || !acceptedRules}
                        size="lg"
                        className="w-full mt-1"
                    >
                        {!isSubmitting && "Stwórz konto →"}
                    </BasicButton>
                </form>

                <p className="mt-5 text-center text-xs
                              text-gray-400 dark:text-white/25">
                    Masz już konto?{" "}
                    <Link
                        href={shortcuts.login}
                        className="transition-colors
                                   text-indigo-500 hover:text-indigo-600
                                   dark:text-(--contrast-color)/65 dark:hover:text-(--contrast-color)"
                    >
                        Zaloguj się
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;