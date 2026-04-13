import {Dispatch, type SetStateAction} from 'react';
import {AddWorkProps} from "@/shared/components/forms/add-work/add-work.form";
import {BasicInput} from "@/shared/components/libs/basic/input.component";
import {BasicButton} from "@/shared/components/libs/basic/button.component";

interface BasicDataAddWorkProps extends AddWorkProps{
    SetId: Dispatch<SetStateAction<string>>
    id:string
    SetName: Dispatch<SetStateAction<string>>
    name:string
    SetDescription: Dispatch<SetStateAction<string>>
    description:string
}

const BasicDataAddWork = ({progress,handleChangeProgress,id,SetId,SetDescription,description,name,SetName}:BasicDataAddWorkProps) => {
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
            <BasicInput
                autoFocus
                value={id}
                required
                onChange={(e) =>SetId(e.target.value)}
                className={""}
                label={"Id"}
            />
            <BasicInput
                value={name}
                required
                onChange={(e) =>SetName(e.target.value)}
                className={""}
                label={"Nazwa"}
            />

            <textarea
                value={description}
                onChange={(e) =>SetDescription(e.target.value)}
                placeholder="Napisz opis..."
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none min-h-[120px]"
            />
            <BasicButton onClick={()=>handleChangeProgress("+")}>Dalej</BasicButton>
        </div>
    );
};

export default BasicDataAddWork;