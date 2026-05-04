"use client";

import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {toast} from "sonner";
import {useState} from "react";
import {ChangePasswordAction} from "@/actions/auth/change-password.action";
import {BasicInput} from "@/shared/components/libs/basic/input.component";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {EyeIcon, EyeSlashIcon} from "@phosphor-icons/react";

export type ChangePasswordValues = {
    password: string;
    password_confirmation: string;
};

const ChangePasswordForm = ({token}: {token: string}) => {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
        formState: {errors, isSubmitting},
    } = useForm<ChangePasswordValues>({
        defaultValues: {password: "", password_confirmation: ""},
    });

    const passwordValue = watch("password");

    const onSubmit = async (data: ChangePasswordValues) => {
        try {
            await ChangePasswordAction(token, data.password);
            router.push(shortcuts.admin);
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">

            {/* Orbs */}
            <div className="absolute -top-40 -right-28 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none"/>
            <div className="absolute -bottom-24 -left-20 w-[350px] h-[350px] rounded-full bg-pink-500/[0.07] blur-[90px] pointer-events-none"/>

            {/* Grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
                }}
            />

            {/* Card */}
            <div
                className="relative z-10 w-full max-w-[420px] rounded-3xl border border-white/[0.07] bg-white/[0.028] backdrop-blur-2xl shadow-[0_32px_72px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.035)_inset] p-10"
                style={{animation: "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both"}}
            >
                <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-(--contrast-color)/10 border border-indigo-500/20 text-[10px] font-semibold tracking-widest uppercase text-(--contrast-color)/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                    Nowe hasło
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight mb-1">
                    Zmień{" "}
                    <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                        hasło
                    </span>
                </h1>
                <p className="text-sm text-white/30 font-light mb-7">
                    Ustaw nowe hasło — najlepiej takie, którego jeszcze nie używałeś.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Podaj nowe hasło",
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
                                    label="Nowe hasło"
                                    placeholder="Min. 8 znaków"
                                    error={errors.password?.message}
                                    className="pr-10"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(v => !v)}
                                    className="absolute right-0 top-[22px] w-10 h-9 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors"
                                >
                                    {passwordVisible ? <EyeSlashIcon size={16}/> : <EyeIcon size={16}/>}
                                </button>
                            </div>
                        )}
                    />

                    <Controller
                        name="password_confirmation"
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
                                    error={errors.password_confirmation?.message}
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(v => !v)}
                                    className="absolute right-0 top-[22px] w-10 h-9 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors"
                                >
                                    {passwordVisible ? <EyeSlashIcon size={16}/> : <EyeIcon size={16}/>}
                                </button>
                            </div>
                        )}
                    />

                    <BasicButton
                        type="submit"
                        loading={isSubmitting}
                        size="lg"
                        className="w-full mt-1"
                    >
                        {!isSubmitting && "Zmień hasło →"}
                    </BasicButton>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordForm;