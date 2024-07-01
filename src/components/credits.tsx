const credits: React.ReactNode[] = [
  <p><a className="credit-link" href="http://www.geoplugin.com/geolocation/" target="_new">IP Geolocation</a> by {' '}
  <a href="http://www.geoplugin.com/" target="_new">geoPlugin</a></p>,
  <p>This product includes GeoLite data created by MaxMind, available from {' '}
  <a className="credit-link" href="http://www.maxmind.com">http://www.maxmind.com</a></p>,
  <p>Weather data by {' '}<a className="credit-link" href="https://open-meteo.com/">Open-Meteo.com</a></p>,
  <p>Powered by <a className="credit-link" href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a></p>,
]

export function Credits() {
  return(
    <div className="flex flex-col flex-grow gap-3 text-zinc-100">
      {credits.map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
    </div>
  )
}