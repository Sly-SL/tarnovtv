"use client";

import {Controller, useForm} from "react-hook-form";
import {BasicInput} from "@/shared/components/libs/basic/input.component";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {useRouter} from 'next/navigation';
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {BasicH1} from "@/shared/components/libs/basic/text/h1.text";
import {toast} from "sonner";
import {useState} from "react";
import {RegisterAction} from "@/app/admin/register/action";

export type RegisterFormValues = {
    mail: string;
    password: string;
    name: string;
};

const RegisterForm = () => {
    const [formData, setFormData] = useState<RegisterFormValues>({
        mail: "",
        password:"",
        name: "",
    });
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        defaultValues: formData,
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setFormData(data);
        try{
            await RegisterAction(data)
            router.push(shortcuts.admin);
            console.log("✅ Form submitted:", data);
        }
        catch(error:unknown){
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 items-center justify-center w-full max-w-sm p-6 bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white/20"
        >
            <BasicH1 className="text-purple-300 text-3xl mb-2">
                Zarejestruj się
            </BasicH1>

            {/* ---------------- Login ---------------- */}
            <Controller
                name="mail"
                control={control}
                rules={{
                    required: "Wprowadź mail",
                }}
                render={({ field }) => (
                    <BasicInput
                        {...field}
                        autoFocus
                        label="Mail"
                        type="text"
                        error={errors.mail?.message}
                    />
                )}
            />

            <Controller
                name="name"
                control={control}
                rules={{
                    required: "Wprowadź imię",
                    pattern: {
                        value: /^[^@]+$/,
                        message: "Imię nie może zawierać znaku @",
                    },
                }}
                render={({ field }) => (
                    <BasicInput
                        {...field}
                        autoFocus
                        label="Imię"
                        type="text"
                        error={errors.name?.message}
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
                        error={errors.password?.message || errors.root?.message}
                    />
                )}
            />

            <BasicButton
                type="submit"
                className="w-full font-semibold text-white tracking-wide"
                loading={isSubmitting}
            >
                {isSubmitting ? ("Tworzę...") : ("Stwórz")}
            </BasicButton>
        </form>
    );
};

export default RegisterForm;