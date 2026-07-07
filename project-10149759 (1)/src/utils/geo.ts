interface GeoInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  org: string;
  timezone: string;
  lat: number;
  lon: number;
}

let cachedGeo: GeoInfo | null = null;

export async function getClientGeo(): Promise<GeoInfo | null> {
  if (cachedGeo) return cachedGeo;
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    cachedGeo = {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      org: data.org,
      timezone: data.timezone,
      lat: data.latitude,
      lon: data.longitude,
    };
    return cachedGeo;
  } catch {
    return null;
  }
}