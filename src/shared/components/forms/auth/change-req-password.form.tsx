"use client";

import {Controller, useForm} from "react-hook-form";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {toast} from "sonner";
import {ReqChangeAction} from "../../../../actions/auth/request-change-of-password.action";
import {BasicInput} from "@/shared/components/libs/basic/input.component";
import {BasicButton} from "@/shared/components/libs/basic/button.component";

export type ChangeReqValues = {
    mail: string;
};

const ForgotPasswordForm = () => {
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<ChangeReqValues>({
        defaultValues: {mail: ""},
    });

    const onSubmit = async (data: ChangeReqValues) => {
        try {
            await ReqChangeAction({data});
            toast.success("Link został wysłany — sprawdź skrzynkę");
            router.push(shortcuts.login);
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">

            {/* Orbs */}
            <div className="absolute -top-40 -left-28 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none"/>
            <div className="absolute -bottom-24 -right-20 w-[350px] h-[350px] rounded-full bg-violet-500/[0.07] blur-[90px] pointer-events-none"/>

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
                    Reset hasła
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight mb-1">
                    Zapomniałeś{" "}
                    <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                        hasła?
                    </span>
                </h1>
                <p className="text-sm text-white/30 font-light mb-7">
                    Podaj swój e-mail — wyślemy link, który pozwoli Ci je odzyskać.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

                    <Controller
                        name="mail"
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
                                error={errors.mail?.message}
                                autoFocus
                            />
                        )}
                    />

                    <BasicButton
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        size="lg"
                        className="w-full mt-1"
                    >
                        {!isSubmitting && "Wyślij link →"}
                    </BasicButton>
                </form>

                <p className="mt-5 text-center text-xs text-white/25">
                    Pamiętasz hasło?{" "}
                    <Link
                        href={shortcuts.forgot}
                        className="text-(--contrast-color)/65 hover:text-(--contrast-color) transition-colors"
                    >
                        Wróć do wyboru opcji
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;