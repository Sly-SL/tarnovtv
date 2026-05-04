interface LocationInfo {
    country: string | undefined;
    city: string;
    latitude: string | number;
    longitude: string | number;
}

interface DeviceInfo {
    browser: string;
    os: string;
    type: string;
}
export interface SessionMetaDataType {
    location: LocationInfo;
    device: DeviceInfo;
    ip: string;
}
