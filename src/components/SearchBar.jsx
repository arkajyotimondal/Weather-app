import { useRef } from 'react';

export default function SearchBar({ query, setQuery, onSearch, loading }) {
    const inputRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') onSearch(query);
    };

    return (
        <div className="search-bar">
            <input
                ref={inputRef}
                type="text"
                placeholder="Search for a city…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                aria-label="City name"
                id="city-input"
                autoFocus
            />
            <button
                onClick={() => onSearch(query)}
                disabled={loading || !query.trim()}
                aria-label="Search weather"
                id="search-button"
            >
                <span>🔍</span>
                <span>Search</span>
            </button>
        </div>
    );
}
