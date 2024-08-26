import React from 'react';
import '../styles/HorizontalBarWidget.css';

const HorizontalBarWidget = ({ data }) => {
  // Calculate total for percentage calculation
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);

  return (
    <div className="horizontal-bar-widget">
      <div className="bar-container">
        {Object.entries(data).map(([label, value], index) => (
          <div
            key={index}
            className={`bar-segment ${label.toLowerCase()}`}
            style={{ width: `${(value / total) * 100}%` }}
          >
          </div>
        ))}
      </div>
      <div className="data-container">
        {Object.entries(data).map(([label, value], index) => (
          <div key={index} className="data-item">
            <span className={`dot ${label.toLowerCase()}`}></span>
            <span className="data-label">{label}: </span>
            <span className="data-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalBarWidget;
