import React from 'react';
import './ControlPanel.css';


const ControlPanel = ({isAnimating, onVisualize, onClearBoard, onClearPath,onCssChange,onGenerateMaze, selectedAlgorithm,onAlgorithmChange, }) => {
  return (
    <div className="control-panel">
      <select 
        className="select" 
        value={selectedAlgorithm} 
        onChange={onAlgorithmChange} 
        disabled={isAnimating}
      >
        <option value="dijkstra">Dijkstra's</option>
        <option value="astar">A* Search</option>
      </select>

      <button onClick={onVisualize} disabled={isAnimating}className="button">
        Visualize {selectedAlgorithm === 'dijkstra ' ? "Dijkstra's" : "A*"}
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