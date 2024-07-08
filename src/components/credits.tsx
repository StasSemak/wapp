export function Credits() {
  return (
    <div className="flex flex-grow flex-col gap-3 text-zinc-100 text-sm md:text-base">
      <p>
        <a
          className="credit-link"
          href="http://www.geoplugin.com/geolocation/"
          target="_new"
        >
          IP Geolocation
        </a>{" "}
        by{" "}
        <a
          className="credit-link"
          href="http://www.geoplugin.com/"
          target="_new"
        >
          geoPlugin
        </a>
      </p>
      <p>
        This product includes GeoLite data created by MaxMind, available from{" "}
        <a className="credit-link" href="http://www.maxmind.com">
          http://www.maxmind.com
        </a>
      </p>
      <p>
        Weather data by{" "}
        <a className="credit-link" href="https://open-meteo.com/">
          Open-Meteo.com
        </a>
      </p>
      <p>
        Powered by{" "}
        <a
          className="credit-link"
          href="https://www.weatherapi.com/"
          title="Free Weather API"
        >
          WeatherAPI.com
        </a>
      </p>
      <p>
        Cloud icons created by{" "}
        <a
          className="credit-link"
          href="https://www.flaticon.com/free-icons/cloud"
          title="cloud icons"
        >
          iconixar - Flaticon
        </a>
      </p>
    </div>
  );
}
