import { WeatherDataItem } from "~/lib/types";
import { weatherLargeImages } from "./images";

export function weatherCodeToStatus(code: number) {
  if (code === 0) return "Sunny";
  if (code === 1) return "Mostly sunny";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast"; //very cloudy
  if (code === 45 || code === 48) return "Fog";
  if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57) return "Drizzle";
  if (code === 61 || code === 66) return "Slight rain";
  if (code === 63) return "Rain";
  if (code === 65 || code === 67) return "Heavy rain";
  if (code === 71 || code === 73) return "Snowy";
  if (code === 75) return "Heavy snow fall";
  if (code === 77) return "Snow grains";
  if (code === 80 || code === 81 || code === 82) return "Showers";
  if (code === 85) return "Snow showers";
  if (code === 86) return "Heavy snow showers";
  if (code === 95) return "Thunderstorm";
  if (code === 96 || code === 99) return "Thunderstorm with hail";
  return "Unknown";
}
export function weatherCodeToImage(code: number, isNight: boolean) {
  if (code === 0 || code === 1) {
    if(isNight) return weatherLargeImages.night.clear;
    return weatherLargeImages.default.clear; 
  }
  if (code === 2) {
    if(isNight) return weatherLargeImages.night.cloudy;
    return weatherLargeImages.sunny.cloudy;
  }
  if (code === 3) return weatherLargeImages.default.cloudy;
  if (code === 45 || code === 48) return weatherLargeImages.special.foggy;
  if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57) {
    if(isNight) return weatherLargeImages.night.rainy;
    return weatherLargeImages.default.rainy;
  }
  if (code === 61 || code === 53 || code === 66) return weatherLargeImages.default.rainy;
  if (code === 65 || code === 67) return weatherLargeImages.special.shower;
  if (code === 71 || code === 73) {
    if(isNight) return weatherLargeImages.night.snowy;
    return weatherLargeImages.default.snowy;
  }
  if (code === 75 || code === 77) return weatherLargeImages.default.snowy;
  if (code === 80 || code === 81 || code === 82) return weatherLargeImages.special.shower;
  if (code === 85 || code === 86) return weatherLargeImages.default.snowy;
  if (code === 95) return weatherLargeImages.default.storm;
  if (code === 96 || code === 99) return weatherLargeImages.special.stormShower;
  return null;
}

export function todayWeatherFromTime(todayData: WeatherDataItem[], tomorrowData: WeatherDataItem[], time: string) {
  const [currentHour] = time.split(":");

  const newData: WeatherDataItem[] = [];
  let idx = 24;
  for(const item of todayData) {
    const itemTime = item.time.split("T")[1];
    if(!itemTime) continue;

    const [itemHour] = itemTime.split(":");
    if(!itemHour) continue;
  
    if(parseInt(itemHour, 10) >= parseInt(currentHour ?? "0", 10)) {
      newData.push(item);
      idx--;
    }
  }
  for(let i = 0; i < idx; i++) {
    const tdi = tomorrowData[i];
    if(!tdi) continue;
    newData.push(tdi);
  }

  return newData;
}