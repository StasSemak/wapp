"use server";

import { env } from "~/env";
import type { WeatherDataItem } from "~/lib/types";
import { isNight, weatherCodeToImage, weatherCodeToStatus } from "~/lib/weather-utils";

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

  const sunData = await getSunTimes(latitude, longitude);

  const todaySunData = sunData.find(x => x.day === 0);
  let currentIsNight: boolean;
  if(todaySunData) {
    currentIsNight = isNight(data.current_weather.time, todaySunData.sunrise, todaySunData.sunset);
  }
  else currentIsNight = false;
  const currentData = {
    time: data.current_weather.time,
    temperature: data.current_weather.temperature,
    status: weatherCodeToStatus(data.current_weather.weathercode),
    code: data.current_weather.weathercode,
    image: weatherCodeToImage(data.current_weather.weathercode, currentIsNight, "large"),
  } as WeatherDataItem;

  const weatherData = data.hourly;
  const hourlyData = weatherData.temperature_2m.map((t: any, idx: any) => ({
    time: weatherData.time[idx],
    temperature: t,
    status: weatherCodeToStatus(weatherData.weathercode[idx]),
    code: weatherData.weathercode[idx],
    image: null,
  })) as WeatherDataItem[];

  const dailyData: { [key in number]: WeatherDataItem[] } = {};
  for(let i = 0; i < 7; i++) {
    dailyData[i] = hourlyData.slice(0 + 24 * i, 24 + 24 * i);

    const daySunData = sunData.find(x => x.day === i);
    for(const item of dailyData[i] ?? []) {
      let hourlyIsNight: boolean;
      if(daySunData) {
        hourlyIsNight = isNight(item.time, daySunData.sunrise, daySunData.sunset);
      }
      else hourlyIsNight = false;
      item.image = weatherCodeToImage(item.code, hourlyIsNight, "small");
    } 
  }

  return { currentData, dailyData };
}
export async function getSunTimes(latitude: string, longitude: string) {
  const apiKey = env.WEATHER_API_KEY;

  const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=7`);
  const data = await res.json();

  return data.forecast.forecastday.map((day: any, idx: number) => ({
    day: idx,
    sunrise: day.astro.sunrise,
    sunset: day.astro.sunset,
  })) as {
    day: number,
    sunrise: string,
    sunset: string,
  }[];
}

