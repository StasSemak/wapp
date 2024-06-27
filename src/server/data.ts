"use server";

import { WeatherDataItem } from "~/lib/types";
import { weatherCodeToImage, weatherCodeToStatus } from "~/lib/weather-utils";

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

export async function getWeatherData(latitude: string, longitude: string, timezone: string) {
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&current_weather=true&timezone=${timezone}&forecast_days=7`);
  const data = await res.json();

  const currentData = {
    time: data.current_weather.time,
    temperature: data.current_weather.temperature,
    status: weatherCodeToStatus(data.current_weather.weathercode),
    image: weatherCodeToImage(data.current_weather.weathercode, false, "large"),
  } as WeatherDataItem;

  const weatherData = data.hourly;
  const hourlyData = weatherData.temperature_2m.map((t: any, idx: any) => ({
    time: weatherData.time[idx],
    temperature: t,
    status: weatherCodeToStatus(weatherData.weathercode[idx]),
    image: weatherCodeToImage(weatherData.weathercode[idx], false, "small"),
  })) as WeatherDataItem[];

  const dailyData: { [key in number]: WeatherDataItem[] } = {};
  for(let i = 0; i < 7; i++) {
    dailyData[i] = hourlyData.slice(0 + 24 * i, 24 + 24 * i);
  }

  return { currentData, dailyData };
}