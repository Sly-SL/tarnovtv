'use client'

import {type ChangeEvent, type FormEvent, useState} from "react";
import {ChatCircleIcon, MailboxIcon, UserIcon} from "@phosphor-icons/react/ssr";
import {PaperPlaneRightIcon, ShareNetworkIcon} from "@phosphor-icons/react";
import Animate from "@/shared/components/libs/animate/animate.ssr";


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

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('loading');

        try {
            // Get form data
            const form = e.target as HTMLFormElement;

            // Submit form (replace with your API endpoint or form submission logic)
            await form.submit();

            setStatus('success');

            // Reset form
            setFormData({
                name: "",
                email: "",
                message: "",
            });
        } catch {
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <Animate
            preset={"fadeLeft"}
            duration={1100}
            className="w-full bg-linear-to-b from-white/10 to-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl p-6">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-linear-to-r from-[#6366f1] to-[#a855f7]">
                            Skontaktuj się ze mną
                        </h2>
                        <p className="text-gray-400">
                            Masz coś do omówienia? Napisz do mnie wiadomość i porozmawiajmy.
                        </p>
                    </div>
                    <ShareNetworkIcon className="w-10 h-10 text-[#6366f1] opacity-50" />
                </div>
            <form
                action="https://formsubmit.co/slyslcoder@gmail.com"
                method="POST"
                onSubmit={handleSubmit}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                        className="w-full resize-none p-4 pl-12 dark:bg-white/10 bg-white/70 rounded-xl border dark:border-white/20 border-black/80 dark:placeholder-gray-500 placeholder-black/80 dark:text-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500/30 transition-all duration-300 hover:border-gray-500/30 disabled:opacity-50"
                        required
                    />
                </Animate>
            </form>
            {status === 'loading' && (
                <p className="mt-2 text-sm text-gray-500">Wysyłanie wiadomości…</p>
            )}
            {status === 'success' && (
                <p className="mt-2 text-sm text-green-500">Wiadomość wysłana!</p>
            )}
            {status === 'error' && (
                <p className="mt-2 text-sm text-red-500">Upppss, wiadomość nie została wysłana, spróbuj ponownie póżniej.</p>
            )}

                <Animate
                    preset={"fadeUp"}
                    duration={400}>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 bg-linear-to-r from-black/80 to-gray-950/80 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                        <PaperPlaneRightIcon className="w-5 h-5" />
                        {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
                    </button>
                </Animate>
        </Animate>
    );
};

export default ContactForm;