import type {AllCleanModesType} from "@/shared/types/all/all-clean-modes.type";

export const cleanModesParse = (mode: AllCleanModesType) => {
    switch (mode) {
        case 'true':
            return "włączony"

        case 'false':
            return "wyłączony"
    }
}