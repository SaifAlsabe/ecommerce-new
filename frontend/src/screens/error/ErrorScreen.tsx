import React from 'react';
import './ErrorScreenStyle.css';

const ErrorScreen: React.FC = () => {
    return (
        <div className="error-page">
            <div className="message">
                <h1 className="error-1">CARBON</h1>
                <h3 className="error-2">Error 404 page not found</h3>
                <h6 className="error-3">The requested URL was not found on the server</h6>
            </div>
            <div className="background-svg">
                <img src="/images/shopping.svg" alt="icon" className="svg" />
            </div>
        </div>
    )
}

export default ErrorScreen;