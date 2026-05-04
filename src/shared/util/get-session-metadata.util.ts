"use server";

import {headers} from "next/headers";
import {userAgent} from "next/server";
import * as countries from "i18n-iso-countries";
import type {SessionMetaDataType} from "@/shared/types/domen/session/session-metadata.type";
import DeviceDetector from "device-detector-js";
import {geoLookup} from "@/lib/geo/get-lookup.lib";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/pl.json"));

const LOOPBACK = new Set(["::1", "127.0.0.1", "localhost"]);

function isPrivateIp(ip: string): boolean {
    if (LOOPBACK.has(ip)) return true;
    return /^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/.test(ip);
}

export async function getSessionMetaData(): Promise<SessionMetaDataType> {
    const headersList = await headers();

    const rawIp =
        headersList.get("cf-connecting-ip") ||
        headersList.get("x-forwarded-for")?.split(",")[0] ||
        "";

    const ip = !rawIp || isPrivateIp(rawIp)
        ? "173.166.164.121"
        : rawIp;

    // ⚡ geo без файлов и без зависимостей
    const location = await geoLookup(ip);

    const ua = userAgent({ headers: headersList });
    const device = new DeviceDetector().parse(ua.ua || "");

    return {
        location: {
            country: location?.country
                ? countries.getName(location.country, "pl")
                : "unknown",
            city: location?.city || "unknown",
            latitude: location?.ll?.[0]?.toString() || "unknown",
            longitude: location?.ll?.[1]?.toString() || "unknown",
        },
        device: {
            browser: device?.client?.name || "unknown",
            os: device?.os?.name || "undefined",
            type: device?.device?.type || "unknown",
        },
        ip: ip || "unknown",
    };
}