export default function WeatherCard({ weatherData, temperature, feelsLike, unit, toggleUnit }) {
    const { name, sys, weather, main, wind } = weatherData;
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return (
        <div className="weather-card glass">
            <div className="weather-card-top">
                <div>
                    <div className="weather-city">{name}</div>
                    <div className="weather-country">{sys.country}</div>
                </div>
                <div className="weather-icon-wrap">
                    <img
                        className="weather-icon"
                        src={iconUrl}
                        alt={weather[0].description}
                        title={weather[0].description}
                    />
                </div>
            </div>

            <div className="weather-temp-row">
                <div className="weather-temp">
                    {temperature}°{unit}
                </div>
                <div className="unit-toggle">
                    <button
                        className={unit === 'C' ? 'active' : ''}
                        onClick={() => unit !== 'C' && toggleUnit()}
                        aria-label="Switch to Celsius"
                        id="celsius-button"
                    >
                        °C
                    </button>
                    <button
                        className={unit === 'F' ? 'active' : ''}
                        onClick={() => unit !== 'F' && toggleUnit()}
                        aria-label="Switch to Fahrenheit"
                        id="fahrenheit-button"
                    >
                        °F
                    </button>
                </div>
            </div>

            <div className="weather-condition">{weather[0].description}</div>

            <div className="weather-details">
                <div className="detail-item">
                    <div className="detail-label">Feels Like</div>
                    <div className="detail-value">
                        {feelsLike}°{unit}
                    </div>
                </div>
                <div className="detail-item">
                    <div className="detail-label">Humidity</div>
                    <div className="detail-value">{main.humidity}%</div>
                </div>
                <div className="detail-item">
                    <div className="detail-label">Wind</div>
                    <div className="detail-value">{Math.round(wind.speed)} m/s</div>
                </div>
                <div className="detail-item">
                    <div className="detail-label">Pressure</div>
                    <div className="detail-value">{main.pressure} hPa</div>
                </div>
                <div className="detail-item">
                    <div className="detail-label">Min</div>
                    <div className="detail-value">
                        {unit === 'C'
                            ? Math.round(main.temp_min)
                            : Math.round((main.temp_min * 9) / 5 + 32)}
                        °{unit}
                    </div>
                </div>
                <div className="detail-item">
                    <div className="detail-label">Max</div>
                    <div className="detail-value">
                        {unit === 'C'
                            ? Math.round(main.temp_max)
                            : Math.round((main.temp_max * 9) / 5 + 32)}
                        °{unit}
                    </div>
                </div>
            </div>
        </div>
    );
}
