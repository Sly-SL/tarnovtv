"use client";

import {Controller, useForm} from "react-hook-form";
import {BasicInput} from "@/shared/components/libs/basic/input.component";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {useRouter} from 'next/navigation';
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {BasicH1} from "@/shared/components/libs/basic/text/h1.text";
import {toast} from "sonner";
import {useState} from "react";
import {ChangePassword} from "@/app/admin/change/[token]/action";

export type ChangePasswordValues = {
    password: string;
    password_confirmation: string;
};

const ChangePasswordForm = ({token}:{token:string}) => {
    const [formData, setFormData] = useState<ChangePasswordValues>({
        password: "",
        password_confirmation: "",
    });
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ChangePasswordValues>({
        defaultValues: formData,
    });

    const onSubmit = async (data: ChangePasswordValues) => {
        if(data.password !== formData.password_confirmation)
            toast.error("Passwords don't match");

        setFormData(data);
        try{
            await ChangePassword(token, data.password);
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
                Zmień hasło
            </BasicH1>

            {/* ---------------- Password ---------------- */}
            <Controller
                name="password"
                control={control}
                rules={{
                    required: "Wprowadź hasło",
                }}
                render={({ field }) => (
                    <BasicInput
                        {...field}
                        autoFocus
                        label="Hasło"
                        type="text"
                        error={errors.password?.message}
                    />
                )}
            />

            {/* ---------------- Password Confirmation ---------------- */}
            <Controller
                name="password_confirmation"
                control={control}
                rules={{
                    required: "Wprowadź potwierdzenie hasła",
                }}
                render={({ field }) => (
                    <BasicInput
                        {...field}
                        autoFocus
                        label="Potwierdzenie hasła"
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
                {isSubmitting ? ("Zmieniam") : ("Zmień hasło")}
            </BasicButton>
        </form>
    );
};

export default ChangePasswordForm;