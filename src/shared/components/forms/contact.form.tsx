'use client'

import {type ChangeEvent, useState} from "react";
import {ChatCircleIcon, MailboxIcon, UserIcon} from "@phosphor-icons/react/ssr";
import {PaperPlaneRightIcon, ShareNetworkIcon} from "@phosphor-icons/react";
import Animate from "@/shared/components/libs/animate/animate.ssr";
import {useFormStatus} from "react-dom";


interface FormData {
    name: string;
    email: string;
    message: string;
}

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });

    const {pending} = useFormStatus()


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Animate
            preset={"fadeLeft"}
            duration={1100}
            className="w-full bg-linear-to-b from-white/10 to-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl p-6">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-linear-to-r from-[#6366f1] to-[#a855f7]">
                            Skontaktuj się z nami
                        </h2>
                        <p className="text-gray-400">
                            Masz coś do omówienia? Napisz do nas wiadomość i porozmawiajmy.
                        </p>
                    </div>
                    <ShareNetworkIcon className="w-10 h-10 text-[#6366f1] opacity-50" />
                </div>
            <form
                action="https://formsubmit.co/tarnovtv@gmail.com"
                method="POST"
                className="space-y-6"
            >
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />

                <Animate
                    preset={"fadeUp"}
                    duration={100}
                    className="relative group"
                >
                    <UserIcon className="absolute left-4 top-4 w-5 h-5 text-black/80 dark:text-gray-400 dark:group-focus-within:text-gray-300 group-focus-within:text-black/90 transition-colors" />
                    <input
                        type="text"
                        name="name"
                        placeholder="Imię"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={pending}
                        className="w-full p-4 pl-12 dark:bg-white/10 bg-white/70 rounded-xl border dark:border-white/20 border-black/80 dark:placeholder-gray-500 placeholder-black/80 dark:text-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500/30 transition-all duration-300 hover:border-gray-500/30 disabled:opacity-50"
                        required
                    />
                </Animate>
                <Animate
                    preset={"fadeUp"}
                    duration={1200}
                    className="relative group"
                >
                    <MailboxIcon className="absolute left-4 top-4 w-5 h-5 text-black/80 dark:text-gray-400 dark:group-focus-within:text-gray-300 group-focus-within:text-black/90 transition-colors" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Poczta"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={pending}
                        className="w-full p-4 pl-12 dark:bg-white/10 bg-white/70 rounded-xl border dark:border-white/20 border-black/80 dark:placeholder-gray-500 placeholder-black/80 dark:text-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500/30 transition-all duration-300 hover:border-gray-500/30 disabled:opacity-50"
                        required
                    />
                </Animate>
                <Animate
                    preset={"fadeUp"}
                    duration={1200}
                    className="relative group"
                >
                    <ChatCircleIcon className="absolute left-4 top-4 w-5 h-5 text-black/80 dark:text-gray-400 dark:group-focus-within:text-gray-300 group-focus-within:text-black/90 transition-colors" />
                    <textarea
                        name="message"
                        placeholder="Twoja wiadomość"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={pending}
                        className="w-full resize-none p-4 pl-12 dark:bg-white/10 bg-white/70 rounded-xl border dark:border-white/20 border-black/80 dark:placeholder-gray-500 placeholder-black/80 dark:text-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500/30 transition-all duration-300 hover:border-gray-500/30 disabled:opacity-50"
                        required
                    />
                </Animate>
            </form>

                <Animate
                    preset={"fadeUp"}
                    duration={400}>
                    <button
                        type="submit"
                        disabled={pending}
                        className="w-full mt-2 bg-linear-to-r from-black/80 to-gray-950/80 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                        <PaperPlaneRightIcon className="w-5 h-5" />
                        {pending ? "Wysyłanie..." : "Wyślij wiadomość"}
                    </button>
                </Animate>
        </Animate>
    );
};

export default ContactForm;