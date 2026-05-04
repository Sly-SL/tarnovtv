import {Dispatch, type SetStateAction} from 'react';
import type {AddProjectProps} from "@/shared/components/forms/add-project/add-project.form";
import {BasicInput} from "@/shared/components/libs/basic/input.component";
import {BasicButton} from "@/shared/components/libs/basic/button.component";

interface BasicDataAddWorkProps extends AddProjectProps{
    setId: Dispatch<SetStateAction<string>>
    id:string
    setName: Dispatch<SetStateAction<string>>
    name:string
    setDescription: Dispatch<SetStateAction<string>>
    description:string
}

const BasicDataAddWork = ({id,setId,setDescription,description,name,setName,progress,handleChangeProgress}:BasicDataAddWorkProps) => {
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
            <BasicInput
                autoFocus
                value={id}
                required
                onChange={(e) =>setId(e.target.value)}
                className={""}
                label={"Id"}
            />
            <BasicInput
                value={name}
                required
                onChange={(e) =>setName(e.target.value)}
                className={""}
                label={"Nazwa"}
            />

            <textarea
                value={description}
                onChange={(e) =>setDescription(e.target.value)}
                placeholder="Napisz opis..."
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-(--contrast-color) focus:ring-2 focus:ring-(--contrast-color)/40 transition-all resize-none min-h-[120px]"
            />
            <BasicButton onClick={()=>handleChangeProgress("+")}>Dalej</BasicButton>
        </div>
    );
};

export default BasicDataAddWork;