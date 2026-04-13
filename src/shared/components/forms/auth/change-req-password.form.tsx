"use client";

import {Controller, useForm} from "react-hook-form";
import {BasicInput} from "@/shared/components/libs/basic/input.component";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {useRouter} from 'next/navigation';
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";
import {BasicH1} from "@/shared/components/libs/basic/text/h1.text";
import {toast} from "sonner";
import {useState} from "react";
import {ReqChangeAction} from "@/app/admin/change/action";

export type ChangeReqValues = {
    mail: string;
};

const LoginForm = () => {
    const [formData, setFormData] = useState<ChangeReqValues>({
        mail: "",
    });
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ChangeReqValues>({
        defaultValues: formData,
    });

    const onSubmit = async (data: ChangeReqValues) => {
        setFormData(data);
        try{
            await ReqChangeAction({data})

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
                Wyślij link resetujący
            </BasicH1>

            {/* ---------------- Mail ---------------- */}
            <Controller
                name="mail"
                control={control}
                rules={{
                    required: "Wprowadź pocztę",
                }}
                render={({ field }) => (
                    <BasicInput
                        {...field}
                        autoFocus
                        label="Maił"
                        type="text"
                        error={errors.mail?.message}
                    />
                )}
            />

            <BasicButton
                type="submit"
                className="w-full font-semibold text-white tracking-wide"
                loading={isSubmitting}
            >
                {isSubmitting ? ("Wysyłam") : ("Wyślij link")}
            </BasicButton>
        </form>
    );
};

export default LoginForm;