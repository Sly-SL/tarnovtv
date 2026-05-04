import {useState} from "react";
import {useRouter} from "next/navigation";
import {shortcuts} from "@/shared/consts/enums/shortcuts.enum";

export const useChangeProgressForm = () => {
    const [progress, setProgress] = useState(0);
    const router = useRouter()

    const handleChangeProgress = (operation: "+" | "-") => {
        setProgress(prev => {
            const next = operation === "+" ? prev + 1 : prev - 1;

            if (operation === "-" && next < 0) {
                router.push(shortcuts.admin);
                return prev;
            }

            if (operation === "+" && next > 3) {
                router.push(shortcuts.projects);
                return prev;
            }

            return next;
        });
    };

    return {handleChangeProgress, progress, setProgress};
};