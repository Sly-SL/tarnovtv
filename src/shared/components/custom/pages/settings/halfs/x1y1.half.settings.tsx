"use client";

import {type ChangeEvent, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {toast} from "sonner";
import {
    CameraIcon,
    EyeIcon,
    EyeSlashIcon,
    FloppyDiskIcon,
    SignOutIcon,
    UserCircleGearIcon,
} from "@phosphor-icons/react";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {BasicInput} from "@/shared/components/libs/basic/input.component";
import {UploadImageAction} from "@/lib/imagebb/upload.imagebb";
import Image from "next/image"
import type {UserType} from "@/shared/types/domen/user.type";
import {userEdit} from "@/actions/user/user.edit.action";
import {LogoutAction} from "@/actions/auth/logout.action";
import {useRouter} from "next/navigation";

type SettingsFormValues = {
    name: string;
    surname: string;
    email: string;
    password: string;
    password_confirm: string;
};

const roleBadge: Record<string, string> = {
    admin: "text-red-400 bg-red-500/10 border-red-500/20",
    moderator: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    user: "text-(--contrast-color) bg-(--contrast-color)/10 border-(--contrast-color)/20",
};

const X1Y1HalfSettings = (user: UserType) => {
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [photoLoading, setPhotoLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const router = useRouter();

    const {
        control,
        handleSubmit,
        watch,
        formState: {errors, isSubmitting},
    } = useForm<SettingsFormValues>({
        defaultValues: {
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: "",
            password_confirm: "",
        },
    });

    const passwordValue = watch("password");

    const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPhoto(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSavePhoto = async () => {
        if (!photo) return toast.error("Wybierz zdjęcie");
        setPhotoLoading(true);
        try {
            const url = await UploadImageAction(photo);
            await userEdit({image: url}, user.id);
            toast.success("Zdjęcie zostało zaktualizowane");
        } catch {
            toast.error("Nie udało się zapisać zdjęcia");
        } finally {
            setPhotoLoading(false);
        }
    };

    const onSubmit = async (data: SettingsFormValues) => {
        try {
            const patch: Partial<UserType> = {
                name: data.name,
                surname: data.surname,
                email: data.email,
            };
            if (data.password) patch.password = data.password;
            await userEdit(patch, user.id);
            toast.success("Dane zostały zaktualizowane");
        } catch {
            toast.error("Nie udało się zapisać zmian");
        }
    };

    const displayPhoto = preview || user.image || null;

    return (
        <Animate preset="fadeLeft">
            <div className="relative min-h-screen w-full flex flex-col overflow-hidden">

                {/* ── Background layer ── */}
                <div className="absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-(--contrast-color)/10 blur-[120px] pointer-events-none"/>
                <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-pink-500/[0.07] blur-[100px] pointer-events-none"/>

                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(0,0,0,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.018) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                        maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 100%)",
                    }}
                />

                {/* ── Page header ── */}
                <div className="relative z-10 px-4 sm:px-8 lg:px-12 pt-8 pb-6 border-b border-black/[0.06] dark:border-white/[0.06]">
                    <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-(--contrast-color)/10 border border-indigo-500/20 text-[10px] font-semibold tracking-widest uppercase text-(--contrast-color)/85">
                                <span className="w-1.5 h-1.5 rounded-full bg-(--contrast-color) shadow-[0_0_6px_#818cf8] animate-pulse"/>
                                Ustawienia konta
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-black dark:text-white leading-tight">
                                Twój{" "}
                                <span className="bg-linear-to-br from-(--contrast-color) to-indigo-400 bg-clip-text text-transparent">
                                    Profil
                                </span>
                            </h1>
                            <p className="text-sm text-black/30 dark:text-white/30 font-light mt-1">
                                Zarządzaj swoimi danymi i personalizuj konto.
                            </p>
                        </div>

                        <div className="hidden sm:flex items-center gap-3">
                            <span className="text-[10px] uppercase tracking-widest text-black/25 dark:text-white/25 font-mono">
                                {user.id.slice(0, 12)}…
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase border ${roleBadge[user.role] ?? roleBadge.user}`}>
                                {user.role}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Main content ── */}
                <div className="relative z-10 flex-1 px-4 sm:px-8 lg:px-12 py-8">
                    <div className="max-w-screen-xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-6 lg:gap-8 items-stretch">

                            {/* ── LEFT: Avatar card ── */}
                            <div className="
                                rounded-2xl p-6 flex flex-col items-center gap-4 h-full justify-between
                                border border-black/[0.07] bg-black/[0.028] shadow-[0_16px_48px_rgba(0,0,0,0.08)]
                                dark:border-white/[0.07] dark:bg-white/[0.028] dark:shadow-[0_16px_48px_rgba(0,0,0,0.35)]
                                backdrop-blur-xl
                            ">
                                <div className="flex flex-col gap-0.5 px-3 py-2 rounded-xl border border-black/[0.05] bg-black/[0.018] dark:border-white/[0.05] dark:bg-white/[0.018]">
                                    <button
                                        onClick={async () => {
                                            await LogoutAction();
                                            router.push("/login");
                                            router.refresh();
                                        }}
                                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.05] transition-colors">
                                        <SignOutIcon size={14}/>
                                        Wyloguj się
                                    </button>
                                </div>

                                {/* Avatar picker */}
                                <label className="relative cursor-pointer group">
                                    <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full overflow-hidden border-2 border-black/10 dark:border-white/10 group-hover:border-(--contrast-color)/40 transition-all duration-200 shadow-[0_0_0_4px_rgba(0,0,0,0.03)] dark:shadow-[0_0_0_4px_rgba(255,255,255,0.03)]">
                                        {displayPhoto ? (
                                            <Image
                                                src={displayPhoto}
                                                alt="Avatar"
                                                fill
                                                sizes="140px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.04] text-black/20 dark:text-white/20">
                                                <UserCircleGearIcon size={60}/>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <CameraIcon size={24} className="text-white"/>
                                        </div>
                                    </div>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleChangeAvatar}/>
                                </label>

                                <div className="text-center">
                                    <p className="text-base font-semibold text-black dark:text-white">{user.name} {user.surname}</p>
                                    <span className={`inline-flex items-center mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase border ${roleBadge[user.role] ?? roleBadge.user}`}>
                                        {user.role}
                                    </span>
                                </div>

                                {/* ID on mobile */}
                                <div className="sm:hidden w-full flex flex-col gap-1 px-3 py-2.5 rounded-xl border border-black/[0.05] bg-black/[0.018] dark:border-white/[0.05] dark:bg-white/[0.018]">
                                    <span className="text-[10px] uppercase tracking-widest text-black/25 dark:text-white/25">ID konta</span>
                                    <span className="text-black/40 dark:text-white/40 font-mono text-[11px] truncate">{user.id}</span>
                                </div>

                                <div className="w-full h-px bg-gradient-to-r from-transparent via-black/[0.07] to-transparent dark:via-white/[0.07]"/>

                                {/* Info cells */}
                                <div className="w-full flex flex-col gap-2 text-xs">
                                    {[
                                        {label: "E-mail", value: user.email},
                                        {label: "Płeć", value: user.gender === "male" ? "Mężczyzna" : "Kobieta"},
                                    ].map(({label, value}) => (
                                        <div key={label} className="flex flex-col gap-0.5 px-3 py-2 rounded-xl border border-black/[0.05] bg-black/[0.018] dark:border-white/[0.05] dark:bg-white/[0.018]">
                                            <span className="text-[10px] uppercase tracking-widest text-black/25 dark:text-white/25">{label}</span>
                                            <span className="text-black/55 dark:text-white/55 font-medium truncate">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                {photo && (
                                    <button
                                        type="button"
                                        onClick={handleSavePhoto}
                                        disabled={photoLoading}
                                        className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-(--contrast-color)/30 bg-(--contrast-color)/10 text-(--contrast-color) hover:bg-(--contrast-color)/20 transition-all duration-150 disabled:opacity-50"
                                    >
                                        <FloppyDiskIcon size={13}/>
                                        {photoLoading ? "Zapisywanie..." : "Zapisz zdjęcie →"}
                                    </button>
                                )}
                            </div>

                            {/* ── RIGHT: Form card ── */}
                            <div className="
                                rounded-2xl p-6 sm:p-8
                                border border-black/[0.07] bg-black/[0.028] shadow-[0_16px_48px_rgba(0,0,0,0.08)]
                                dark:border-white/[0.07] dark:bg-white/[0.028] dark:shadow-[0_16px_48px_rgba(0,0,0,0.35)]
                                backdrop-blur-xl
                            ">
                                <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>

                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                                    <span className="block text-[11px] font-medium tracking-widest uppercase text-black/35 dark:text-white/35">
                                        Dane osobowe
                                    </span>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <Controller
                                            name="name"
                                            control={control}
                                            rules={{
                                                required: "Podaj imię",
                                                pattern: {value: /^[^@]+$/, message: "Nieprawidłowe imię"},
                                            }}
                                            render={({field}) => (
                                                <BasicInput {...field} label="Imię" placeholder="Jan" error={errors.name?.message}/>
                                            )}
                                        />
                                        <Controller
                                            name="surname"
                                            control={control}
                                            rules={{required: "Podaj nazwisko"}}
                                            render={({field}) => (
                                                <BasicInput {...field} label="Nazwisko" placeholder="Kowalski" error={errors.surname?.message}/>
                                            )}
                                        />
                                    </div>

                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{
                                            required: "Podaj adres e-mail",
                                            pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Nieprawidłowy adres e-mail"},
                                        }}
                                        render={({field}) => (
                                            <BasicInput {...field} type="email" label="E-mail" placeholder="jan@kowalski.pl" error={errors.email?.message}/>
                                        )}
                                    />

                                    {/* ID read-only – desktop only */}
                                    <div className="hidden sm:flex flex-col gap-1 px-3 py-2.5 rounded-xl border border-black/[0.05] bg-black/[0.018] dark:border-white/[0.05] dark:bg-white/[0.018]">
                                        <span className="text-[10px] uppercase tracking-widest text-black/25 dark:text-white/25">ID konta</span>
                                        <span className="text-black/40 dark:text-white/40 font-mono text-xs truncate">{user.id}</span>
                                    </div>

                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-black/[0.07] to-transparent dark:via-white/[0.07]"/>

                                    <div>
                                        <span className="block text-[11px] font-medium tracking-widest uppercase text-black/35 dark:text-white/35">
                                            Zmiana hasła
                                        </span>
                                        <p className="text-[11px] text-black/25 dark:text-white/25 mt-0.5">
                                            Zostaw puste, jeśli nie chcesz zmieniać hasła.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{
                                                minLength: {value: 8, message: "Min. 8 znaków"},
                                                pattern: {
                                                    value: /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]*$/,
                                                    message: "Niedozwolone znaki",
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
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setPasswordVisible((v) => !v)}
                                                        className="absolute right-2.5 top-[34px] text-black/30 dark:text-white/30 hover:text-black/60 dark:hover:text-white/60 transition-colors"
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
                                                validate: (val) => !passwordValue || val === passwordValue || "Hasła nie pasują",
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
                                                        onClick={() => setPasswordVisible((v) => !v)}
                                                        className="absolute right-2.5 top-[34px] text-black/30 dark:text-white/30 hover:text-black/60 dark:hover:text-white/60 transition-colors"
                                                    >
                                                        {passwordVisible ? <EyeSlashIcon size={16}/> : <EyeIcon size={16}/>}
                                                    </button>
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-black/[0.07] to-transparent dark:via-white/[0.07]"/>

                                    <BasicButton
                                        type="submit"
                                        loading={isSubmitting}
                                        disabled={isSubmitting}
                                        size="lg"
                                        className="w-full sm:w-auto sm:self-end sm:min-w-[200px]"
                                    >
                                        {!isSubmitting && "Zapisz zmiany →"}
                                    </BasicButton>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Animate>
    );
};

export default X1Y1HalfSettings;