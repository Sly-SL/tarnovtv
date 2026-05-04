import type {AddProjectProps} from "@/shared/components/forms/add-project/add-project.form";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {Dispatch, type SetStateAction, useState} from "react";
import {BasicInput} from "@/shared/components/libs/basic/input.component";
import ToogleComponent from "@/shared/components/libs/basic/toogle.component";
import {BasicP} from "@/shared/components/libs/basic/text/p.text";

interface AnotherInfoAddWorkProps extends AddProjectProps{
    setHashtags: Dispatch<SetStateAction<string[]>>
    hashtags:string[]
    setInteresting: Dispatch<SetStateAction<string[]>>
    interesting:string[]
    setPrivate:Dispatch<SetStateAction<boolean>>
}

const AnotherInfoAddWork = ({
                                interesting,hashtags,
                                setInteresting,setHashtags,setPrivate,
                                progress,handleChangeProgress
}:AnotherInfoAddWorkProps) => {
    const [metaInput, setMetaInput] = useState<string>("");
    const [mode, setMode] = useState<"hashtags"|"interesting">("hashtags");
    const handleArrayPush = (arr: "hashtags"|"interesting") => {
        switch(arr) {
            case "interesting":
                if (metaInput.trim().length > 0) {
                    setInteresting((prev) => [...prev, metaInput.trim()]);
                    setMetaInput('');
                }
                break;
            case "hashtags":
                if (metaInput.trim().length > 0) {
                    setHashtags(prev => [...prev, metaInput.trim()]);
                    setMetaInput('');
                }
        }
    };


    const handleArrayDelete = (arr: "hashtags"|"interesting",index: number) => {
        switch(arr) {
            case "hashtags":
                setHashtags(interesting.filter((_, i) => i !== index));
                break;

                case "interesting":
                    setHashtags(hashtags.filter((_, i) => i !== index));
                    break;
        }
    };
    return (
        <div className={"p-8 gap-4 grid"}>
            <div className="flex justify-between items-center mb-6">
                <BasicButton
                    onClick={() => handleChangeProgress("-")}
                    className="hover:opacity-80 z-1 transition duration-200"
                >
                    ← Wstecz
                </BasicButton>
                <span className="text-sm text-neutral-500">
                    Krok {progress + 1} z 3
                </span>
            </div>

            <div className={"z-1"}>
                <ToogleComponent data={[
                    {value:"hashtags", label: "hashtagi", func: setMode},
                    {value:"interesting", label: "ciekawostki", func: setMode}
                ]}/>
            </div>


            {mode === "hashtags" && (
                <div className="space-y-2 z-1">
                    <BasicInput
                        placeholder="Hashtagi..."
                        type="text"
                        color="black"
                        value={metaInput}
                        onChange={(e)=>setMetaInput(e.target.value)}
                    />
                    <BasicButton type={'button'} onClick={()=>handleArrayPush("hashtags")}>
                        Dodaj
                    </BasicButton>

                    {hashtags?.length > 0 && hashtags.map((tag, key) => (
                        <div key={key} className="relative p-2 flex flex-col-reverse border rounded bg-black">
                            <p>{tag}</p>
                            <BasicButton
                                type="button"
                                className="bg-red-600 absolute top-1 right-1"
                                onClick={() => handleArrayDelete("hashtags",key)}
                            >
                                x
                            </BasicButton>

                        </div>
                    ))}
                </div>
            )}

            {mode === "interesting" && (
                <div className="space-y-2 z-1">
                    <BasicInput
                        placeholder="Ciekawostka..."
                        type="text"
                        color="black"
                        value={metaInput}
                        onChange={(e)=>setMetaInput(e.target.value)}
                    />
                    <BasicButton type={'button'} onClick={()=>handleArrayPush("interesting")}>
                        Dodaj
                    </BasicButton>

                    {interesting?.length > 0 && interesting.map((tag, key) => (
                        <div key={key} className="relative p-2 flex flex-col-reverse border rounded bg-black">
                            <p>{tag}</p>
                            <BasicButton
                                type="button"
                                className="bg-red-600 absolute top-1 right-1"
                                onClick={() => handleArrayDelete("interesting",key)}
                            >
                                x
                            </BasicButton>

                        </div>
                    ))}
                </div>
            )}

            <div className={"z-1"}>
                <BasicP>Prywatne?</BasicP>
                <ToogleComponent
                    data={[
                        {value:true, label:"Tak", func:setPrivate},
                        {value:false, label:"Nie", func:setPrivate},
                    ]}/>
            </div>

            <BasicButton onClick={()=>handleChangeProgress("+")}>Dalej</BasicButton>
        </div>
    );
};

export default AnotherInfoAddWork;