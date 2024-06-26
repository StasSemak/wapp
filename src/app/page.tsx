import { MapPinIcon } from "lucide-react";
import { headers } from "next/headers";
import { getLocationData } from "~/server/data";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#030835] px-8">
      <div className="h-[420px] w-full max-w-[600px] rounded-3xl bg-[#083080]/50 p-6 text-zinc-100">
        <Widget />
      </div>
    </main>
  );
}

async function Widget() {
  const ip = headers().get("x-real-ip");
  const locationData = await getLocationData(ip);
  const date = new Date().toLocaleDateString("en-US", { 
    timeZone: locationData.geoplugin_timezone,
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <MapPinIcon className="stroke-zinc-100 size-4"/>
          <p className="text-lg">{locationData.geoplugin_city + ", " + locationData.geoplugin_countryName}</p>
        </div>
        <p className="text-lg">{date}</p>
      </div>
    </div>
  );
}
