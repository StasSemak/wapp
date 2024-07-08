import { MapPinIcon } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { CreditsPopup } from "~/components/credits-popup";
import type { WeatherDataItem } from "~/lib/types";
import { todayWeatherFromTime } from "~/lib/weather-utils";
import { getLocationData, getWeatherData } from "~/server/data";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col justify-between items-center bg-[#030835] px-4 md:px-8">
      <Widget />
      <Footer />
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
    <div className="h-[466px] md:h-[480px] w-full max-w-[640px] rounded-3xl bg-[#083080]/50 px-3 py-4 md:p-6 text-zinc-100 flex flex-col gap-5 md:gap-10 my-auto">
      <div className="flex flex-col justify-start md:flex-row md:justify-between items-center">
        <div className="flex gap-1 items-center">
          <MapPinIcon className="stroke-zinc-100 size-4"/>
          <p className="text-base md:text-lg">{locationData.geoplugin_city + ", " + locationData.geoplugin_countryName}</p>
        </div>
        <p className="text-base md:text-lg">{date}</p>
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
  const {currentData, dailyData} = await getWeatherData(latidute, longitude, timezone);
  const todayWeather = todayWeatherFromTime(dailyData[0] ?? [], dailyData[1] ?? [], time);

  return(
    <div className="flex flex-col gap-8 w-full flex-grow items-center">
      <CurrentWeather currentData={currentData}/>
      <TodayWeather data={todayWeather}/>
    </div>
  )
}

async function CurrentWeather({currentData}: {currentData: WeatherDataItem}) {
  const { temperature, status, image } = currentData;

  return(
    <div className="flex flex-col gap-3 items-center">
      {image ? 
        <Image src={image} alt={status} className="size-36 select-none mb-1" priority/> :
        <div className="size-36 rounded-lg bg-blue-300/50"/>
      }
      <p className="text-4xl font-semibold leading-9">{`${temperature}°C`}</p>
      <p className="text-xl leading-5">{status}</p>
    </div>
  )
}

function TodayWeather({data}: {data: WeatherDataItem[] | undefined}) {
  if(!data) return "No data for today!";

  return(
    <div className="flex w-full gap-1.5 md:gap-3 overflow-y-scroll hide-scrollbar">
      {data.map((item, idx) => (
        <TodayWeatherItem key={`${item.time}-${idx}`} {...item}/>
      ))}
    </div>
  )
}
function TodayWeatherItem({image, status, temperature, time}: WeatherDataItem) {
  return(
    <div className="flex flex-col gap-1 rounded-md bg-blue-300/50 items-center min-w-16 py-1">
      <span>{time.split("T")[1]}</span>
      {image ? 
        <Image src={image} alt={status} className="size-8 select-none" priority quality={100}/> :
        <span className="size-8 rounded-sm bg-zinc-400"/>
      }
      <span>{`${temperature}°`}</span>
    </div>
  )
}

function Footer() {
  return(
    <footer className="flex justify-between w-full max-w-[640px] pb-5 px-6">
      <a className="text-blue-300/50 hover:text-blue-300 transition-all" href="https://github.com/StasSemak/wapp">GH</a>
      <CreditsPopup />
    </footer>
  )
}