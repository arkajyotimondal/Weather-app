export default function SearchHistory({ history, onSelect }) {
    if (!history || history.length === 0) return null;

    return (
        <div className="history-section">
            <div className="history-label">Recent Searches</div>
            <div className="history-chips">
                {history.map((city) => (
                    <button
                        key={city}
                        className="chip"
                        onClick={() => onSelect(city)}
                        aria-label={`Search weather for ${city} again`}
                    >
                        <span>🕐</span>
                        {city}
                    </button>
                ))}
            </div>
        </div>
    );
}
