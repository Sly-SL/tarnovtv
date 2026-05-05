"use client";

import {Controller, useForm} from "react-hook-form";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {toast} from "sonner";
import {useLayoutEffect, useState} from "react";
import {LoginAction} from "@/actions/auth/login.action";
import {BasicInput} from "@/shared/components/libs/basic/input.component";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {EyeIcon, EyeSlashIcon} from "@phosphor-icons/react";
import {GetUserBySessionIdAction} from "@/actions/auth/get-user-by-session-id.action";

export type LoginFormValues = {
    login: string;
    password: string;
};

const LoginForm = () => {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);

    useLayoutEffect(() => {
        let cancelled = false;
        GetUserBySessionIdAction().then(user => {
            if (!cancelled && user) router.push(shortcuts.settings);
        });
        return () => { cancelled = true; };
    }, []);

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<LoginFormValues>({
        defaultValues: {login: "", password: ""},
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const result = await LoginAction(data);
            if (!result.success) return toast.error(result.message);
            router.push(shortcuts.settings);
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden
                        bg-white dark:bg-transparent">

            {/* Orbs */}
            <div className="absolute -top-40 -left-28 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none"/>
            <div className="absolute -bottom-24 -right-20 w-[350px] h-[350px] rounded-full bg-violet-500/[0.07] blur-[90px] pointer-events-none"/>

            {/* Grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
                }}
            />

            {/* Card */}
            <div
                className="relative z-10 w-full max-w-[420px] rounded-3xl p-10
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
                    Logowanie
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-extrabold tracking-tight leading-tight mb-1
                               text-gray-900 dark:text-white">
                    Witamy{" "}
                    <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                        z powrotem
                    </span>
                </h1>
                <p className="text-sm font-light mb-7 text-gray-500 dark:text-white/30">
                    Zaloguj się i wróć do tego, co ważne dla Tarnowa.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

                    <Controller
                        name="login"
                        control={control}
                        rules={{required: "Podaj adres e-mail, username bądź numer telefonu"}}
                        render={({field}) => (
                            <BasicInput
                                {...field}
                                type="text"
                                label="Login"
                                placeholder="jan@kowalski.pl"
                                error={errors.login?.message}
                                autoFocus
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
                                    placeholder="••••••••"
                                    error={errors.password?.message}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(v => !v)}
                                    className="absolute right-0 top-[22px] w-10 h-9 flex items-center justify-center transition-colors
                                               text-gray-400 hover:text-gray-600
                                               dark:text-white/30 dark:hover:text-white/60"
                                >
                                    {passwordVisible ? <EyeSlashIcon size={16}/> : <EyeIcon size={16}/>}
                                </button>
                            </div>
                        )}
                    />

                    {/* Forgot password */}
                    <div className="flex justify-end -mt-1">
                        <Link
                            href={shortcuts.forgot}
                            className="text-[11px] transition-colors
                                       text-gray-400 hover:text-indigo-500
                                       dark:text-white/25 dark:hover:text-(--contrast-color)/70"
                        >
                            Zapomniałem/am dannych
                        </Link>
                    </div>

                    <BasicButton
                        type="submit"
                        loading={isSubmitting}
                        size="lg"
                        className="w-full mt-1"
                    >
                        {!isSubmitting && "Zaloguj się →"}
                    </BasicButton>
                </form>

                <p className="mt-5 text-center text-xs
                              text-gray-400 dark:text-white/25">
                    Nie masz konta?{" "}
                    <Link
                        href={shortcuts.register}
                        className="transition-colors
                                   text-indigo-500 hover:text-indigo-600
                                   dark:text-(--contrast-color)/65 dark:hover:text-(--contrast-color)"
                    >
                        Zarejestruj się
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;