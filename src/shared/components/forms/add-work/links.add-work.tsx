import {AddWorkProps} from "@/shared/components/forms/add-work/add-work.form";
import {BasicButton} from "@/shared/components/libs/basic/button.component";
import {Dispatch, type SetStateAction} from "react";
import {BasicInput} from "@/shared/components/libs/basic/input.component";

interface LinksAddWorkProps extends AddWorkProps {
    SetDeploymentUrl: Dispatch<SetStateAction<string>>
    deployment_url: string
    SetGithubUrl: Dispatch<SetStateAction<string>>
    github_url: string
}

const LinksAddWork = ({handleChangeProgress,progress,deployment_url,github_url,SetDeploymentUrl,SetGithubUrl }:LinksAddWorkProps) => {
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
                value={github_url}
                required
                onChange={(e) =>SetGithubUrl(e.target.value)}
                className={""}
                label={"link do github"}
            />
            <BasicInput
                value={deployment_url}
                required
                onChange={(e) =>SetDeploymentUrl(e.target.value)}
                className={""}
                label={"link do deploymentu"}
            />

            <BasicButton onClick={()=>handleChangeProgress("+")}>Dalej</BasicButton>
        </div>
    );
};

export default LinksAddWork;