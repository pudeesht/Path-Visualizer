import React from 'react';
import './ControlPanel.css';


const ControlPanel = ({isAnimating, onVisualize, onClearBoard, onClearPath,onCssChange,onGenerateMaze }) => {
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
      <button onClick={onGenerateMaze} disabled={isAnimating} className="button">
        Generate Maze 
      </button>
      
      <button onClick={onCssChange} disabled={isAnimating} className="button">
        Change CSS
      </button>
    </div>
  );
};

export default ControlPanel;