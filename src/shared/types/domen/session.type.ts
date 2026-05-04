import type {SessionMetaDataType} from "@/shared/types/domen/session/session-metadata.type";

export interface SessionType {
    id: string;
    userId: string;
    createdAt: string;
    lastActivityAt: string;
    fingerprint:string;
    metadata: SessionMetaDataType
}