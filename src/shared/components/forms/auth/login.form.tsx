"use client";

import {Controller, useForm} from "react-hook-form";
import {BasicInput} from "@/shared/components/libs/basic/input.component";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {useRouter} from 'next/navigation';
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {BasicH1} from "@/shared/components/libs/basic/text/h1.text";
import {toast} from "sonner";
import {useState} from "react";
import {LoginAction} from "@/app/admin/login/action";

export type LoginFormValues = {
    login: string;
    password: string;
};

const LoginForm = () => {
    const [formData, setFormData] = useState<LoginFormValues>({
        login: "",
        password:"",
    });
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        defaultValues: formData,
    });

    const onSubmit = async (data: LoginFormValues) => {
        setFormData(data)
        try {
            const result = await LoginAction(data);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            router.push(shortcuts.admin);
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 items-center justify-center w-full max-w-sm p-6 bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white/20"
        >
            <BasicH1 className="text-purple-300 text-3xl mb-2">
                Zaloguj się
            </BasicH1>

            {/* ---------------- Login ---------------- */}
            <Controller
                name="login"
                control={control}
                rules={{
                    required: "Wprowadź login",
                }}
                render={({ field }) => (
                    <BasicInput
                        {...field}
                        autoFocus
                        label="Login"
                        type="text"
                        error={errors.login?.message}
                    />
                )}
            />

            {/* ---------------- PASSWORD ---------------- */}
            <Controller
                name="password"
                control={control}
                rules={{
                    required: "Wprowadź hasło",
                    pattern: {
                        value: /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]+$/,
                        message: "Hasło może zawierać tylko litery, cyfry i znaki specjalne",
                    },
                    minLength: { value: 8, message: "Minimum 8 symboli" },
                }}
                render={({ field }) => (
                    <BasicInput
                        {...field}
                        label="Hasło"
                        type="text"
                        error={errors.password?.message}
                    />
                )}
            />

            <BasicButton
                type="submit"
                className="w-full font-semibold text-white tracking-wide"
                loading={isSubmitting}
            >
                {isSubmitting ? ("Logowanie") : ("Zaloguj")}
            </BasicButton>
        </form>
    );
};

export default LoginForm;