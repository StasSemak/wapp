import { MapPinIcon } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { WeatherDataItem } from "~/lib/types";
import { todayWeatherFromTime } from "~/lib/weather-utils";
import { getCurrentWeather, getLocationData, getWeatherData } from "~/server/data";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#030835] px-8">
      <div className="h-[440px] w-full max-w-[600px] rounded-3xl bg-[#083080]/50 p-6 text-zinc-100">
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
  const time = new Date().toLocaleTimeString("en-UK", {
    timeZone: locationData.geoplugin_timezone,
  });

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <MapPinIcon className="stroke-zinc-100 size-4"/>
          <p className="text-lg">{locationData.geoplugin_city + ", " + locationData.geoplugin_countryName}</p>
        </div>
        <p className="text-lg">{date}</p>
      </div>
      <WeatherSection 
        latidute={locationData.geoplugin_latitude}
        longitude={locationData.geoplugin_longitude}
        timezone={locationData.geoplugin_timezone}
        time={time}
      />
    </div>
  );
}

async function WeatherSection(props: {latidute: string, longitude: string, timezone: string, time: string}) {
  const {latidute, longitude, timezone, time} = props;
  const weatherData = await getWeatherData(latidute, longitude, timezone);
  const todayWeather = todayWeatherFromTime(weatherData[0] ?? [], weatherData[1] ?? [], time);

  return(
    <div className="flex flex-col gap-6 w-full items-center">
      <CurrentWeather {...props}/>
      <TodayWeather data={todayWeather}/>
    </div>
  )
}

async function CurrentWeather({latidute, longitude, timezone}: {latidute: string, longitude: string, timezone: string, time: string}) {
  const { temperature, status, image } = await getCurrentWeather(latidute, longitude, timezone);

  return(
    <div className="flex flex-col gap-3 items-center">
      {image ? 
        <Image src={image} alt={status} className="size-36 select-none mb-1" loading="eager"/> :
        <div className="size-36 rounded-lg bg-zinc-400"/>
      }
      <p className="text-4xl font-semibold leading-9">{`${temperature}°C`}</p>
      <p className="text-xl leading-5">{status}</p>
    </div>
  )
}

function TodayWeather({data}: {data: WeatherDataItem[] | undefined}) {
  if(!data) return "No data for today!";

  return(
    <div className="flex w-full gap-3 overflow-y-scroll hide-scrollbar">
      {data.map((item, idx) => (
        <TodayWeatherItem key={`${item.time}-${idx}`} {...item}/>
      ))}
    </div>
  )
}
function TodayWeatherItem({status, temperature, time}: WeatherDataItem) {
  return(
    <div className="flex flex-col gap-1 rounded-md bg-blue-300/50 items-center min-w-16 py-1">
      <span>{time.split("T")[1]}</span>
      <span className="size-8 rounded-sm bg-zinc-400"/>
      <span>{`${temperature}°`}</span>
    </div>
  )
}
