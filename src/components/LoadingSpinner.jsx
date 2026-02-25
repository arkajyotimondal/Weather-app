export default function LoadingSpinner() {
    return (
        <div className="loading-wrap glass">
            <div className="spinner" aria-label="Loading weather data" />
            <p>Fetching weather data…</p>
        </div>
    );
}
