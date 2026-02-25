export default function ErrorMessage({ message }) {
    return (
        <div className="error-card glass" role="alert" aria-live="assertive">
            <div className="error-icon">⚠️</div>
            <div className="error-text">
                <h3>Oops! Something went wrong</h3>
                <p>{message}</p>
            </div>
        </div>
    );
}
