import type { WeatherDataItem } from "~/lib/types";
import { weatherLargeImages, weatherSmallImages } from "./images";

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
export function weatherCodeToImage(code: number, isNight: boolean, size: "small" | "large") {
  const imagesSet = size === "small" ? weatherSmallImages : weatherLargeImages;
  if (code === 0 || code === 1) {
    if(isNight) return imagesSet.night.clear;
    return imagesSet.default.clear; 
  }
  if (code === 2) {
    if(isNight) return imagesSet.night.cloudy;
    return imagesSet.sunny.cloudy;
  }
  if (code === 3) return imagesSet.special.overcast;
  if (code === 45 || code === 48) return imagesSet.special.foggy;
  if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57) {
    if(isNight) return imagesSet.night.rainy;
    return imagesSet.default.rainy;
  }
  if (code === 61 || code === 53 || code === 66) return imagesSet.default.rainy;
  if (code === 65 || code === 67) return imagesSet.special.shower;
  if (code === 71 || code === 73) {
    if(isNight) return imagesSet.night.snowy;
    return imagesSet.default.snowy;
  }
  if (code === 75) return imagesSet.default.snowy;
  if (code === 77) return imagesSet.special.snowyRain;
  if (code === 80 || code === 81 || code === 82) return imagesSet.special.shower;
  if (code === 85 || code === 86) return imagesSet.default.snowy;
  if (code === 95) return imagesSet.default.storm;
  if (code === 96 || code === 99) return imagesSet.special.stormShower;
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

export function isNight(time: string, sunrise: string, sunset: string) {
  const currentTime = time.split("T")[1];
  if(!currentTime) return false;

  const [currentHour] = currentTime.split(":");
  if(!currentHour) return false;

  const [sunriseHour] = sunrise.split(":");
  if(!sunriseHour) return false;

  const [sunsetHour] = sunset.split(":");
  if(!sunsetHour) return false;

  if(parseInt(currentHour, 10) <= parseInt(sunriseHour)) return true;
  if(parseInt(currentHour, 10) > parseInt(sunsetHour) + 12) return true;
  return false;
}