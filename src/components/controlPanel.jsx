import React from 'react';
import './ControlPanel.css';


const ControlPanel = ({isAnimating, onVisualize, onClearBoard, onClearPath }) => {
  return (
    <div className="control-panel">
      <button onClick={onVisualize} disabled={isAnimating}className="button">
        Visualize Dijkstra's
      </button>
      <button onClick={onClearPath} disabled={isAnimating} className="button">
        Clear Path
      </button>
      <button onClick={onClearBoard} disabled={isAnimating} className="button">
        Clear Board
      </button>
    </div>
  );
};

export default ControlPanel;