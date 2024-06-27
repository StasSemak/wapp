import cloudy from "public/cloudy.png";
import cloudyNight from "public/cloudy_night.png";
import cloudySun from "public/cloudy_sun.png";
import clear from "public/clear.png";
import clearNight from "public/clear_night.png";
import rainy from "public/rainy.png";
import rainyNight from "public/rainy_night.png";
import rainySun from "public/rainy_sun.png";
import storm from "public/storm.png";
import stormNight from "public/storm_night.png";
import stormSun from "public/storm_sun.png";
import snowy from "public/snowy.png";
import snowyNight from "public/snowy_night.png";
import snowySun from "public/snowy_sun.png";
import foggy from "public/foggy.png";
import hail from "public/hail.png";
import shower from "public/shower.png";
import stormShower from "public/storm_shower.png";

export const weatherLargeImages = {
    default: {
        cloudy: cloudy,
        clear: clear,
        rainy: rainy,
        storm: storm,
        snowy: snowy,
    },
    sunny: {
        cloudy: cloudySun,
        clear: clear,
        rainy: rainySun,
        storm: stormSun,
        snowy: snowySun,
    },
    night: {
        cloudy: cloudyNight,
        clear: clearNight,
        rainy: rainyNight,
        storm: stormNight,
        snowy: snowyNight,
    },
    special: {
        foggy: foggy,
        hail: hail,
        shower: shower,
        stormShower: stormShower,
    }
}