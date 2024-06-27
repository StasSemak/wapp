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
import veryCloudy from "public/very_cloudy.png";
import snowyRain from "public/snowy_rain.png";

import cloudySm from "public/cloudy_sm.png";
import cloudyNightSm from "public/cloudy_night_sm.png";
import cloudySunSm from "public/cloudy_sun_sm.png";
import clearSm from "public/clear_sm.png";
import clearNightSm from "public/clear_night_sm.png";
import rainySm from "public/rainy_sm.png";
import rainyNightSm from "public/rainy_night_sm.png";
import rainySunSm from "public/rainy_sun_sm.png";
import stormSm from "public/storm_sm.png";
import stormNightSm from "public/storm_night_sm.png";
import stormSunSm from "public/storm_sun_sm.png";
import snowySm from "public/snowy_sm.png";
import snowyNightSm from "public/snowy_night_sm.png";
import snowySunSm from "public/snowy_sun_sm.png";
import foggySm from "public/foggy_sm.png";
import hailSm from "public/hail_sm.png";
import showerSm from "public/shower_sm.png";
import stormShowerSm from "public/storm_shower_sm.png";
import veryCloudySm from "public/very_cloudy_sm.png";
import snowyRainSm from "public/snowy_rain_sm.png";

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
        overcast: veryCloudy,
        snowyRain: snowyRain,
    }
}

export const weatherSmallImages = {
    default: {
        cloudy: cloudySm,
        clear: clearSm,
        rainy: rainySm,
        storm: stormSm,
        snowy: snowySm,
    },
    sunny: {
        cloudy: cloudySunSm,
        clear: clearSm,
        rainy: rainySunSm,
        storm: stormSunSm,
        snowy: snowySunSm,
    },
    night: {
        cloudy: cloudyNightSm,
        clear: clearNightSm,
        rainy: rainyNightSm,
        storm: stormNightSm,
        snowy: snowyNightSm,
    },
    special: {
        foggy: foggySm,
        hail: hailSm,
        shower: showerSm,
        stormShower: stormShowerSm,
        overcast: veryCloudySm,
        snowyRain: snowyRainSm,
    }
}