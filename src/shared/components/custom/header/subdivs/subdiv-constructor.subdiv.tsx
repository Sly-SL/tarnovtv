import type {SubdivType} from "@/shared/types/subdiv.type";
import {SUBDIV} from "@/shared/consts/enums/buttons-header.enum";

const SubdivConstructor = ({id, children}: SubdivType) => {
    return (
        <div
            id={id + SUBDIV}
            className="hidden min-w-full min-h-[30vh] animate-fade-in-up max-h-[80vh] overflow-y-auto justify-center">
            <article className={"h-full grid justify-center py-10 ps-[22px] pe-[22px] mx-auto max-w-[1124px]"}>
                {children}
            </article>
        </div>
    );
};

export default SubdivConstructor;