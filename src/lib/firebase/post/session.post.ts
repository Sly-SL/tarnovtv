import type {SessionType} from "@/shared/types/domen/session.type";
import {addDataWithCustomId} from "@/lib/firebase/firebase-admin";

export const sessionPost = async (data:Omit<SessionType,"createdAt">) => {
    await addDataWithCustomId("sessions", data.id,{
        "userId": data.userId,
        "createdAt": Date.now(),
        "metadata":{
            "location":{
                "country": data.metadata.location.country,
                "city": data.metadata.location.city,
                "latitude": data.metadata.location.latitude,
                "longitude": data.metadata.location.longitude
            },
            "device":{
                "browser":data.metadata.device.browser,
                "os":data.metadata.device.os,
                "type":data.metadata.device.type,
            },
            "ip":data.metadata.ip
        },
        "lastActivityAt":data.lastActivityAt,
        "fingerprint":data.fingerprint,
    })
}