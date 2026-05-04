"use client";

import {type SubmitEvent, useState} from "react";
import {toast} from "sonner";
import {BasicH3} from "@/shared/components/libs/basic/text/h3.text";
import {UploadImageAction} from "@/lib/imagebb/upload.imagebb";
import {AnimatePresence, motion} from "framer-motion";
import BasicDataAddWork from "@/shared/components/forms/add-project/basic-data.add-work";
import AnotherInfoAddWork from "@/shared/components/forms/add-project/another-info.add-work";
import {BasicH1} from "@/shared/components/libs/basic/text/h1.text";
import {BasicP} from "@/shared/components/libs/basic/text/p.text";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {AddProjectAction} from "@/actions/admin/add-project.action";
import {useChangeProgressForm} from "@/shared/components/forms/change-progress.form";

export interface AddProjectProps {
    progress: number;
    handleChangeProgress: (progress: "+"|"-") => void;
}

export const AddProjectForm = () => {
    const {progress,handleChangeProgress} = useChangeProgressForm()
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [hashtags, setHashtags] = useState<string[]>([]);
    const [interesting, setInteresting] = useState<string[]>([]);
    const [isPrivate, setIsPrivate] = useState<boolean>(false);

    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const url = await UploadImageAction(file);
        await AddProjectAction({
            name,
            id,
            description,
            hashtags,
            interesting,
            image:url,
            private:isPrivate,
        })
        toast.info(<BasicH3>Projekt został wysłany</BasicH3>)
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto p-6">
            <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-[25px] border border-white/20 shadow-lg">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[5px] rounded-2xl"></div>
                    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_50px_rgba(255,255,255,0.1)]"></div>
                </div>

                <AnimatePresence mode="wait">

                    {progress === 0 && (
                        <motion.div
                            key="krok-0"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.25 }}
                        >
                            <BasicDataAddWork
                                name={name} setName={setName}
                                description={description} setDescription={setDescription}
                                id={id} setId={setId}
                                progress={progress}
                                handleChangeProgress={handleChangeProgress}/>
                        </motion.div>
                    )}

                    {progress === 1 && (
                        <motion.div
                            key="krok-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.25 }}
                            className="text-center"
                        >
                            <AnotherInfoAddWork
                                hashtags={hashtags}
                                setHashtags={setHashtags}
                                interesting={interesting}
                                setInteresting={setInteresting}
                                setPrivate={setIsPrivate}
                                progress={progress}
                                handleChangeProgress={handleChangeProgress} />
                        </motion.div>
                    )}

                    {progress === 2 && (
                        <motion.div
                            key="krok-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.25 }}
                            className="text-center"
                        >
                            <div className={"relative rounded-2xl overflow-hidden p-8  bg-white/5 backdrop-blur-[25px] shadow-lg"}>

                                <div className="flex justify-between items-center mb-6">
                                    <BasicButton
                                        onClick={() => handleChangeProgress("-")}
                                        className="hover:opacity-80 z-1 transition duration-200"
                                    >
                                        ← Wstecz
                                    </BasicButton>
                                    <span className="text-sm text-neutral-100">
                    Krok {progress + 1} z 3
                </span>
                                </div>
                                <BasicH1 className={"bg-none hover:shadow-white/20 animate-fade-in-down duration-500 hover:shadow-xl transition-all"}>
                                    Dodaj zdjęcie
                                </BasicH1>
                                <BasicP className={'text-black/70 text-center dark:text-white/80 duration-500 animate-fade-in-up'}>Dodaj plik i się automatycznie umieści na stronie </BasicP>
                            </div>
                            <div className="relative z-10 flex flex-col gap-4 p-6">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                                    className="relative z-10 px-4 py-2 border rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition"
                                />

                                <button
                                    type="submit"
                                    className="relative z-10 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm shadow-lg hover:bg-white/30 transition"
                                >
                                    Dodaj
                                </button>
                                <BasicButton
                                    onClick={() => handleChangeProgress("+")}
                                    className="hover:opacity-80 z-1 transition duration-200"
                                >
                                    Dalej
                                </BasicButton>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </form>
    );
};