import { WeatherDataItem } from "~/lib/types";

export function weatherCodeToStatus(code: number) {
  if (code === 0) return "Clear sky";
  if (code === 1) return "Mainly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45) return "Fog";
  if (code === 48) return "Depositing rime fog";
  if (code === 51) return "Light drizzle";
  if (code === 53) return "Moderate drizzle";
  if (code === 55) return "Dense drizzle";
  if (code === 56) return "Light freezing drizzle";
  if (code === 57) return "Dense freezing drizzle";
  if (code === 61) return "Slight rain";
  if (code === 63) return "Moderate rain";
  if (code === 65) return "Heavy rain";
  if (code === 66) return "Light freezing rain";
  if (code === 67) return "Heavy freezing rain";
  if (code === 71) return "Slight snow fall";
  if (code === 73) return "Moderate snow fall";
  if (code === 75) return "Heavy snow fall";
  if (code === 77) return "Snow grains";
  if (code === 80) return "Slight rain showers";
  if (code === 81) return "Moderate rain showers";
  if (code === 82) return "Violent rain showers";
  if (code === 85) return "Snow showers slight";
  if (code === 86) return "Snow showers heavy";
  if (code === 95) return "Thunderstorm";
  if (code === 96) return "Thunderstorm with slight hail";
  if (code === 99) return "Thunderstorm with heavy hail";
  return "Unknown";
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