import { StaticImageData } from "next/image"

export type WeatherDataItem = {
  time: string,
  temperature: number,
  status: string,
  image?: StaticImageData,
}