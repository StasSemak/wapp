"use server";

export async function getLocationData(ip: string | null) {
  const res = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`);
  const data = await res.json() as {
    geoplugin_city: string,
    geoplugin_countryName: string,
    geoplugin_latitude: string,
    geoplugin_longitude: string,
    geoplugin_timezone: string,
  };
  return data;
}
