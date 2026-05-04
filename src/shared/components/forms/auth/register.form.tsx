"use client";

import {Controller, useForm} from "react-hook-form";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {toast} from "sonner";
import {RegisterAction} from "../../../../actions/auth/register.action";
import type {RegisterFormType} from "@/shared/types/forms/register.form.type";
import {BasicInput} from "@/shared/components/libs/basic/input.component";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {useState} from "react";
import {EyeIcon, EyeSlashIcon} from "@phosphor-icons/react";
import {BasicCheckbox} from "@/shared/components/libs/basic/checkbox.component";

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
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
                }}
            />

            <div
                className="relative w-full max-w-[460px] rounded-3xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-2xl shadow-[0_32px_72px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.035)_inset] p-10"
                style={{animation: "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both"}}
            >
                <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-(--contrast-color)/10 border border-indigo-500/20 text-[10px] font-semibold tracking-widest uppercase text-(--contrast-color)/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                    Rejestracja
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight mb-1">
                    Witaj w{" "}
                    <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                        TarnovTV
                    </span>
                </h1>
                <p className="text-sm text-white/30 font-light mb-7">
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
                                    className="absolute right-2.5 top-[34px] text-white/30 hover:text-white/60 transition-colors"
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
                                    className="absolute right-2.5 top-[34px] text-white/30 hover:text-white/60 transition-colors"
                                >
                                    {passwordVisible ? <EyeSlashIcon size={16}/> : <EyeIcon size={16}/>}
                                </button>
                            </div>
                        )}
                    />

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent my-1"/>

                    {/* Płeć */}
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
                            className="text-(--contrast-color)/70 hover:text-(--contrast-color) hover:underline underline-offset-2 transition-colors"
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

                <p className="mt-5 text-center text-xs text-white/25">
                    Masz już konto?{" "}
                    <Link
                        href={shortcuts.login}
                        className="text-(--contrast-color)/65 hover:text-(--contrast-color) transition-colors"
                    >
                        Zaloguj się
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;