import {AddWorkProps} from "@/shared/components/forms/add-work/add-work.form";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {Dispatch, type SetStateAction, useState} from "react";
import {BasicInput} from "@/shared/components/libs/basic/input.component";
import ToogleComponent from "@/shared/components/libs/basic/toogle.component";
import {BasicP} from "@/shared/components/libs/basic/text/p.text";

interface AnotherInfoAddWorkProps extends AddWorkProps{
    setTech: Dispatch<SetStateAction<string[]>>
    techs:string[]
    setFeatures: Dispatch<SetStateAction<string[]>>
    features:string[]
    setPrivate:Dispatch<SetStateAction<boolean>>
}

const AnotherInfoAddWork = ({
                                handleChangeProgress,progress,
                                features,techs
                                ,setFeatures,setTech,setPrivate,
}:AnotherInfoAddWorkProps) => {
    const [metaInput, setMetaInput] = useState<string>("");
    const [mode, setMode] = useState<"tech"|"features">("tech");
    const handleArrayPush = (arr: "features" | "tech") => {
        switch(arr) {
            case "features":
                if (metaInput.trim().length > 0) {
                    setFeatures((prev) => [...prev, metaInput.trim()]);
                    setMetaInput('');
                }
                break;
            case "tech":
                if (metaInput.trim().length > 0) {
                    setTech(prev => [...prev, metaInput.trim()]);
                    setMetaInput('');
                }
        }
    };


    const handleArrayDelete = (arr: "features" | "tech",index: number) => {
        switch(arr) {
            case "features":
                setFeatures(features.filter((_, i) => i !== index));
                break;

                case "tech":
                    setTech(techs.filter((_, i) => i !== index));
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
                    Krok {progress + 1} z 4
                </span>
            </div>

            <div className={"z-1"}>
                <ToogleComponent data={[
                    {value:"features", label: "features", func: setMode},
                    {value:"tech", label: "tech", func: setMode}
                ]}/>
            </div>


            {mode === "tech" && (
                <div className="space-y-2 z-1">
                    <BasicInput
                        placeholder="Technologie..."
                        type="text"
                        color="black"
                        value={metaInput}
                        onChange={(e)=>setMetaInput(e.target.value)}
                    />
                    <BasicButton type={'button'} onClick={()=>handleArrayPush("tech")}>
                        Dodaj
                    </BasicButton>

                    {techs?.length > 0 && techs.map((tag, key) => (
                        <div key={key} className="relative p-2 flex flex-col-reverse border rounded bg-black">
                            <p>{tag}</p>
                            <BasicButton
                                type="button"
                                className="bg-red-600 absolute top-1 right-1"
                                onClick={() => handleArrayDelete("tech",key)}
                            >
                                x
                            </BasicButton>

                        </div>
                    ))}
                </div>
            )}

            {mode === "features" && (
                <div className="space-y-2 z-1">
                    <BasicInput
                        placeholder="Featury..."
                        type="text"
                        color="black"
                        value={metaInput}
                        onChange={(e)=>setMetaInput(e.target.value)}
                    />
                    <BasicButton type={'button'} onClick={()=>handleArrayPush("features")}>
                        Dodaj
                    </BasicButton>

                    {features?.length && features.map((tag, key) => (
                        <div key={key} className="relative p-2 flex flex-col-reverse border rounded bg-black">
                            <p>{tag}</p>
                            <BasicButton
                                type="button"
                                className="bg-red-600 absolute top-1 right-1"
                                onClick={() => handleArrayDelete("features",key)}
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