import React from 'react';
import './ControlPanel.css';


const ControlPanel = ({ onVisualize, onClearBoard, onClearPath }) => {
  return (
    <div className="control-panel">
      <button onClick={onVisualize} className="button">
        Visualize Dijkstra's
      </button>
      <button onClick={onClearPath} className="button">
        Clear Path
      </button>
      <button onClick={onClearBoard} className="button">
        Clear Board
      </button>
    </div>
  );
};

export default ControlPanel;