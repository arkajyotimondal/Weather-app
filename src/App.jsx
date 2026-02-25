import './index.css';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import SearchHistory from './components/SearchHistory';

export default function App() {
  const {
    query,
    setQuery,
    unit,
    toggleUnit,
    loading,
    error,
    weatherData,
    temperature,
    feelsLike,
    history,
    fetchWeather,
  } = useWeather();

  const handleSearch = (cityName) => {
    if (cityName.trim()) {
      fetchWeather(cityName);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>☁️ Weather Checker</h1>
        <p>Real-time weather for any city in the world</p>
      </header>

      <main className="app-body">
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          loading={loading}
        />

        <SearchHistory
          history={history}
          onSelect={(city) => {
            setQuery(city);
            handleSearch(city);
          }}
        />

        {loading && <LoadingSpinner />}
        {!loading && error && <ErrorMessage message={error} />}
        {!loading && !error && weatherData && (
          <WeatherCard
            weatherData={weatherData}
            temperature={temperature}
            feelsLike={feelsLike}
            unit={unit}
            toggleUnit={toggleUnit}
          />
        )}
      </main>
    </div>
  );
}
