export async function geoLookup(ip: string) {
    try {
        const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,city,lat,lon`);
        const data = await res.json();
        console.log("[geo] raw response:", JSON.stringify(data));
        if (data.status !== "success") return null;
        return {
            country: data.countryCode,
            city: data.city,
            ll: [data.lat, data.lon],
        };
    } catch (e) {
        console.error("[geo] fetch failed:", e);
        return null;
    }
}